<script lang="ts">
	import AppIcon from './AppIcon.svelte';

	let {
		href,
		name,
		tagline,
		description,
		platforms
	}: {
		href: string;
		name: string;
		tagline: string;
		description: string;
		platforms: readonly string[];
	} = $props();
</script>

<a {href} class="app-card group">
	<div class="app-card-icon">
		<AppIcon size="lg" />
	</div>

	<div class="app-card-body">
		<div class="app-card-meta">
			<h2 class="app-card-title">{name}</h2>
			<span class="badge">{platforms.join(' · ')}</span>
		</div>
		<p class="app-card-tagline">{tagline}</p>
		<p class="app-card-description">{description}</p>
	</div>

	<div class="app-card-arrow" aria-hidden="true">
		<svg class="h-5 w-5" viewBox="0 0 20 20" fill="none">
			<path
				d="M4 10h12m0 0l-4-4m4 4l-4 4"
				stroke="currentColor"
				stroke-width="1.75"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
</a>
