declare global {
	namespace App {
		interface Platform {
			env: {
				ASSETS: Fetcher;
				SUPABASE_URL: string;
				SITE_URL: string;
				SUPABASE_SERVICE_ROLE_KEY: string;
				RESEND_API_KEY: string;
				DELETE_TOKENS: KVNamespace;
			};
		}
	}
}

export {};
