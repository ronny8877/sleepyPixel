<script lang="ts">
	import { page } from '$app/state';
	import { spendwise, type SeoProps } from '$lib/site';

	let {
		title,
		description,
		path,
		image = spendwise.icon,
		imageAlt = `${spendwise.name} app icon`,
		type = 'website',
		noindex = false,
		jsonLd
	}: SeoProps = $props();

	const canonical = $derived(`${page.url.origin}${path ?? page.url.pathname}`);
	const ogImage = $derived(image.startsWith('http') ? image : `${page.url.origin}${image}`);
	const schemas = $derived(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow, max-image-preview:large" />
	{/if}

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content="SleepyPixel" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:alt" content={imageAlt} />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:image:alt" content={imageAlt} />

	<meta name="application-name" content="SleepyPixel" />
	<meta name="apple-mobile-web-app-title" content="SleepyPixel" />
	<meta name="theme-color" content="#f5f5f7" />

	{#each schemas as schema, index (index)}
		<svelte:element this={'script'} type="application/ld+json">
			{JSON.stringify(schema)}
		</svelte:element>
	{/each}
</svelte:head>
