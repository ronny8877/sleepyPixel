<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import Seo from '$lib/components/Seo.svelte';
	import SiteShell from '$lib/components/SiteShell.svelte';
	import { pageTitle, site } from '$lib/site';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let confirmEmail = $state('');
	let loading = $state(false);
	const deleteError = $derived(form?.deleteError);

	$effect(() => {
		if (data.email) {
			confirmEmail = data.email;
		}
	});
</script>

<Seo
	title={pageTitle('Confirm deletion')}
	description="Confirm permanent deletion of your SpendWise cloud account."
	noindex={true}
/>

<SiteShell variant="legal" mainClass="py-8 sm:py-12">
	<div class="shell-narrow">
		<header class="mb-10">
			<p class="eyebrow">Account</p>
			<h1 class="heading-page">Confirm deletion</h1>
		</header>

		{#if !data.configured}
			<div class="alert alert-error" role="alert">Account deletion is not configured on the server.</div>
		{:else if !data.valid || !data.email || !data.hash}
			<div class="card space-y-4">
				<h2 class="heading-section">Invalid or expired link</h2>
				<p class="text-body">
					This confirmation link is invalid, expired, or has already been used. Request a new link to
					continue.
				</p>
				<a href={resolve('/spendwise/ac/delete')} class="text-link inline-block text-sm"
					>Request a new link</a
				>
			</div>
		{:else}
			<div class="card space-y-6">
				<div>
					<p class="text-sm text-muted">Account to delete</p>
					<p class="mt-1 font-medium text-ink">{data.email}</p>
				</div>

				<div class="rounded-2xl border border-line bg-canvas px-5 py-4">
					<p class="text-[15px] leading-relaxed text-muted">
						This permanently deletes your SpendWise <span class="font-medium text-ink">cloud account</span
						>. It cannot be undone.
					</p>
				</div>

				<form
					method="POST"
					action="?/delete"
					class="space-y-5"
					use:enhance={() => {
						loading = true;
						return async ({ update }) => {
							loading = false;
							await update();
						};
					}}
				>
					<input type="hidden" name="hash" value={data.hash} />

					<div>
						<label class="field-label" for="confirm-email">Confirm your email</label>
						<input
							id="confirm-email"
							class="field-input"
							type="email"
							name="confirmEmail"
							autocomplete="email"
							bind:value={confirmEmail}
							placeholder={data.email}
							required
						/>
					</div>

					<label class="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed text-muted">
						<input
							class="mt-1 h-4 w-4 rounded border-line text-accent focus:ring-accent"
							type="checkbox"
							name="confirm"
							required
						/>
						<span>I understand this permanently deletes my cloud account and cannot be undone.</span>
					</label>

					{#if deleteError}
						<div class="alert alert-error" role="alert">{deleteError}</div>
					{/if}

					<button type="submit" class="btn btn-danger" disabled={loading}>
						{loading ? 'Deleting…' : 'Delete my account'}
					</button>
				</form>
			</div>
		{/if}

		<p class="text-body mt-8">
			Need help? <a href="mailto:{site.emails.support}" class="text-link">{site.emails.support}</a>
		</p>
	</div>
</SiteShell>
