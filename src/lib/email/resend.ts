import { env } from '$env/dynamic/private';
import { site } from '$lib/site';

function getResendApiKey(platform: App.Platform | undefined) {
	return platform?.env?.RESEND_API_KEY ?? env.RESEND_API_KEY;
}

type SendDeleteEmailInput = {
	to: string;
	confirmUrl: string;
	platform?: App.Platform;
};

export async function sendDeleteConfirmationEmail({
	to,
	confirmUrl,
	platform
}: SendDeleteEmailInput) {
	const apiKey = getResendApiKey(platform);
	if (!apiKey) {
		throw new Error('RESEND_API_KEY is not configured');
	}

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from: `SpendWise <noreply@${new URL(site.url).hostname}>`,
			to: [to],
			subject: 'Confirm SpendWise account deletion',
			html: `
				<p>We received a request to permanently delete your SpendWise cloud account.</p>
				<p>If you made this request, confirm deletion using the link below. This link expires in 1 hour and can only be used once.</p>
				<p><a href="${confirmUrl}">Confirm account deletion</a></p>
				<p>If you did not request this, you can ignore this email. Your account will not be changed.</p>
				<p>Questions? Contact <a href="mailto:${site.emails.support}">${site.emails.support}</a>.</p>
			`.trim()
		})
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Resend API error (${response.status}): ${body}`);
	}
}
