<script lang="ts">
	let {
		children,
		href,
		class: className = '',
		interactive = false,
		span = 1
	}: {
		children?: import('svelte').Snippet;
		href?: string;
		class?: string;
		interactive?: boolean;
		span?: 1 | 2 | 3;
	} = $props();

	const spanClass = $derived(
		span === 3 ? 'card-span-3' : span === 2 ? 'card-span-2' : ''
	);
</script>

{#if href}
	<a {href} class="card card-interactive card-link {spanClass} {className}">
		{@render children?.()}
	</a>
{:else}
	<article class="card {interactive ? 'card-interactive' : ''} {spanClass} {className}">
		{@render children?.()}
	</article>
{/if}
