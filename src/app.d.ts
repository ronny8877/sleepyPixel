declare global {
	namespace App {
		interface Platform {
			env: {
				ASSETS: Fetcher;
				SUPABASE_URL: string;
				SITE_URL: string;
				SUPABASE_PUBLISHABLE_KEY: string;
				SUPABASE_SERVICE_ROLE_KEY: string;
			};
		}
	}
}

export {};
