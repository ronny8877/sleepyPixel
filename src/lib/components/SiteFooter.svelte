<script lang="ts">
	import { resolve } from '$app/paths';
	import { site, spendwise } from '$lib/site';

	let { variant = 'default' }: { variant?: 'home' | 'default' | 'legal' } = $props();
</script>

<footer class="site-footer">
	<div class="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
		<div class="space-y-2">
			<p class="font-display text-sm font-semibold text-ink">{site.name}</p>
			<p class="max-w-sm text-sm leading-relaxed text-muted">
				{#if variant === 'home'}
					{site.tagline} Quiet software for everyday life.
				{:else}
					{spendwise.name} by {site.name} · <span class="font-mono text-xs">{spendwise.packageId}</span>
				{/if}
			</p>
		</div>

		<div class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
			<a href={resolve('/')} class="footer-link">Home</a>
			<a href={resolve('/spendwise')} class="footer-link">SpendWise</a>
			<a href={resolve('/spendwise/privacy')} class="footer-link">Privacy</a>
			<a href={resolve('/spendwise/terms')} class="footer-link">Terms</a>
			{#if variant !== 'home'}
				<a href="mailto:{site.emails.support}" class="footer-link">Support</a>
			{/if}
		</div>
	</div>

	<div class="shell border-t border-line py-5 text-xs text-muted">
		© {new Date().getFullYear()} {site.name}. All rights reserved.
	</div>
</footer>
