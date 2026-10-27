import type { APIRoute } from 'astro'
import { apiCatalog } from '@/lib/agent-discovery'

// Served without an extension, so `public/_headers` sets its media type.
export const GET: APIRoute = () => new Response(JSON.stringify(apiCatalog(), null, 2))
