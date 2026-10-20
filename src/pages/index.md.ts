import type { APIRoute } from 'astro'
import { markdownDocument } from '@/lib/machine-markdown'
import { getPublicResourceByHtmlPath } from '@/lib/public-resources'

export const GET: APIRoute = async () => {
  const resource = await getPublicResourceByHtmlPath('/')
  if (!resource) return new Response('Not found', { status: 404 })
  return new Response(markdownDocument({
    title: resource.title,
    description: resource.description,
    canonicalPath: resource.htmlPath,
    body: resource.body,
  }), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } })
}
