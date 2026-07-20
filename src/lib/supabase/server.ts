import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

export type SupabaseConfig = {
	url: string;
	serviceRoleKey: string;
};

function pick(...values: (string | undefined)[]) {
	return values.find((value) => value?.trim());
}

function readEnv(platform: App.Platform | undefined) {
	const cloudflare = platform?.env;

	return {
		url: pick(cloudflare?.SUPABASE_URL, env.SUPABASE_URL),
		serviceRoleKey: pick(cloudflare?.SUPABASE_SERVICE_ROLE_KEY, env.SUPABASE_SERVICE_ROLE_KEY),
		siteUrl: pick(cloudflare?.SITE_URL, env.SITE_URL)
	};
}

export function getSiteUrl(requestOrigin: string, platform?: App.Platform): string {
	const configured = readEnv(platform).siteUrl?.replace(/\/$/, '');
	if (configured) return configured;

	if (requestOrigin === 'https://localhost' || requestOrigin === 'http://localhost') {
		return 'http://localhost:5173';
	}

	return requestOrigin.replace(/\/$/, '');
}

export function getSupabaseConfig(platform: App.Platform | undefined): SupabaseConfig | null {
	const { url, serviceRoleKey } = readEnv(platform);

	if (!url || !serviceRoleKey) {
		if (import.meta.env.DEV) {
			console.warn('[spendwise/delete] Missing Supabase env', {
				hasUrl: Boolean(url),
				hasServiceRoleKey: Boolean(serviceRoleKey),
				hasPlatformEnv: Boolean(platform?.env)
			});
		}
		return null;
	}

	return { url, serviceRoleKey };
}

export function createAdminClient(config: SupabaseConfig): SupabaseClient {
	return createClient(config.url, config.serviceRoleKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	});
}

export async function findUserByEmail(admin: SupabaseClient, email: string) {
	const normalized = email.trim().toLowerCase();
	let page = 1;
	const perPage = 200;

	while (page <= 10) {
		const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
		if (error) throw error;

		const match = data.users.find((user) => user.email?.toLowerCase() === normalized);
		if (match) return match;

		if (data.users.length < perPage) break;
		page++;
	}

	return null;
}
