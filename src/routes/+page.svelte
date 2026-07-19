<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Seo from '$lib/components/Seo.svelte';
	import SiteShell from '$lib/components/SiteShell.svelte';
	import AppCard from '$lib/components/AppCard.svelte';
	import { pageTitle, site, spendwise } from '$lib/site';

	const origin = $derived(page.url.origin);

	const organizationSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: site.name,
		url: origin,
		description: site.description,
		email: site.emails.support,
		brand: {
			'@type': 'Brand',
			name: site.name
		}
	});

	const websiteSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: site.name,
		url: origin,
		description: site.description,
		publisher: {
			'@type': 'Organization',
			name: site.name
		}
	});
</script>

<Seo
	title={pageTitle(site.name)}
	description="{site.description} Home of {spendwise.name}."
	jsonLd={[organizationSchema, websiteSchema]}
/>

<SiteShell variant="home">
	<div class="shell">
		<section class="hero-home">
			<p class="eyebrow animate-fade-up">Developer studio</p>

			<h1 class="heading-hero animate-fade-up delay-1 mt-2 max-w-3xl">{site.name}</h1>

			<p class="text-lead animate-fade-up delay-2 mt-6 max-w-xl">
				{site.tagline} We make software that stays out of your way — private by default, simple
				by design.
			</p>
		</section>

		<section class="apps-section animate-fade-up delay-3">
			<div class="mb-6 flex items-end justify-between gap-4">
				<div>
					<p class="eyebrow mb-2">Apps</p>
					<h2 class="heading-section">Built by {site.name}</h2>
				</div>
			</div>

			<AppCard
				href={resolve('/spendwise')}
				name={spendwise.name}
				tagline={spendwise.tagline}
				description={spendwise.description}
				platforms={spendwise.platforms}
			/>
		</section>
	</div>
</SiteShell>
