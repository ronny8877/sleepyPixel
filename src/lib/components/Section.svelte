<script lang="ts">
	let {
		children,
		class: className = '',
		border = true,
		id
	}: {
		children?: import('svelte').Snippet;
		class?: string;
		border?: boolean;
		id?: string;
	} = $props();
</script>

<section {id} class="section {className}" class:section-bordered={border}>
	{@render children?.()}
</section>
