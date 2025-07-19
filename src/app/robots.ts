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
          '/preparacion-test/',
          '/_next/static/',
          '/static/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/como-funciona/',
          '/blog/',
          '/faqs-preguntas-frecuentes/',
          '/test-ultraligero/',
          '/test-especificos/',
          '/test-categories/',
          '/pricing/',
          '/about/'
        ],
        disallow: [
          '/api/',
          '/test/',
          '/dashboard/',
          '/profile/',
          '/account/',
          '/instructor/',
          '/admin/',
          '/preparacion-test/',
        ],
      },
    ],
    sitemap: 'https://www.preparaulm.com/sitemap.xml',
  }
} 