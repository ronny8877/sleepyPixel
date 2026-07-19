<script lang="ts">
	let {
		eyebrow,
		title,
		description,
		align = 'left'
	}: {
		eyebrow?: string;
		title: string;
		description?: string;
		align?: 'left' | 'center';
	} = $props();
</script>

<div class:section-heading-center={align === 'center'}>
	{#if eyebrow}
		<p class="eyebrow">{eyebrow}</p>
	{/if}
	<h2 class="heading-section">{title}</h2>
	{#if description}
		<p class="text-lead mt-4 max-w-2xl" class:mx-auto={align === 'center'}>{description}</p>
	{/if}
</div>
