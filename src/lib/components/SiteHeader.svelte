<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { site, spendwise } from '$lib/site';
	import AppIcon from './AppIcon.svelte';

	let { variant = 'default' }: { variant?: 'home' | 'default' | 'legal' } = $props();

	const onSpendwise = $derived(page.url.pathname.includes('/spendwise'));
	const onPrivacy = $derived(page.url.pathname.includes('/privacy'));
	const onTerms = $derived(page.url.pathname.includes('/terms'));
</script>

<header class="site-header">
	<nav class="shell flex h-16 items-center justify-between gap-6">
		<div class="flex min-w-0 items-center gap-3">
			<a href={resolve('/')} class="font-display text-sm font-semibold tracking-tight text-ink">
				{site.name}
			</a>

			{#if onSpendwise}
				<span class="text-line" aria-hidden="true">/</span>
				<a
					href={resolve('/spendwise')}
					class="flex min-w-0 items-center gap-2 truncate"
					class:font-display={variant !== 'legal'}
					class:font-semibold={variant !== 'legal'}
					class:text-ink={!onPrivacy && !onTerms}
					class:text-muted={onPrivacy || onTerms}
				>
					{#if variant !== 'legal'}
						<AppIcon size="sm" class="hidden sm:block" />
					{/if}
					<span class="truncate">{spendwise.name}</span>
				</a>
			{/if}
		</div>

		<div class="flex items-center gap-1 sm:gap-2">
			{#if variant === 'home'}
				<a href={resolve('/spendwise')} class="nav-link">Apps</a>
			{:else if onSpendwise}
				<a
					href={resolve('/spendwise')}
					class="nav-link"
					class:nav-link-active={!onPrivacy && !onTerms}
					aria-current={!onPrivacy && !onTerms ? 'page' : undefined}
				>
					Overview
				</a>
				<a
					href={resolve('/spendwise/privacy')}
					class="nav-link"
					class:nav-link-active={onPrivacy}
					aria-current={onPrivacy ? 'page' : undefined}
				>
					Privacy
				</a>
				<a
					href={resolve('/spendwise/terms')}
					class="nav-link"
					class:nav-link-active={onTerms}
					aria-current={onTerms ? 'page' : undefined}
				>
					Terms
				</a>
			{/if}
		</div>
	</nav>
</header>
