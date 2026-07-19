<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Seo from '$lib/components/Seo.svelte';
	import SiteShell from '$lib/components/SiteShell.svelte';
	import Section from '$lib/components/Section.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import Card from '$lib/components/Card.svelte';
	import AppIcon from '$lib/components/AppIcon.svelte';
	import { pageTitle, site, spendwise } from '$lib/site';

	const origin = $derived(page.url.origin);

	const features = [
		{
			title: 'Smart Budgeting',
			body: 'Create monthly limits for any category. Watch live progress bars fill as you spend.'
		},
		{
			title: 'Split Expenses',
			body: 'Dining out? Group trip? Assign shares with one tap. Know who owes whom.'
		},
		{
			title: 'Goal Tracking',
			body: 'Set savings goals and watch them grow. Link goals to accounts for automatic progress.'
		},
		{
			title: 'Beautiful Analytics',
			body: 'Heatmaps, trend lines, category breakdowns across days, weeks, and months.'
		},
		{
			title: 'Smart Reminders',
			body: 'Daily nudge to log expenses. Alerts for upcoming bills and subscriptions.'
		},
		{
			title: 'Subscriptions & Recurring',
			body: 'Track Netflix, EMIs, rent, and any repeating payment. Approve or skip with one tap.'
		},
		{
			title: 'Export & Encrypted Backup',
			body: 'Export CSV, Excel, or JSON anytime. Pro syncs encrypted backups — encrypted on your device first.',
			span: 3 as const
		}
	];

	const audience = [
		'People who want spending clarity without giving data to a bank-style fintech',
		'Couples and roommates who split expenses',
		'Freelancers tracking irregular income',
		'Anyone tired of bloated finance apps that require sign-ups to start'
	];

	const appSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: spendwise.name,
		applicationCategory: 'FinanceApplication',
		operatingSystem: spendwise.platforms.join(', '),
		description: spendwise.description,
		url: `${origin}/spendwise`,
		image: `${origin}${spendwise.icon}`,
		author: {
			'@type': 'Organization',
			name: site.name,
			url: origin
		},
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD'
		}
	});
</script>

<Seo
	title={pageTitle(spendwise.name, 'spendwise')}
	description={spendwise.description}
	image={spendwise.icon}
	imageAlt="{spendwise.name} — personal finance tracker app icon"
	jsonLd={appSchema}
/>

<SiteShell>
	<div class="shell">
		<section class="pb-10 pt-4 sm:pb-14 sm:pt-6">
			<div class="animate-fade-up flex flex-wrap items-center gap-3">
				<AppIcon size="lg" />
				<span class="badge">{spendwise.platforms.join(' · ')}</span>
			</div>

			<h1 class="heading-page animate-fade-up delay-1 mt-8">{spendwise.name}</h1>
			<p class="text-lead animate-fade-up delay-2 mt-3 font-display">{spendwise.tagline}</p>
			<p class="text-body animate-fade-up delay-3 mt-5 max-w-xl">{spendwise.description}</p>
		</section>

		<Section>
			<SectionHeading
				eyebrow="Overview"
				title="What SpendWise does"
				description="Every expense falls into one of four universal categories — Essentials, Lifestyle, Growth, and Extra. You set budgets, track spending in real time, and see patterns emerge naturally."
			/>
		</Section>

		<Section>
			<SectionHeading
				eyebrow="Features"
				title="Everything you need"
				description="Stay on top of money — without the bloat."
			/>

			<div class="bento-grid">
				{#each features as feature (feature.title)}
					<Card span={feature.span ?? 1}>
						<h3 class="font-display text-lg font-semibold tracking-tight text-ink">
							{feature.title}
						</h3>
						<p class="text-body mt-2">{feature.body}</p>
					</Card>
				{/each}
			</div>
		</Section>

		<Section>
			<div class="grid gap-3 lg:grid-cols-[1.15fr_1fr]">
				<div>
					<SectionHeading
						eyebrow="Privacy"
						title="Built for privacy"
						description="SpendWise is local-first. Core financial data lives on your phone. Optional cloud backup is end-to-end encrypted with a password you control — the server only stores opaque chunks. We do not use your transactions, balances, or budgets for advertising."
					/>
				</div>
				<Card>
					<h3 class="font-display text-lg font-semibold tracking-tight text-ink">
						Analytics that respect you
					</h3>
					<p class="text-body mt-3">
						Anonymous usage analytics (via PostHog) help improve the app. We track which features
						people use — not your money.
					</p>
					<div class="mt-5 flex flex-wrap gap-4 text-sm">
						<a href={resolve('/spendwise/privacy')} class="text-link">Privacy Policy</a>
						<a href={resolve('/spendwise/terms')} class="text-link">Terms of Service</a>
					</div>
				</Card>
			</div>
		</Section>

		<Section>
			<SectionHeading eyebrow="Audience" title="Who it's for" />

			<ul class="mt-8 grid gap-3 sm:grid-cols-2">
				{#each audience as item (item)}
					<li class="list-item">
						<span class="list-item-dot" aria-hidden="true"></span>
						{item}
					</li>
				{/each}
			</ul>
		</Section>

		<Section border={false}>
			<div class="grid gap-3 sm:grid-cols-2">
				<Card>
					<h2 class="heading-section">Platforms</h2>
					<ul class="text-body mt-4 space-y-2">
						<li><span class="font-medium text-ink">iOS</span> — iPhone and iPad</li>
						<li><span class="font-medium text-ink">Android</span> — phones and tablets</li>
					</ul>
				</Card>
				<Card>
					<h2 class="heading-section">Contact</h2>
					<ul class="mt-4 space-y-3 text-[15px]">
						<li>
							<span class="text-muted">Support</span>
							<a href="mailto:{site.emails.support}" class="ml-2 font-medium text-ink hover:text-accent">
								{site.emails.support}
							</a>
						</li>
						<li>
							<span class="text-muted">Privacy</span>
							<a href="mailto:{site.emails.privacy}" class="ml-2 font-medium text-ink hover:text-accent">
								{site.emails.privacy}
							</a>
						</li>
						<li>
							<span class="text-muted">Legal</span>
							<a href="mailto:{site.emails.legal}" class="ml-2 font-medium text-ink hover:text-accent">
								{site.emails.legal}
							</a>
						</li>
					</ul>
				</Card>
			</div>
		</Section>
	</div>
</SiteShell>
