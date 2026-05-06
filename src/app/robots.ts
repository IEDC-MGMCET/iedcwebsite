import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/admin/dashboard/'],
      },
    ],
    sitemap: 'https://iedc.mgmcet.ac.in/sitemap.xml',
    host: 'https://iedc.mgmcet.ac.in',
  }
}