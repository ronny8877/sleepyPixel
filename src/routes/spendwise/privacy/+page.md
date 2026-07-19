**Effective date:** July 19, 2026  
**Last updated:** July 19, 2026

SpendWise ("**SpendWise**", "**we**", "**us**", or "**our**") is a local-first personal finance app operated under the SleepyPixel brand (`com.sleepypixel.spendwise`). This Privacy Policy explains what information we process, why we process it, and the choices you have.

By using SpendWise (the mobile app and related websites or services), you agree to this Policy. If you do not agree, please do not use SpendWise.

---

## 1. Our privacy principles

- **Local-first by default.** Core financial data lives on your device. You can use SpendWise without creating an account.
- **No ads built on your money.** We do not sell your personal data. We do not use your transactions, balances, budgets, or goals for advertising.
- **Optional cloud is encrypted on-device.** Pro encrypted backups are encrypted on your device before upload. We store opaque ciphertext we cannot read as plaintext financial records.
- **Analytics without financial PII.** Product analytics (PostHog) measure how the app is used — not what you spend.

---

## 2. Who this Policy covers

This Policy applies to:

- The SpendWise iOS and Android apps
- Optional account, subscription, and encrypted backup features
- Our website and marketing pages that link to this Policy

It does **not** cover third-party websites, app stores, or services you open from within SpendWise (for example Apple App Store, Google Play, or a payment processor’s own pages). Those have their own privacy policies.

---

## 3. Information we process

### 3.1 Financial and app data on your device

When you use SpendWise, the following is stored **locally** in an app-sandboxed database on your device (unless you choose optional backup features described below):

- Accounts, balances/activity summaries, and transaction history
- Budgets, goals, categories, and related settings
- People / parties and split-expense information you enter
- Recurring transactions, subscriptions you track, reminders, and preferences
- App settings (theme, currency, onboarding and consent timestamps, lock settings)
- Optional biometric / device-lock preferences (credentials stay with the OS; we do not receive your biometrics)

**You control this data.** We do not automatically receive a copy of your local ledger unless you use a feature that sends data off-device (for example encrypted backup).

### 3.2 Account and authentication (optional)

If you create or sign into an account:

- Authentication is provided by **Supabase**
- We may process identifiers such as email address, auth tokens, account/user IDs, and sign-in metadata needed to operate the account

Local-only use does not require an account.

### 3.3 Subscriptions and purchases (optional)

Paid plans and in-app purchases are handled by **RevenueCat** together with **Apple** and/or **Google** billing. We (and these providers) may process:

- Subscription status, product identifiers, purchase/entitlement metadata
- App-store account identifiers as provided by the platform (not your full payment card number, which is handled by Apple/Google)

### 3.4 Encrypted cloud backup (optional, Pro)

If you enable encrypted backup:

- Your export/backup payload is **encrypted on your device** before upload
- We store **opaque encrypted chunks** on our backup infrastructure (for example object storage behind our API)
- We do **not** have access to plaintext transactions, balances, or budgets from those chunks under normal operation
- You are responsible for keeping any backup password / recovery material you choose; if you lose it, we may be unable to recover your backup contents

Auth to backup APIs uses your signed-in session (for example a Supabase JWT). The server’s role is authenticated storage of ciphertext, not reading your ledger.

### 3.5 Product analytics

We use **PostHog** for anonymous/product usage analytics to improve SpendWise. Typical events include:

- Screen views and feature usage (for example buttons tapped)
- Crash / error signals and technical diagnostics
- Device and app metadata (OS, app version, device model class)

**We do not send to PostHog:**

- Transaction amounts, payees, notes, or full transaction records
- Account balances, budgets, goals amounts, or category financial detail
- Bank credentials (SpendWise is not a bank-login / open-banking scraper)

### 3.6 Notifications

If you enable notifications (for example reminders or bill alerts):

- Preferences and scheduling are primarily handled on your device / OS
- We do not collect the content of your financial notifications on our servers as a substitute for your ledger

### 3.7 Support communications

If you email us (for example `support@sleepypixel.dev` or `privacy@sleepypixel.dev`), we process the content of your message and contact details to respond.

### 3.8 Website

Our website may collect standard technical logs (IP address, browser type, pages viewed) via hosting or analytics tools if enabled. Marketing pages do not need your finance ledger to function.

---

## 4. How we use information

We use information to:

