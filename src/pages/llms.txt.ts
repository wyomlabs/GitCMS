import type { APIRoute } from 'astro'
import { renderLlmsTxt } from '@/lib/llms'
import { getPublicResources } from '@/lib/public-resources'

export const GET: APIRoute = async () =>
  new Response(renderLlmsTxt(await getPublicResources()), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
