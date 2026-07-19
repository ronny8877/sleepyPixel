export const site = {
	name: 'SleepyPixel',
	tagline: 'Apps built with care.',
	description:
		'SleepyPixel builds quiet, useful software — private by default, simple by design.',
	url: 'https://sleepypixel.dev',
	locale: 'en_US',
	emails: {
		support: 'support@sleepypixel.dev',
		privacy: 'privacy@sleepypixel.dev',
		legal: 'legal@sleepypixel.dev'
	}
} as const;

export const spendwise = {
	name: 'SpendWise',
	tagline: 'Track smarter, not harder.',
	description:
		'A private, offline-first personal finance tracker. Start locally with no account. Optional encrypted backup when you go Pro.',
	packageId: 'com.sleepypixel.spendwise',
	icon: '/icon.png',
	platforms: ['iOS', 'Android'],
	categories: ['Finance', 'Productivity']
} as const;

export type SeoProps = {
	title: string;
	description: string;
	path?: string;
	image?: string;
	imageAlt?: string;
	type?: 'website' | 'article';
	noindex?: boolean;
	jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function pageTitle(title: string, brand: 'sleepypixel' | 'spendwise' = 'sleepypixel') {
	if (brand === 'sleepypixel' && title === site.name) return site.name;
	if (brand === 'spendwise' && title === spendwise.name) return `${spendwise.name} · ${site.name}`;
	return `${title} · ${spendwise.name}`;
}
