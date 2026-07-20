import { getDeleteKv } from '$lib/delete/kv';

const TOKEN_TTL_SECONDS = 60 * 60;

export type DeleteTokenRecord = {
	email: string;
	userId: string;
	createdAt: number;
};

function tokenKey(hash: string) {
	return `delete:${hash}`;
}

export function createDeleteToken(): string {
	const bytes = crypto.getRandomValues(new Uint8Array(32));
	return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function storeDeleteToken(
	platform: App.Platform | undefined,
	hash: string,
	record: DeleteTokenRecord
) {
	const kv = getDeleteKv(platform);
	await kv.put(tokenKey(hash), JSON.stringify(record), {
		expirationTtl: TOKEN_TTL_SECONDS
	});
}

export async function loadDeleteToken(platform: App.Platform | undefined, hash: string) {
	const kv = getDeleteKv(platform);
	const raw = await kv.get(tokenKey(hash));
	if (!raw) return null;

	try {
		return JSON.parse(raw) as DeleteTokenRecord;
	} catch {
		return null;
	}
}

export async function consumeDeleteToken(platform: App.Platform | undefined, hash: string) {
	const record = await loadDeleteToken(platform, hash);
	if (!record) return null;

	const kv = getDeleteKv(platform);
	await kv.delete(tokenKey(hash));
	return record;
}
