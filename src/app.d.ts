// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
/// <reference path="../worker-configuration.d.ts" />

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: Cloudflare.Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf: IncomingRequestCfProperties;
		}
	}
}

export {};
