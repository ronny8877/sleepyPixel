import { fail, redirect } from '@sveltejs/kit';
import { consumeDeleteToken, loadDeleteToken } from '$lib/delete/token';
import {
	createAdminClient,
	findUserByEmail,
	getSupabaseConfig
} from '$lib/supabase/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform, url }) => {
	const config = getSupabaseConfig(platform);
	const hash = url.searchParams.get('hash')?.trim() ?? '';

	if (!config) {
		return { configured: false as const, valid: false as const, email: null, hash: null };
	}

	if (!hash) {
		return { configured: true as const, valid: false as const, email: null, hash: null };
	}

	const record = await loadDeleteToken(platform, hash);
	if (!record) {
		return { configured: true as const, valid: false as const, email: null, hash: null };
	}

	return {
		configured: true as const,
		valid: true as const,
		email: record.email,
		hash
	};
};

export const actions: Actions = {
	delete: async ({ request, platform }) => {
		const config = getSupabaseConfig(platform);
		if (!config) {
			return fail(503, { deleteError: 'Account deletion is not configured.' });
		}

		const form = await request.formData();
		const hash = String(form.get('hash') ?? '').trim();
		const confirmEmail = String(form.get('confirmEmail') ?? '').trim().toLowerCase();
		const confirmed = form.get('confirm') === 'on';

		if (!hash) {
			return fail(400, { deleteError: 'This confirmation link is invalid.' });
		}

		if (!confirmed) {
			return fail(400, {
				deleteError: 'Please confirm that you understand this action is permanent.'
			});
		}

		if (!confirmEmail) {
			return fail(400, { deleteError: 'Please confirm your email address.' });
		}

		const record = await consumeDeleteToken(platform, hash);
		if (!record) {
			return fail(400, {
				deleteError: 'This confirmation link is invalid or has expired.'
			});
		}

		if (record.email !== confirmEmail) {
			return fail(400, { deleteError: 'The email you entered does not match this request.' });
		}

		const admin = createAdminClient(config);
		let user;

		try {
			user = await findUserByEmail(admin, record.email);
		} catch (error) {
			console.error('[spendwise/delete] Failed to verify user before delete', error);
			return fail(500, {
				deleteError: 'We could not verify your account. Please request a new link.'
			});
		}

		if (!user?.id || user.email?.toLowerCase() !== record.email) {
			return fail(404, {
				deleteError: 'No SpendWise account was found for this confirmation link.'
			});
		}

		if (user.id !== record.userId) {
			return fail(400, {
				deleteError: 'This confirmation link does not match the current account.'
			});
		}

		const { error: deleteError } = await admin.auth.admin.deleteUser(user.id);
		if (deleteError) {
			console.error('[spendwise/delete] Failed to delete user', deleteError);
			return fail(500, {
				deleteError: 'We could not delete your account. Please contact support@sleepypixel.dev.'
			});
		}

		redirect(303, '/spendwise/ac/delete?deleted=1');
	}
};
