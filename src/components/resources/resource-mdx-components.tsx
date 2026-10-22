import defaultMdxComponents from 'fumadocs-ui/mdx'
import { Callout } from 'fumadocs-ui/components/callout'
import { Step, Steps } from 'fumadocs-ui/components/steps'
import { AGENT_SETUP_PROMPT } from '@/lib/agent-setup-prompt'

/** Renders the setup prompt from the product's setup dialog, so the two never drift. */
function GitCMSSetupPrompt() {
  const DefaultPre = defaultMdxComponents.pre
  return (
    <DefaultPre>
      <code>{AGENT_SETUP_PROMPT}</code>
    </DefaultPre>
  )
}

/** MDX components for glossary and prompt library pages. */
export const resourceMdxComponents = {
  ...defaultMdxComponents,
  Callout,
  Steps,
  Step,
  GitCMSSetupPrompt,
}

// Display order and labels for glossary categories (see source.config.ts).
export const GLOSSARY_CATEGORY_LABELS = {
  building: 'Ways to build a website',
  rendering: 'Rendering and site types',
  content: 'Content and formats',
  git: 'Git and version control',
  cms: 'CMS types',
  agents: 'AI agents',
  seo: 'SEO, AEO, and GEO',
  deploy: 'Deploy and hosting',
  operations: 'Running a website (Day Two)',
} as const

export type GlossaryCategory = keyof typeof GLOSSARY_CATEGORY_LABELS

export const GLOSSARY_CATEGORY_ORDER: ReadonlyArray<GlossaryCategory> = [
  'building',
  'rendering',
  'content',
  'git',
  'cms',
  'agents',
  'seo',
  'deploy',
  'operations',
]

export const PROMPT_CATEGORY_LABELS = {
  handoff: 'Client handoff',
  content: 'Content operations',
  seo: 'SEO',
  migration: 'Migration',
} as const

export type PromptCategory = keyof typeof PROMPT_CATEGORY_LABELS
