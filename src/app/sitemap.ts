import { MetadataRoute } from 'next';

const baseUrl = 'https://iris-energy.example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/solutions',
    '/products',
    '/projects',
    '/services',
    '/request-study',
  ];

  const langs = ['/en', '/ar'];
  
  const sitemapUrls = routes.flatMap((route) => 
    langs.map((lang) => ({
      url: `${baseUrl}${lang}${route}`,
      lastModified: new Date(),
    }))
  );

  return [
    { url: baseUrl, lastModified: new Date() },
    ...sitemapUrls
  ];
}
