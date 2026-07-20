import { fail } from '@sveltejs/kit';
import { clientIp, checkRateLimit } from '$lib/delete/rate-limit';
import { createDeleteToken, storeDeleteToken } from '$lib/delete/token';
import { sendDeleteConfirmationEmail } from '$lib/email/resend';
import {
	createAdminClient,
	findUserByEmail,
	getSiteUrl,
	getSupabaseConfig
} from '$lib/supabase/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const config = getSupabaseConfig(platform);
	return {
		configured: Boolean(config)
	};
};

export const actions: Actions = {
	request: async ({ request, platform, url }) => {
		const config = getSupabaseConfig(platform);
		if (!config) {
			return fail(503, { requestError: 'Account deletion is not configured.' });
		}

		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim().toLowerCase();

		if (!email || !email.includes('@')) {
			return fail(400, { requestError: 'Please enter a valid email address.' });
		}

		const ip = clientIp(request);
		const ipAllowed = await checkRateLimit(platform, {
			key: `ip:${ip}`,
			limit: 10
		});
		const emailAllowed = await checkRateLimit(platform, {
			key: `email:${email}`,
			limit: 3
		});

		if (!ipAllowed || !emailAllowed) {
			return fail(429, {
				requestError: 'Too many requests. Please wait an hour and try again.'
			});
		}

		const admin = createAdminClient(config);
		let user;

		try {
			user = await findUserByEmail(admin, email);
		} catch (error) {
			console.error('[spendwise/delete] Failed to look up user', error);
			return fail(500, {
				requestError: 'We could not process your request. Please try again later.'
			});
		}

		if (!user?.email || !user.id) {
			return fail(404, {
				requestError: 'No SpendWise account was found for that email address.'
			});
		}

		const hash = createDeleteToken();
		await storeDeleteToken(platform, hash, {
			email: user.email.toLowerCase(),
			userId: user.id,
			createdAt: Date.now()
		});

		const confirmUrl = `${getSiteUrl(url.origin, platform)}/spendwise/ac/delete/confirm?hash=${hash}`;

		try {
			await sendDeleteConfirmationEmail({
				to: user.email,
				confirmUrl,
				platform
			});
		} catch (error) {
			console.error('[spendwise/delete] Failed to send confirmation email', error);
			return fail(500, {
				requestError: 'We could not send the confirmation email. Please try again later.'
			});
		}

		return {
			sent: true as const,
			email: user.email
		};
	}
};
