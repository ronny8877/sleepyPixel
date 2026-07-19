<script lang="ts">
	import SiteHeader from './SiteHeader.svelte';
	import SiteFooter from './SiteFooter.svelte';

	let {
		children,
		variant = 'default',
		mainClass = ''
	}: {
		children?: import('svelte').Snippet;
		variant?: 'home' | 'default' | 'legal';
		mainClass?: string;
	} = $props();
</script>

<div class="flex min-h-dvh flex-col">
	<SiteHeader {variant} />

	<main class="flex-1 {mainClass}">
		{@render children?.()}
	</main>

	<SiteFooter {variant} />
</div>