- Provide, maintain, and improve SpendWise
- Operate optional account, subscription, and encrypted backup features
- Understand product usage and fix crashes (analytics)
- Communicate about the service, security, or support requests
- Enforce our Terms, prevent abuse, and comply with law
- Honor exports, deletions, and other requests you make in-product or by email

We do **not** sell personal data.

---

## 5. Legal bases (where applicable)

Depending on your location, we rely on one or more of:

- **Contract / service delivery** — to provide the app and optional paid features you request
- **Legitimate interests** — product improvement, security, and fraud prevention, balanced against your rights
- **Consent** — where required (for example certain analytics, notifications, or marketing, if applicable)
- **Legal obligation** — when we must retain or disclose information to comply with law

In India, we process personal data in line with applicable law, including the Digital Personal Data Protection Act, 2023, where it applies.

---

## 6. Sharing and processors

We share data only as needed to run SpendWise:

| Party | Role |
| --- | --- |
| **Supabase** | Optional authentication / account |
| **RevenueCat**, **Apple**, **Google** | Subscriptions and entitlements |
| **PostHog** | Product analytics (no financial ledger fields) |
| **Cloudflare / our backup API & storage** | Authenticated storage of opaque encrypted backup chunks |
| **Hosting / email providers** | Website and support communications |

We may also disclose information if required by law, legal process, or to protect rights, safety, and security — or in connection with a merger, acquisition, or asset transfer (with appropriate protections).

Third-party processors act under their own terms and privacy policies for the services they provide.

---

## 7. International transfers

We and our processors may process data in countries other than where you live (including India, the United States, and other locations where cloud providers operate). Where required, we use appropriate safeguards available under applicable law.

---

## 8. Security

We take reasonable technical and organizational measures appropriate to the nature of the service, including:

- Local storage in the mobile OS app sandbox
- On-device encryption of Pro backup payloads before upload
- Authenticated access to backup APIs for signed-in users
- Separation of analytics events from financial ledger fields

No method of storage or transmission is 100% secure. You should use a device lock (and optional app lock / biometrics), keep your OS updated, and protect account credentials and backup passwords.

---

## 9. Retention

- **Local data:** Remains on your device until you delete it in-app, clear app data, or uninstall. Uninstalling removes local data from that device.
- **Encrypted backups:** Retained according to your plan and product settings until you delete them while signed in, your entitlement ends per product rules, or we delete them as required by law or abuse prevention.
- **Account / subscription metadata:** Kept while your account/subscription is active and for a reasonable period afterward for billing, support, and legal compliance.
- **Analytics:** Retained by PostHog (and us) according to configured retention and their policies.
- **Support emails:** Kept as long as needed to resolve your request and for legitimate business records.

---

## 10. Your choices and rights

Depending on your location, you may have rights to access, correct, delete, export, restrict, or object to certain processing, and to withdraw consent where processing is consent-based.

**In SpendWise you can typically:**

- Export data from Settings (for example CSV / Excel / JSON, as available)
- Delete local data via in-app delete controls where provided
- Manage or delete encrypted cloud backups from Settings while signed in (paid features)
- Disable notifications in system or app settings
- Stop analytics by limiting network access or uninstalling (and, where we offer in-product analytics controls, using those)

To exercise rights or ask questions, contact **privacy@sleepypixel.dev**. We may need to verify your request. Some rights may not apply to data we cannot access (for example plaintext inside encrypted backups we cannot decrypt).

If you are in a region with a data protection authority, you may also lodge a complaint with that authority.

---

## 11. Children’s privacy

SpendWise is not directed at children under **13** (or the higher age required in your country). We do not knowingly collect personal information from children. If you believe a child has provided us personal information, contact **privacy@sleepypixel.dev** and we will take appropriate steps.

---

## 12. Do Not Track / automated decisions

We do not use your financial ledger for automated decisions that produce legal or similarly significant effects about you. Browser “Do Not Track” signals are not uniformly standardized; our app analytics practices are described in Section 3.5.

---

## 13. Changes to this Policy

We may update this Privacy Policy from time to time. We will revise the “Last updated” date and, where appropriate, notify you in the app or on the website. Continued use after changes become effective constitutes acceptance of the updated Policy, except where applicable law requires additional consent.

---

## 14. Contact

- **Privacy:** privacy@sleepypixel.dev  
- **Support:** support@sleepypixel.dev  
- **Legal:** legal@sleepypixel.dev  

SpendWise / SleepyPixel  
Product: SpendWise (`com.sleepypixel.spendwise`)

For related terms governing use of the service, see our [Terms of Service](/spendwise/terms).
