import type { RequestHandler } from './$types';

const routes = ['/', '/spendwise', '/spendwise/privacy', '/spendwise/terms'];

export const prerender = true;

export const GET: RequestHandler = ({ url }) => {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map(
		(path) => `  <url>
    <loc>${url.origin}${path}</loc>
    <changefreq>${path === '/' ? 'weekly' : path === '/spendwise' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : path === '/spendwise' ? '0.9' : '0.5'}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
