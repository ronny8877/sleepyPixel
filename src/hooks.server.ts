import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { SPENDWISE_AUTH_CALLBACK_PATH } from '$lib/supabase/server';

const handleOAuthCatch: Handle = async ({ event, resolve }) => {
	const code = event.url.searchParams.get('code');
	if (!code || event.url.pathname === SPENDWISE_AUTH_CALLBACK_PATH) {
		return resolve(event);
	}

	const target = new URL(SPENDWISE_AUTH_CALLBACK_PATH, event.url);
	for (const [key, value] of event.url.searchParams.entries()) {
		target.searchParams.set(key, value);
	}

	throw redirect(303, `${target.pathname}${target.search}`);
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
