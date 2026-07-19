import { redirect, error } from '@sveltejs/kit';
import { createRouteSupabaseClient, getSupabaseConfig } from '$lib/supabase/server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies, platform }) => {
	const config = getSupabaseConfig(platform);
	if (!config) {
		error(503, 'Account deletion is not configured.');
	}

	const code = url.searchParams.get('code');
	if (!code) {
		redirect(303, '/spendwise/ac/delete?error=auth');
	}

	const supabase = createRouteSupabaseClient(cookies, config);
	const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

	if (exchangeError) {
		console.error('[spendwise/auth] OAuth callback failed', exchangeError);
		redirect(303, '/spendwise/ac/delete?error=auth');
	}

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		redirect(303, '/spendwise/ac/delete?error=no_account');
	}

	redirect(303, '/spendwise/ac/delete');
};
