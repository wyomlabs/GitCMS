import type { APIRoute } from 'astro'
import { aiCatalog } from '@/lib/agent-discovery'

export const GET: APIRoute = () => new Response(JSON.stringify(aiCatalog(), null, 2), {
  headers: { 'Content-Type': 'application/json' },
})
