import type { APIRoute } from 'astro'
import { renderScopedLlmsTxt } from '@/lib/llms'
import { getPublicResources } from '@/lib/public-resources'

export const GET: APIRoute = async () => {
  const docs = (await getPublicResources()).filter((resource) => resource.kind === 'docs')
  return new Response(renderScopedLlmsTxt(
    'GitCMS Documentation',
    'Setup, configuration, editorial workflow, media, access control, and AI/MCP documentation for GitCMS.',
    docs,
  ), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
