<script lang="ts">
	import { page } from '$app/state';
	import Seo from '$lib/components/Seo.svelte';
	import SiteShell from '$lib/components/SiteShell.svelte';
	import { pageTitle, site, spendwise } from '$lib/site';

	let { children } = $props();

	const origin = $derived(page.url.origin);

	const schema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Privacy Policy',
		description: 'How SpendWise collects, uses, stores, and protects your information.',
		url: `${origin}/spendwise/privacy`,
		isPartOf: {
			'@type': 'WebSite',
			name: site.name,
			url: origin
		},
		about: {
			'@type': 'SoftwareApplication',
			name: spendwise.name
		}
	});
</script>

<Seo
	title={pageTitle('Privacy Policy')}
	description="How SpendWise collects, uses, stores, and protects your information."
	jsonLd={schema}
/>

<SiteShell variant="legal" mainClass="py-8 sm:py-12">
	<div class="shell-narrow">
		<header class="mb-10">
			<p class="eyebrow">Legal</p>
			<h1 class="heading-page">Privacy Policy</h1>
			<p class="text-body mt-3">Effective July 19, 2026 · {spendwise.name}</p>
		</header>

		<article class="prose-legal">
			{@render children()}
		</article>
	</div>
</SiteShell>
