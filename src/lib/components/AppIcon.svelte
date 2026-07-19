<script lang="ts">
	import { spendwise } from '$lib/site';

	let {
		size = 'md',
		class: className = ''
	}: {
		size?: 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
	} = $props();

	const sizes = {
		sm: 'h-10 w-10 rounded-xl',
		md: 'h-12 w-12 rounded-2xl',
		lg: 'h-14 w-14 rounded-2xl',
		xl: 'h-20 w-20 rounded-[1.35rem]'
	} as const;
</script>

<img
	src={spendwise.icon}
	alt="{spendwise.name} app icon"
	class="shrink-0 object-cover shadow-sm ring-1 ring-line/60 {sizes[size]} {className}"
	width="80"
	height="80"
	loading="eager"
	decoding="async"
/>
