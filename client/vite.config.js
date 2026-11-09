import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { industries } from './src/data/content.js';

const STATIC_PATHS = [
  '/',
  '/about',
  '/contact',
  '/services',
  '/products',
  '/industries',
  '/company/process',
  '/company/careers',
  ...industries.map((industry) => `/industries/${industry.slug}`),
];

const priorityFor = (path) => {
  if (path === '/') return '1.0';
  return path.split('/').length > 2 ? '0.7' : '0.8';
};

/** Reads service/product pages from the API so they appear in the sitemap. */
async function fetchCatalogPaths(apiUrl, kind) {
  try {
    const response = await fetch(`${apiUrl}/${kind}`);
    const { items } = await response.json();
    return items.map((item) => `/${kind}/${item.slug}`);
  } catch (error) {
    console.warn(`[sitemap] Could not load ${kind} from the API (${error.message}). Skipping them.`);
    return [];
  }
}

/** Emits sitemap.xml and robots.txt at build time. */
function seoFiles({ siteUrl, apiUrl }) {
  return {
    name: 'seo-files',
    async generateBundle() {
      const [servicePaths, productPaths] = await Promise.all([
        fetchCatalogPaths(apiUrl, 'services'),
        fetchCatalogPaths(apiUrl, 'products'),
      ]);

      const paths = [...STATIC_PATHS, ...servicePaths, ...productPaths];
      const urls = paths
        .map((path) => `  <url><loc>${siteUrl}${path}</loc><priority>${priorityFor(path)}</priority></url>`)
        .join('\n');

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Set SITE_URL (e.g. https://yourdomain.com) so the sitemap uses your real domain.
  const siteUrl = (env.SITE_URL || 'https://www.example.com').replace(/\/$/, '');
  // Set VITE_API_URL at build time so the sitemap can list services and products.
  const apiUrl = (env.VITE_API_URL || '').replace(/\/$/, '');

  return {
    plugins: [react(), seoFiles({ siteUrl, apiUrl })],
    server: {
      // During development, "/api" requests go to the Express server.
      proxy: { '/api': 'http://localhost:5000' },
    },
  };
});
