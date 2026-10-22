import { AGENT_SETUP_PROMPT } from '@/lib/agent-setup-prompt'

/**
 * The copyable prompt in a prompt-library entry: its first ```text block, or
 * the product's setup prompt for entries that render <GitCMSSetupPrompt />.
 */
export function promptText(body: string | undefined) {
  if (!body) return null
  if (body.includes('<GitCMSSetupPrompt')) return AGENT_SETUP_PROMPT
  return /```text\n([\s\S]*?)\n```/.exec(body)?.[1]?.trim() ?? null
}
