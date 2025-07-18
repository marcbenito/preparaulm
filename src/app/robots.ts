import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/test/',
          '/dashboard/',
          '/profile/',
          '/account/',
          '/instructor/',
          '/admin/',
          '/_next/static/',
          '/static/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/','/como-funciona/','/blog/', '/faqs-preguntas-frecuentes/'],
        disallow: [
          '/api/',
          '/test/',
          '/dashboard/',
          '/profile/',
          '/account/',
          '/instructor/',
          '/admin/',
        ],
      },
    ],
    sitemap: 'https://aerotestulm.es/sitemap.xml',
  }
} 