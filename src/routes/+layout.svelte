<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/icon.png" type="image/png" />
	<link rel="apple-touch-icon" href="/icon.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="theme-color" content="#f5f5f7" />
	<meta name="format-detection" content="telephone=no" />
</svelte:head>

{@render children()}

<div style="display: none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}>{locale}</a>
	{/each}
</div>
