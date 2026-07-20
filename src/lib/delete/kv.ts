type KvStore = {
	get(key: string): Promise<string | null>;
	put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
	delete(key: string): Promise<void>;
};

const memory = new Map<string, { value: string; expiresAt: number | null }>();

function memoryStore(): KvStore {
	return {
		async get(key) {
			const entry = memory.get(key);
			if (!entry) return null;
			if (entry.expiresAt && entry.expiresAt <= Date.now()) {
				memory.delete(key);
				return null;
			}
			return entry.value;
		},
		async put(key, value, options) {
			const expiresAt = options?.expirationTtl
				? Date.now() + options.expirationTtl * 1000
				: null;
			memory.set(key, { value, expiresAt });
		},
		async delete(key) {
			memory.delete(key);
		}
	};
}

export function getDeleteKv(platform: App.Platform | undefined): KvStore {
	const binding = platform?.env?.DELETE_TOKENS;
	if (binding) return binding;

	if (import.meta.env.DEV) {
		console.warn('[spendwise/delete] DELETE_TOKENS KV binding missing, using in-memory store');
	}

	return memoryStore();
}
