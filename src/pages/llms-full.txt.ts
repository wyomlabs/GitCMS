import type { APIRoute } from 'astro'
import { renderLlmsFull } from '@/lib/llms'
import { getPublicResources } from '@/lib/public-resources'

export const GET: APIRoute = async () =>
  new Response(renderLlmsFull(await getPublicResources()), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
