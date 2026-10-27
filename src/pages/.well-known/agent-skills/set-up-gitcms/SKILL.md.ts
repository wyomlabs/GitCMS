import type { APIRoute } from 'astro'
import { setupSkillMarkdown } from '@/lib/agent-discovery'

export const GET: APIRoute = () => new Response(setupSkillMarkdown(), {
  headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
})
