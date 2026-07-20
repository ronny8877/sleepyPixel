<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Seo from '$lib/components/Seo.svelte';
	import SiteShell from '$lib/components/SiteShell.svelte';
	import { pageTitle, site } from '$lib/site';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let email = $state('');
	let loading = $state(false);

	const deleted = $derived(page.url.searchParams.get('deleted') === '1');
	const requestError = $derived(form?.requestError);
	const sent = $derived(form?.sent === true);
	const sentEmail = $derived(form?.email);
</script>

<Seo
	title={pageTitle('Delete account')}
	description="Request a secure email link to permanently delete your SpendWise cloud account."
	noindex={true}
/>

<SiteShell variant="legal" mainClass="py-8 sm:py-12">
	<div class="shell-narrow">
		<header class="mb-10">
			<p class="eyebrow">Account</p>
			<h1 class="heading-page">Delete your account</h1>
			<p class="text-body mt-3">
				Permanently delete your SpendWise cloud account. Local data on your device is not removed
				by this page — uninstall the app or clear app data on your phone to remove on-device records.
			</p>
		</header>

		{#if !data.configured}
			<div class="alert alert-error" role="alert">Account deletion is not configured on the server.</div>
		{:else if deleted}
			<div class="card space-y-4">
				<h2 class="heading-section">Account deleted</h2>
				<p class="text-body">
					Your SpendWise cloud account has been permanently deleted. If you use encrypted cloud
					backup, related server data will no longer be accessible with this account.
				</p>
				<p class="text-body">
					Questions? Contact <a href="mailto:{site.emails.support}" class="text-link"
						>{site.emails.support}</a
					>.
				</p>
				<a href={resolve('/spendwise')} class="text-link inline-block text-sm">Back to SpendWise</a>
			</div>
		{:else if sent && sentEmail}
			<div class="card space-y-4">
				<h2 class="heading-section">Check your email</h2>
				<p class="text-body">
					We sent a confirmation link to <span class="font-medium text-ink">{sentEmail}</span>. The
					link expires in 1 hour and can only be used once.
				</p>
				<p class="text-body text-sm text-muted">
					Didn't get it? Check spam, or wait a few minutes before requesting another link.
				</p>
			</div>
		{:else}
			<div class="card space-y-6">
				<div>
					<h2 class="heading-section">Request deletion link</h2>
					<p class="text-body mt-2">
						Enter the email address linked to your SpendWise account. We'll send a secure
						confirmation link if an account exists.
					</p>
				</div>

				<div class="rounded-2xl border border-line bg-canvas px-5 py-4">
					<p class="text-[15px] leading-relaxed text-muted">
						This permanently deletes your SpendWise <span class="font-medium text-ink">cloud account</span
						>. Subscriptions are managed in the App Store or Google Play — cancel there separately if
						needed.
					</p>
				</div>

				<form
					method="POST"
					action="?/request"
					class="space-y-5"
					use:enhance={() => {
						loading = true;
						return async ({ update }) => {
							loading = false;
							await update();
						};
					}}
				>
					<div>
						<label class="field-label" for="email">Email address</label>
						<input
							id="email"
							class="field-input"
							type="email"
							name="email"
							autocomplete="email"
							bind:value={email}
							placeholder="you@example.com"
							required
						/>
					</div>

					{#if requestError}
						<div class="alert alert-error" role="alert">{requestError}</div>
					{/if}

					<button type="submit" class="btn btn-primary" disabled={loading}>
						{loading ? 'Sending…' : 'Send confirmation email'}
					</button>
				</form>
			</div>
		{/if}

		<p class="text-body mt-8">
			Need help? <a href="mailto:{site.emails.support}" class="text-link">{site.emails.support}</a>
		</p>
	</div>
</SiteShell>
