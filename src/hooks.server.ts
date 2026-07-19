import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { SPENDWISE_AUTH_CALLBACK_PATH } from '$lib/supabase/server';

const handleOAuthCatch: Handle = async ({ event, resolve }) => {
	// event.url.searchParams throws on prerendered pages during build
	const requestUrl = new URL(event.request.url);
	const code = requestUrl.searchParams.get('code');

	if (!code || requestUrl.pathname === SPENDWISE_AUTH_CALLBACK_PATH) {
		return resolve(event);
	}

	const callback = new URL(SPENDWISE_AUTH_CALLBACK_PATH, requestUrl.origin);
	for (const [key, value] of requestUrl.searchParams.entries()) {
		callback.searchParams.set(key, value);
	}

	throw redirect(303, `${callback.pathname}${callback.search}`);
};

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});
	});

export const handle = sequence(handleOAuthCatch, handleParaglide);
