import type { APIRoute } from 'astro'
import { getPublicResourceByHtmlPath } from '@/lib/public-resources'
import { renderOgImage } from '@/lib/og-image'

export const GET: APIRoute = async () => {
  const resource = await getPublicResourceByHtmlPath('/')
  if (!resource) return new Response('Not found', { status: 404 })
  const png = await renderOgImage(resource)
  return new Response(Uint8Array.from(png).buffer, { headers: { 'Content-Type': 'image/png' } })
}
