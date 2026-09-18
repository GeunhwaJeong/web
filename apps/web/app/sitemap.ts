import type { MetadataRoute } from 'next';

const routes = [
  '/',
  '/about',
  '/about/vision',
  '/about/faqs',
  '/build',
  '/build/mini-apps',
  '/pay',
  '/resources',
  '/jobs',
  '/stats',
  '/third-party-cookies',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://haneulfoundation.org${route}`,
    lastModified: new Date(),
  }));
}
