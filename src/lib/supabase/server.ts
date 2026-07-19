import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';

export type SupabaseConfig = {
	url: string;
	publishableKey: string;
	serviceRoleKey: string;
};

export const AUTH_COOKIE_PATH = '/spendwise';
export const SPENDWISE_AUTH_CALLBACK_PATH = '/spendwise/auth/callback';

function pick(...values: (string | undefined)[]) {
	return values.find((value) => value?.trim());
}

function readEnv(platform: App.Platform | undefined) {
	const cloudflare = platform?.env;

	return {
		url: pick(cloudflare?.SUPABASE_URL, env.SUPABASE_URL),
		publishableKey: pick(cloudflare?.SUPABASE_PUBLISHABLE_KEY, env.SUPABASE_PUBLISHABLE_KEY),
		serviceRoleKey: pick(cloudflare?.SUPABASE_SERVICE_ROLE_KEY, env.SUPABASE_SERVICE_ROLE_KEY),
		siteUrl: pick(cloudflare?.SITE_URL, env.SITE_URL)
	};
}

export function getSiteUrl(requestOrigin: string, platform?: App.Platform): string {
	const configured = readEnv(platform).siteUrl?.replace(/\/$/, '');
	if (configured) return configured;

	// Wrangler / proxy origins are often wrong for OAuth redirects.
	if (requestOrigin === 'https://localhost' || requestOrigin === 'http://localhost') {
		return 'http://localhost:5173';
	}

	return requestOrigin.replace(/\/$/, '');
}

export function getSupabaseConfig(platform: App.Platform | undefined): SupabaseConfig | null {
	const { url, publishableKey, serviceRoleKey } = readEnv(platform);

	if (!url || !publishableKey || !serviceRoleKey) {
		if (import.meta.env.DEV) {
			console.warn('[spendwise/delete] Missing Supabase env', {
				hasUrl: Boolean(url),
				hasPublishableKey: Boolean(publishableKey),
				hasServiceRoleKey: Boolean(serviceRoleKey),
				hasPlatformEnv: Boolean(platform?.env)
			});
		}
		return null;
	}

	return { url, publishableKey, serviceRoleKey };
}

export function createRouteSupabaseClient(cookies: Cookies, config: SupabaseConfig) {
	return createServerClient(config.url, config.publishableKey, {
		cookies: {
			getAll() {
				return cookies.getAll();
			},
			setAll(cookiesToSet) {
				for (const { name, value, options } of cookiesToSet) {
					cookies.set(name, value, { ...options, path: AUTH_COOKIE_PATH });
				}
			}
		}
	});
}

export function createAdminClient(config: SupabaseConfig) {
	return createClient(config.url, config.serviceRoleKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	});
}

export function spendwiseAuthCallbackUrl(requestOrigin: string, platform?: App.Platform) {
	return `${getSiteUrl(requestOrigin, platform)}${SPENDWISE_AUTH_CALLBACK_PATH}`;
}
