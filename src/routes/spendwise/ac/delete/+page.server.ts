import { fail, redirect } from '@sveltejs/kit';
import {
	createAdminClient,
	createRouteSupabaseClient,
	getSupabaseConfig,
	spendwiseAuthCallbackUrl
} from '$lib/supabase/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, platform, url }) => {
	const config = getSupabaseConfig(platform);
	if (!config) {
		return { configured: false as const, email: null, authError: null };
	}

	const authError =
		url.searchParams.get('error') === 'auth'
			? 'Google sign-in failed. Please try again.'
			: url.searchParams.get('error') === 'no_account'
				? 'No SpendWise account was found for that Google sign-in.'
				: null;

	const supabase = createRouteSupabaseClient(cookies, config);
	const {
		data: { user },
		error
	} = await supabase.auth.getUser();

	if (error || !user?.email) {
		return { configured: true as const, email: null, authError };
	}

	return { configured: true as const, email: user.email, authError: null };
};

export const actions: Actions = {
	google: async ({ cookies, platform, url }) => {
		const config = getSupabaseConfig(platform);
		if (!config) {
			return fail(503, { authError: 'Account deletion is not configured.' });
		}

		const redirectTo = spendwiseAuthCallbackUrl(url.origin, platform);
		const supabase = createRouteSupabaseClient(cookies, config);
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo,
				skipBrowserRedirect: true
			}
		});

		if (import.meta.env.DEV) {
			console.info('[spendwise/delete] Starting Google OAuth', { redirectTo });
		}

		if (error || !data.url) {
			console.error('[spendwise/delete] Google OAuth start failed', error);
			return fail(500, { authError: 'Could not start Google sign-in. Please try again.' });
		}

		redirect(303, data.url);
	},

	logout: async ({ cookies, platform }) => {
		const config = getSupabaseConfig(platform);
		if (config) {
			const supabase = createRouteSupabaseClient(cookies, config);
			await supabase.auth.signOut();
		}

		redirect(303, '/spendwise/ac/delete');
	},

	delete: async ({ request, cookies, platform }) => {
		const config = getSupabaseConfig(platform);
		if (!config) {
			return fail(503, { deleteError: 'Account deletion is not configured.' });
		}

		const supabase = createRouteSupabaseClient(cookies, config);
		const {
			data: { user },
			error: userError
		} = await supabase.auth.getUser();

		if (userError || !user) {
			return fail(401, {
				deleteError: 'You must be signed in to delete your account.'
			});
		}

		const form = await request.formData();
		const confirmEmail = String(form.get('confirmEmail') ?? '').trim().toLowerCase();
		const confirmed = form.get('confirm') === 'on';

		if (!confirmed) {
			return fail(400, {
				deleteError: 'Please confirm that you understand this action is permanent.'
			});
		}

		if (!confirmEmail) {
			return fail(400, { deleteError: 'Please confirm your email address.' });
		}

		if (user.email?.toLowerCase() !== confirmEmail) {
			return fail(400, { deleteError: 'The email you entered does not match your account.' });
		}

		const admin = createAdminClient(config);
		const { error: deleteError } = await admin.auth.admin.deleteUser(user.id);

		if (deleteError) {
			console.error('Failed to delete Supabase user', deleteError);
			return fail(500, {
				deleteError: 'We could not delete your account. Please contact support@sleepypixel.dev.'
			});
		}

		await supabase.auth.signOut();
		redirect(303, '/spendwise/ac/delete?deleted=1');
	}
};
