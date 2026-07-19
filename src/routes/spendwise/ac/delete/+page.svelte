<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Seo from '$lib/components/Seo.svelte';
	import SiteShell from '$lib/components/SiteShell.svelte';
	import { pageTitle, site } from '$lib/site';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let confirmEmail = $state('');
	let loading = $state(false);

	const deleted = $derived(page.url.searchParams.get('deleted') === '1');
	const signedInEmail = $derived(data.email);
	const authError = $derived(form?.authError ?? data.authError);
	const deleteError = $derived(form?.deleteError);

	$effect(() => {
		if (signedInEmail) {
			confirmEmail = signedInEmail;
		}
	});
</script>

<Seo
	title={pageTitle('Delete account')}
	description="Sign in with Google to permanently delete your SpendWise cloud account."
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
		{:else if signedInEmail}
			<div class="card space-y-6">
				<div>
					<p class="text-sm text-muted">Signed in with Google as</p>
					<p class="mt-1 font-medium text-ink">{signedInEmail}</p>
				</div>

				<div class="rounded-2xl border border-line bg-canvas px-5 py-4">
					<p class="text-[15px] leading-relaxed text-muted">
						This permanently deletes your SpendWise <span class="font-medium text-ink">cloud account</span
						>. It cannot be undone. Subscriptions are managed in the App Store or Google Play —
						cancel there separately if needed.
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
					<div>
						<label class="field-label" for="confirm-email">Confirm your email</label>
						<input
							id="confirm-email"
							class="field-input"
							type="email"
							name="confirmEmail"
							autocomplete="email"
							bind:value={confirmEmail}
							placeholder={signedInEmail}
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

					<div class="flex flex-wrap gap-3">
						<button type="submit" class="btn btn-danger" disabled={loading}>
							{loading ? 'Deleting…' : 'Delete my account'}
						</button>
					</div>
				</form>

				<form
					method="POST"
					action="?/logout"
					use:enhance={() => {
						loading = true;
						return async ({ update }) => {
							loading = false;
							await update();
						};
					}}
				>
					<button type="submit" class="btn btn-secondary" disabled={loading}>Sign out</button>
				</form>
			</div>
		{:else}
			<div class="card">
				<h2 class="heading-section">Sign in to continue</h2>
				<p class="text-body mt-2">
					SpendWise uses Google sign-in. Use the same Google account linked in the app.
				</p>

				{#if authError}
					<div class="alert alert-error mt-5" role="alert">{authError}</div>
				{/if}

				<form
					method="POST"
					action="?/google"
					class="mt-6"
					use:enhance={() => {
						loading = true;
						return async ({ update }) => {
							loading = false;
							await update();
						};
					}}
				>
					<button type="submit" class="btn btn-google" disabled={loading}>
						<svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
							<path
								fill="#4285F4"
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							/>
							<path
								fill="#34A853"
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							/>
							<path
								fill="#FBBC05"
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							/>
							<path
								fill="#EA4335"
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							/>
						</svg>
						{loading ? 'Redirecting…' : 'Continue with Google'}
					</button>
				</form>
			</div>
		{/if}

		<p class="text-body mt-8">
			Need help? <a href="mailto:{site.emails.support}" class="text-link">{site.emails.support}</a>
		</p>
	</div>
</SiteShell>
