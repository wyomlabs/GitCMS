import { AGENT_SETUP_PROMPT, SETUP_CLI_COMMAND } from '@/lib/agent-setup-prompt'
import { MCP_CONNECTOR_URL } from '@/lib/mcp'
import { PRODUCT_NAME, SITE_URL } from '@/lib/positioning'

/**
 * Machine-readable discovery documents served under `/.well-known/`. They only
 * point at things that exist: the MCP server (which owns its Server Card), the
 * docs, and the setup skill built from the same prompt the site shows people.
 */

/** Served by the MCP Worker at the SEP-2127 reserved `<endpoint>/server-card`. */
export const MCP_SERVER_CARD_URL = `${MCP_CONNECTOR_URL}/server-card`
const MCP_DOCS_URL = `${SITE_URL}/docs/ai-mcp/ai-overview/`

export const API_CATALOG_PATH = '/.well-known/api-catalog'

/** RFC 9727 API catalog. GitCMS's public API for agents is its MCP server. */
export function apiCatalog() {
  return {
    linkset: [
      {
        anchor: `${SITE_URL}${API_CATALOG_PATH}`,
        item: [{ href: MCP_CONNECTOR_URL }],
      },
      {
        anchor: MCP_CONNECTOR_URL,
        'service-desc': [{ href: MCP_SERVER_CARD_URL, type: 'application/mcp-server-card+json' }],
        'service-doc': [{ href: MCP_DOCS_URL, type: 'text/html' }],
      },
    ],
  }
}

/** AI Catalog, the domain-level index SEP-2127 uses to find Server Cards. */
export function aiCatalog() {
  return {
    specVersion: '1.0',
    host: { displayName: PRODUCT_NAME, identifier: SITE_URL },
    entries: [
      {
        identifier: 'urn:air:gitcms.dev:mcp:gitcms',
        displayName: `${PRODUCT_NAME} MCP server`,
        type: 'application/mcp-server-card+json',
        url: MCP_SERVER_CARD_URL,
        representativeQueries: [
          'draft a blog post on my website',
          'update the pricing page copy and send it for review',
          'list the content collections on my site',
          'publish an approved content change',
        ],
      },
    ],
  }
}

export const SETUP_SKILL = {
  name: 'set-up-gitcms',
  description: 'Set up GitCMS on a website repository so people and AI agents can edit, review, and publish its content. Use when asked to add GitCMS or a Git-based CMS to a repository.',
  path: '/.well-known/agent-skills/set-up-gitcms/SKILL.md',
}

export function setupSkillMarkdown() {
  return [
    '---',
    `name: ${SETUP_SKILL.name}`,
    `description: ${SETUP_SKILL.description}`,
    '---',
    '',
    '# Set up GitCMS',
    '',
    AGENT_SETUP_PROMPT,
    '',
    `Run \`${SETUP_CLI_COMMAND} --help\` for flags. Docs: ${SITE_URL}/docs/getting-started/cli-onboarding/`,
    '',
    `To edit content afterwards, connect to the GitCMS MCP server at ${MCP_CONNECTOR_URL}. Docs: ${MCP_DOCS_URL}`,
    '',
  ].join('\n')
}

async function sha256Hex(text: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

/** Agent Skills Discovery index (v0.2.0). The digest covers the exact served SKILL.md. */
export async function agentSkillsIndex() {
  return {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: [
      {
        name: SETUP_SKILL.name,
        type: 'skill-md',
        description: SETUP_SKILL.description,
        url: `${SITE_URL}${SETUP_SKILL.path}`,
        digest: `sha256:${await sha256Hex(setupSkillMarkdown())}`,
      },
    ],
  }
}
