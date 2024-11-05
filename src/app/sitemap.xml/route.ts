import { env } from '@env'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const pages = [
    { path: '/' },
    { path: '/features' },
    { path: '/pricing' },
    { path: '/themes' },
    { path: '/services' },
    { path: '/sign-in' },
    { path: '/sign-up' },
  ]
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          page => `
        <url>
          <loc>${env.PAYLOAD_URL}${page.path}</loc>
         
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `,
        )
        .join('')}
    </urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-store',
    },
  })
}
