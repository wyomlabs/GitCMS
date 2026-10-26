import type { APIRoute } from 'astro'
import { agentSkillsIndex } from '@/lib/agent-discovery'

export const GET: APIRoute = async () => new Response(JSON.stringify(await agentSkillsIndex(), null, 2), {
  headers: { 'Content-Type': 'application/json' },
})
