import { getDeleteKv } from '$lib/delete/kv';

const HOUR = 60 * 60;

type RateLimitConfig = {
	key: string;
	limit: number;
	windowSeconds?: number;
};

export async function checkRateLimit(
	platform: App.Platform | undefined,
	{ key, limit, windowSeconds = HOUR }: RateLimitConfig
): Promise<boolean> {
	const kv = getDeleteKv(platform);
	const storageKey = `rl:${key}`;
	const current = Number((await kv.get(storageKey)) ?? '0');

	if (current >= limit) {
		return false;
	}

	await kv.put(storageKey, String(current + 1), { expirationTtl: windowSeconds });
	return true;
}

export function clientIp(request: Request): string {
	return (
		request.headers.get('cf-connecting-ip') ??
		request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
		'unknown'
	);
}
