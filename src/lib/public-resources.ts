import { getCollection } from 'astro:content'
import { agentList, getAgentLandingDescription, getAgentLandingTitle } from '@/lib/agent-data'
import { frameworkList, getFrameworkFaqs, getFrameworkLandingDescription, getFrameworkLandingTitle } from '@/lib/framework-data'
import { features } from '@/lib/features'
import { getSiteBuilderDescription, getSiteBuilderTitle, siteBuilders } from '@/lib/site-builders'
import { getUseCase, useCases } from '@/lib/use-cases'
import {
  DEFAULT_SEO_DESCRIPTION,
  DEFAULT_SEO_TITLE,
  PRODUCT_DEFINITION,
  SITE_URL,
} from '@/lib/positioning'

export type PublicResourceKind =
  | 'product'
  | 'blog'
  | 'changelog'
  | 'comparison'
  | 'alternative'
  | 'docs'
  | 'glossary'
  | 'prompt'
  | 'tool'
  | 'agent'
  | 'feature'
  | 'persona'
  | 'framework'
  | 'builder'
  | 'page'
  | 'index'

/** The product scene on a page's OG image; pages without one get a default for their kind. */
export type OgOrbitOut = {
  label: string
  logo?: string
}

export type OgScene =
  | { type: 'text' }
  | { type: 'orbit'; out: ReadonlyArray<OgOrbitOut> }
  | { type: 'fleet' }
  | { type: 'handoff' }
  | { type: 'seo' }
  | { type: 'startup-review' }
  | { type: 'editor' }
  | { type: 'board' }
  | { type: 'change-requests' }
  | { type: 'agent'; logo: string; name: string }
  | { type: 'files'; logo: string; name: string; files: 'data' | 'markdown' }
  | { type: 'versus'; competitor: string; logo?: string }
  | { type: 'tool'; filename: string; badge: string }
  | { type: 'extension' }
  | { type: 'audiences' }

export type OgCopy = {
  eyebrow?: string
  title?: string
  titleLines?: readonly [string, string]
  subtitle?: string
}

export type PublicResource = {
  id: string
  kind: PublicResourceKind
  title: string
  description: string
  htmlPath: string
  markdownPath: string
  ogPath: string
  body: string
  listed?: boolean
  noIndex?: boolean
  updatedAt?: string
  og?: OgScene
  ogCopy?: OgCopy
}

const COMPETITOR_LOGOS: Record<string, string> = {
  WordPress: '/logos/wordpress.svg',
  Webflow: '/logos/webflow.svg',
  Framer: '/logos/framer.svg',
  Sanity: '/logos/sanity.svg',
  TinaCMS: '/logos/tina.svg',
}

const DEFAULT_ORBIT_OUT: ReadonlyArray<OgOrbitOut> = [
  { label: 'WordPress', logo: '/logos/wordpress.svg' },
  { label: 'Webflow', logo: '/logos/webflow.svg' },
  { label: 'Framer', logo: '/logos/framer.svg' },
]

const TOOL_OG_META: Record<string, { filename: string; badge: string }> = {
  'markdown-editor': { filename: 'src/content/blog/post.md', badge: 'Free · No sign-up' },
  'agents-md-editor': { filename: 'AGENTS.md', badge: 'Free · Coding agents' },
  'claude-md-editor': { filename: 'CLAUDE.md', badge: 'Free · Claude Code' },
  'github-markdown-editor': { filename: 'github.com/owner/repo', badge: 'Free · Public repos' },
  'readme-editor': { filename: 'README.md', badge: 'Free · Visual editor' },
  'image-compressor': { filename: 'hero-banner.png → .webp', badge: 'Free · Runs locally' },
}

const PERSONA_OG: Record<string, { og: OgScene; ogCopy: OgCopy }> = {
  agencies: {
    og: { type: 'fleet' },
    ogCopy: {
      eyebrow: 'GitCMS for agencies',
      title: 'Ship client sites in Astro. Hand them off without WordPress.',
      subtitle: 'Every client site, review, and agent in one workspace.',
    },
  },
  freelancers: {
    og: { type: 'handoff' },
    ogCopy: {
      eyebrow: 'GitCMS for freelancers',
      title: 'Let clients edit the site you built.',
      subtitle: 'Hand off Astro and Next.js sites with a visual editor and full Git history.',
    },
  },
  'solo-builders': {
    og: { type: 'seo' },
    ogCopy: {
      eyebrow: 'GitCMS for solo builders',
      title: 'Keep your blog, docs, and changelog shipping.',
      subtitle: 'Search Console opportunities, agent drafts, and SEO checks in one place.',
    },
  },
  startups: {
    og: { type: 'startup-review' },
    ogCopy: {
      eyebrow: 'GitCMS for startups',
      title: 'Your site is code. Editing it shouldn’t need an engineer.',
      subtitle: 'Marketing and AI agents draft visually; every change goes through review.',
    },
  },
}

const FEATURE_OG: Record<string, { og: OgScene; ogCopy: OgCopy }> = {
  'visual-editor': {
    og: { type: 'editor' },
    ogCopy: {
      eyebrow: 'Feature · Visual editor',
      title: 'Visual editor for the files your site is made of.',
      subtitle: 'Edit Markdown, MDX, frontmatter, and JSON or YAML data files straight in Git.',
    },
  },
  'editorial-workflow': {
    og: { type: 'board' },
    ogCopy: {
      eyebrow: 'Feature · Editorial workflow',
      title: 'Ideas to published, with review in between.',
      subtitle: 'Inline comments, approvals, and publish permissions without touching branches.',
    },
  },
  'change-requests': {
    og: { type: 'change-requests' },
    ogCopy: {
      eyebrow: 'Feature · Change requests',
      title: 'Feedback pinned to the page, checked on previews.',
      subtitle: 'Clients click what to fix. Your coding agent gets one prompt.',
    },
  },
}

export function normalizeHtmlPath(path: string) {
  if (!path || path === '/') return '/'
  return `/${path.replace(/^\/+|\/+$/g, '')}`
}

/** The address a page is served at: `/docs/quick-start/` (`trailingSlash: 'always'`). */
export function pageUrlPath(path: string) {
  const normalized = normalizeHtmlPath(path)
  return normalized === '/' ? '/' : `${normalized}/`
}

export function markdownPathForHtmlPath(path: string) {
  const normalized = normalizeHtmlPath(path)
  return normalized === '/' ? '/index.md' : `${normalized}.md`
}

export function ogPathForHtmlPath(path: string) {
  const normalized = normalizeHtmlPath(path)
  return normalized === '/' ? '/og.png' : `${normalized}/og.png`
}

function resource(input: Omit<PublicResource, 'markdownPath' | 'ogPath'>): PublicResource {
  const htmlPath = normalizeHtmlPath(input.htmlPath)
  return {
    ...input,
    htmlPath,
    markdownPath: markdownPathForHtmlPath(htmlPath),
    ogPath: ogPathForHtmlPath(htmlPath),
  }
}

function slugFromId(id: string) {
  return id.replace(/\.mdx?$/, '').replace(/\/index$/, '')
}

function listBody(title: string, description: string, items: ReadonlyArray<PublicResource>) {
  return [
    description,
    '',
    `## ${title}`,
    '',
    ...items.map((item) => `- [${item.title}](${item.markdownPath})${item.description ? ` — ${item.description}` : ''}`),
  ].join('\n')
}

function agentBody(agent: (typeof agentList)[number]) {
  return [
    agent.description,
    '',
    `## What is ${agent.name}?`,
    '',
    agent.whatIs,
    '',
    '## Why connect it to GitCMS?',
    '',
    agent.whyGitcms,
    ...(agent.compatibilityNote ? ['', '## Compatibility note', '', agent.compatibilityNote] : []),
    '',
    '## Setup',
    '',
    ...agent.setupSteps.flatMap((step, index) => [
      `### ${index + 1}. ${step.title}`,
      '',
      step.body,
      ...(step.code ? ['', '```text', step.code, '```'] : []),
      ...(step.showConnector ? ['', 'Connector: https://mcp.gitcms.dev'] : []),
      '',
    ]),
    '## Example prompts',
    '',
    ...agent.prompts.flatMap((prompt) => [
      `### ${prompt.title}`,
      '',
      '```text',
      prompt.prompt,
      '```',
      '',
    ]),
    '## FAQ',
    '',
    ...agent.faqs.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
  ].join('\n')
}

function useCaseBody(useCase: (typeof useCases)[number]) {
  const soon = (item: { soon?: boolean }) => (item.soon ? ' (coming soon)' : '')
  return [
    useCase.description,
    '',
    `## ${useCase.painsTitle}`,
    '',
    ...useCase.pains.flatMap((point) => [`### ${point.title}`, '', point.body, '']),
    `## ${useCase.workflowTitle}`,
    '',
    useCase.workflowDescription,
    '',
    ...useCase.steps.flatMap((step, index) => [`### ${index + 1}. ${step.title}${soon(step)}`, '', step.body, '']),
    `## ${useCase.featuresTitle}`,
    '',
    ...useCase.features.map((feature) => `- **${feature.title}${soon(feature)}:** ${feature.body}`),
    '',
    '## FAQ',
    '',
    ...useCase.faqs.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
    '## Related',
    '',
    ...useCase.related.map((link) => `- [${link.label}](${link.href})`),
  ].join('\n')
}

function featureBody(feature: (typeof features)[number]) {
  return [
    feature.description,
    '',
    `## ${feature.problemTitle}`,
    '',
    ...feature.problem.flatMap((paragraph) => [paragraph, '']),
    `## ${feature.stepsTitle}`,
    '',
    ...feature.steps.flatMap((step, index) => [`### ${index + 1}. ${step.title}`, '', step.body, ...(step.inRepo ? ['', `In the repository: \`${step.inRepo}\``] : []), '']),
    ...(feature.showcase ? [`## ${feature.showcase.title}`, '', feature.showcase.description, ''] : []),
    '## Who it’s for',
    '',
    ...feature.audiences.map((audience) => `- **[${getUseCase(audience.useCase).name}](${getUseCase(audience.useCase).path}):** ${audience.body}`),
    '',
    `## ${feature.underTheHood.title}`,
    '',
    feature.underTheHood.intro,
    '',
    '| In GitCMS | In your repository |',
    '| --- | --- |',
    ...feature.underTheHood.rows.map((row) => `| ${row.action} | ${row.repo} |`),
    '',
    `## ${feature.detailsTitle}`,
    '',
    ...feature.details.map((detail) => `- **${detail.title}${detail.soon ? ' (coming soon)' : ''}:** ${detail.body}`),
    '',
    '## FAQ',
    '',
    ...feature.faqs.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
    '## Related',
    '',
    ...feature.related.map((link) => `- [${link.label}](${link.href})`),
  ].join('\n')
}

function frameworkBody(framework: (typeof frameworkList)[number]) {
  const faqs = getFrameworkFaqs(framework)
  return [
    getFrameworkLandingDescription(framework),
    '',
    '## Day One: building the site',
    '',
    framework.dayOne,
    '',
    '## Day Two: handing it off',
    '',
    framework.handoff,
    '',
    `- Content path: \`${framework.contentPath}\``,
    `- Example entry: \`${framework.exampleFile}\``,
    `- Framework config: \`${framework.configFile}\``,
    '',
    `> **Handoff tip:** ${framework.handoffTip}`,
    '',
    '## FAQ',
    '',
    ...faqs.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
  ].join('\n')
}

function builderBody(builder: (typeof siteBuilders)[number]) {
  return [
    getSiteBuilderDescription(builder),
    '',
    '## How it works',
    '',
    `1. Paste the prompt from /prompts/make-ai-built-site-editable into ${builder.name}. It moves copy out of components into content/pages/*.md (frontmatter fields), content/blog/*.md and data/site.json, without changing the design.`,
    `2. ${builder.connect} In GitCMS, Add site finds the pages, posts and site data.`,
    `3. Clients edit in GitCMS; every save is a commit. ${builder.syncBack}`,
    '',
    `${builder.name} usually builds ${builder.stack}.`,
    '',
    '## FAQ',
    '',
    ...builder.faqs.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
    'Setup guide: /docs/getting-started/ai-site-builders',
  ].join('\n')
}

export async function getPublicResources(): Promise<Array<PublicResource>> {
  const [blog, changelog, comparisons, alternatives, docs, glossary, prompts, tools, pages] = await Promise.all([
    getCollection('blog'),
    getCollection('changelog'),
    getCollection('comparisons'),
    getCollection('alternatives'),
    getCollection('docs'),
    getCollection('glossary'),
    getCollection('prompts'),
    getCollection('tools'),
    getCollection('pages'),
  ])
  const now = new Date()
  const resources: Array<PublicResource> = []

  resources.push(resource({
    id: 'home',
    kind: 'product',
    title: DEFAULT_SEO_TITLE,
    description: DEFAULT_SEO_DESCRIPTION,
    htmlPath: '/',
    og: { type: 'orbit', out: DEFAULT_ORBIT_OUT },
    ogCopy: {
      eyebrow: 'For agencies, freelancers & SEO teams',
      titleLines: ['Move clients to Astro.', 'Keep the CMS.'],
      subtitle: 'Visual editor, Search Console SEO, and agent drafts on top of your Git repo.',
    },
    body: [
      PRODUCT_DEFINITION,
      '',
      '## What GitCMS does',
      '',
      '- People edit website content visually without learning Git.',
      '- AI agents propose changes through the same structured content workflow.',
      '- Review before publish keeps unapproved changes off live sites when that publishing mode is enabled.',
      '- Every published change stays in the site repository as plain files and Git history.',
      '',
      '## Start',
      '',
      `Open GitCMS: https://app.gitcms.dev/`,
    ].join('\n'),
  }))

  const publishedBlog = blog
    .filter((entry) => !entry.data.draft && new Date(entry.data.date) <= now)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
  for (const entry of publishedBlog) {
    const slug = slugFromId(entry.id)
    resources.push(resource({
      id: `blog:${slug}`,
      kind: 'blog',
      title: entry.data.title,
      description: entry.data.description,
      htmlPath: `/blog/${slug}`,
      body: entry.body ?? '',
      updatedAt: entry.data.updatedDate ?? entry.data.date,
    }))
  }

  const sortedChangelog = changelog.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
  for (const entry of sortedChangelog) {
    const slug = entry.filePath?.split('/').at(-1)?.replace(/\.mdx?$/, '') ?? slugFromId(entry.id)
    resources.push(resource({
      id: `changelog:${slug}`,
      kind: 'changelog',
      title: entry.data.title,
      description: entry.data.description ?? `GitCMS ${entry.data.version} release notes.`,
      htmlPath: `/changelog/${slug}`,
      body: entry.body ?? '',
      updatedAt: entry.data.date,
    }))
  }

  const sortedComparisons = comparisons.sort((a, b) => {
    const order = (a.data.order ?? Number.MAX_SAFE_INTEGER) - (b.data.order ?? Number.MAX_SAFE_INTEGER)
    return order || a.data.competitor.localeCompare(b.data.competitor)
  })
  for (const entry of sortedComparisons) {
    const slug = slugFromId(entry.id)
    resources.push(resource({
      id: `comparison:${slug}`,
      kind: 'comparison',
      title: entry.data.title,
      description: entry.data.description,
      htmlPath: `/compare/${slug}`,
      body: entry.body ?? '',
      og: { type: 'versus', competitor: entry.data.competitor, logo: COMPETITOR_LOGOS[entry.data.competitor] },
      ogCopy: {
        eyebrow: 'Honest comparison',
        title: `GitCMS vs ${entry.data.competitor}`,
        subtitle: entry.data.description,
      },
      updatedAt: entry.data.lastReviewed,
    }))
  }

  for (const entry of alternatives) {
    const slug = slugFromId(entry.id)
    const competitor = entry.data.competitor
    resources.push(resource({
      id: `alternative:${slug}`,
      kind: 'alternative',
      title: entry.data.title,
      description: entry.data.description,
      htmlPath: `/alternatives/${slug}`,
      body: entry.body ?? '',
      og: { type: 'orbit', out: [{ label: competitor, logo: COMPETITOR_LOGOS[competitor] }] },
      ogCopy: {
        eyebrow: `${competitor} alternatives`,
        subtitle: entry.data.cta ?? entry.data.description,
      },
      updatedAt: entry.data.lastReviewed,
    }))
  }

  for (const entry of docs) {
    const slug = slugFromId(entry.id)
    const isIndex = slug === 'index'
    resources.push(resource({
      id: `docs:${slug}`,
      kind: 'docs',
      title: entry.data.title,
      description: entry.data.description ?? 'GitCMS documentation.',
      htmlPath: isIndex ? '/docs' : `/docs/${slug}`,
      body: entry.body ?? '',
    }))
  }

  for (const entry of glossary.sort((a, b) => a.data.title.localeCompare(b.data.title))) {
    const slug = slugFromId(entry.id)
    resources.push(resource({
      id: `glossary:${slug}`,
      kind: 'glossary',
      title: entry.data.title,
      description: entry.data.description,
      htmlPath: `/glossary/${slug}`,
      body: [entry.data.definition, '', entry.body ?? ''].join('\n'),
      updatedAt: entry.data.lastReviewed,
    }))
  }

  for (const entry of prompts.sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999) || a.data.title.localeCompare(b.data.title))) {
    const slug = slugFromId(entry.id)
    resources.push(resource({
      id: `prompt:${slug}`,
      kind: 'prompt',
      title: entry.data.title,
      description: entry.data.description,
      htmlPath: `/prompts/${slug}`,
      body: entry.body ?? '',
      updatedAt: entry.data.lastReviewed,
    }))
  }

  for (const entry of tools.sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999) || a.data.title.localeCompare(b.data.title))) {
    const slug = slugFromId(entry.id)
    const toolMeta = TOOL_OG_META[slug] ?? { filename: 'content.md', badge: 'Free · No sign-up' }
    resources.push(resource({
      id: `tool:${slug}`,
      kind: 'tool',
      title: entry.data.title,
      description: entry.data.description,
      htmlPath: `/tools/${slug}`,
      body: entry.body ?? '',
      og: { type: 'tool', filename: toolMeta.filename, badge: toolMeta.badge },
      ogCopy: {
        eyebrow: 'Free browser tool',
        subtitle: entry.data.description,
      },
    }))
  }

  for (const entry of pages) {
    const slug = slugFromId(entry.id)
    resources.push(resource({
      id: `page:${slug}`,
      kind: 'page',
      title: entry.data.title,
      description: entry.data.description ?? `${entry.data.title} from GitCMS.`,
      htmlPath: `/${slug}`,
      body: entry.body ?? '',
      og: { type: 'text' },
      listed: slug === 'manifesto',
      noIndex: slug === 'privacy' || slug === 'terms',
    }))
  }

  for (const agent of agentList) {
    resources.push(resource({
      id: `agent:${agent.slug}`,
      kind: 'agent',
      title: getAgentLandingTitle(agent),
      description: getAgentLandingDescription(agent),
      htmlPath: `/agents/${agent.slug}`,
      body: agentBody(agent),
      og: { type: 'agent', logo: agent.logoPath, name: agent.name },
      ogCopy: {
        eyebrow: 'AI agents · MCP',
        subtitle: agent.description,
      },
    }))
  }

  for (const feature of features) {
    const featureOg = FEATURE_OG[feature.slug]
    resources.push(resource({
      id: `feature:${feature.slug}`,
      kind: 'feature',
      title: feature.seoTitle,
      description: feature.seoDescription,
      htmlPath: feature.path,
      body: featureBody(feature),
      og: featureOg?.og,
      ogCopy: featureOg?.ogCopy,
    }))
  }

  for (const useCase of useCases) {
    const personaOg = PERSONA_OG[useCase.slug]
    resources.push(resource({
      id: `persona:${useCase.slug}`,
      kind: 'persona',
      title: useCase.seoTitle,
      description: useCase.seoDescription,
      htmlPath: useCase.path,
      body: useCaseBody(useCase),
      og: personaOg?.og,
      ogCopy: personaOg?.ogCopy,
    }))
  }

  for (const framework of frameworkList) {
    resources.push(resource({
      id: `framework:${framework.slug}`,
      kind: 'framework',
      title: `${getFrameworkLandingTitle(framework)} — GitCMS`,
      description: getFrameworkLandingDescription(framework),
      htmlPath: `/git-based-cms-for-${framework.slug}`,
      body: frameworkBody(framework),
      og: { type: 'files', logo: framework.logo, name: framework.name, files: 'markdown' },
      ogCopy: {
        eyebrow: `${framework.name} CMS`,
        subtitle: `Visual editor, Search Console SEO, and agent drafts for ${framework.name} sites.`,
      },
    }))
  }

  for (const builder of siteBuilders) {
    resources.push(resource({
      id: `builder:${builder.slug}`,
      kind: 'builder',
      title: `${getSiteBuilderTitle(builder)} — GitCMS`,
      description: getSiteBuilderDescription(builder),
      htmlPath: `/cms-for-${builder.slug}`,
      body: builderBody(builder),
      og: { type: 'files', logo: builder.logo, name: builder.name, files: 'data' },
      ogCopy: {
        eyebrow: 'AI site builders',
        subtitle: `Make ${builder.name} sites editable for clients without touching code.`,
      },
    }))
  }

  resources.push(resource({
    id: 'extension',
    kind: 'page',
    title: 'GitCMS Browser Extension for Chrome and Firefox',
    description: 'Open GitHub repositories, Markdown files, and folders directly in GitCMS. A free browser companion for managing code-first websites.',
    htmlPath: '/extension',
    og: { type: 'extension' },
    ogCopy: {
      eyebrow: 'Browser extension',
      title: 'Open any GitHub repo in GitCMS in one click.',
      subtitle: 'Free companion for Chrome and Firefox. Type gitcms in the address bar.',
    },
    body: 'The GitCMS browser extension opens GitHub repositories, Markdown files, and folders in GitCMS from a right-click, the current GitHub location, or the address bar (type `gitcms`). It is a shortcut to the GitCMS web app, not an embedded editor. Install it from the Chrome Web Store or Firefox Add-ons. See /docs/features/chrome-extension.',
  }))

  const byKind = (kind: PublicResourceKind) => resources.filter((entry) => entry.kind === kind)
  const indexes: Array<PublicResource> = [
    resource({
      id: 'index:blog', kind: 'index', title: 'GitCMS Blog',
      description: 'Guides, workflows, and deep dives on content management for developers, marketers, and writers.',
      htmlPath: '/blog', body: listBody('Posts', 'GitCMS writing about code-first website operations and content workflows.', byKind('blog')),
    }),
    resource({
      id: 'index:changelog', kind: 'index', title: 'GitCMS Changelog', description: 'Release notes for GitCMS: new editor features, MCP tools for AI agents, publishing and review improvements, and fixes.',
      htmlPath: '/changelog', body: listBody('Releases', 'GitCMS product updates and release notes.', byKind('changelog')),
    }),
    resource({
      id: 'index:compare', kind: 'index', title: 'GitCMS Comparisons',
      description: 'Honest comparisons between GitCMS and website builders, headless CMSs, Git-based CMSs, and publishing platforms.',
      htmlPath: '/compare',
      og: { type: 'versus', competitor: 'Legacy CMSs', logo: '/logos/wordpress.svg' },
      ogCopy: {
        eyebrow: 'Comparisons',
        title: 'How GitCMS compares to other CMSs.',
        subtitle: 'Honest side-by-side tradeoffs against WordPress, Webflow, Sanity, and more.',
      },
      body: listBody('Comparisons', 'Every comparison says where the other tool is genuinely better.', byKind('comparison')),
    }),
    resource({
      id: 'index:alternatives', kind: 'index', title: 'Alternatives',
      description: 'Ranked alternatives to WordPress and popular CMSs for teams running code-first and AI-built websites, with stated criteria and tradeoffs.',
      htmlPath: '/alternatives',
      og: { type: 'orbit', out: DEFAULT_ORBIT_OUT },
      ogCopy: {
        eyebrow: 'CMS alternatives',
        title: 'Alternatives to WordPress, Webflow, and legacy CMSs.',
        subtitle: 'Ranked guides with stated criteria and honest tradeoffs for agencies and teams.',
      },
      body: listBody('Alternatives', 'Each guide ranks the alternatives on stated criteria, lists every option’s tradeoffs, GitCMS included, and says when to stay.', byKind('alternative')),
    }),
    resource({
      id: 'index:agents', kind: 'index', title: 'GitCMS for AI Agents',
      description: 'Connect ChatGPT, Claude, coding agents, and personal agents to website content through GitCMS.',
      htmlPath: '/agents',
      og: { type: 'agent', logo: '/ai-logos/claude-orange.svg', name: 'Claude & Codex' },
      ogCopy: {
        eyebrow: 'AI agents · MCP',
        title: 'Connect your AI agents to website content.',
        subtitle: 'Claude, ChatGPT, Codex, and Cursor draft through GitCMS while humans approve.',
      },
      body: listBody('Agents', 'Agents draft website changes through GitCMS while people keep control of publishing.', byKind('agent')),
    }),
    resource({
      id: 'index:for', kind: 'index', title: 'Who GitCMS Is For',
      description: 'GitCMS workflows for agencies, startups, freelancers, and solo builders running code-first websites.',
      htmlPath: '/for',
      og: { type: 'audiences' },
      ogCopy: {
        eyebrow: 'Who it’s for',
        title: 'Built for teams running code-first websites.',
        subtitle: 'Workflows for agencies, freelancers, SEO teams, startups, and solo builders.',
      },
      body: listBody('Use cases', 'Choose the setup that most closely matches how your website is run.', byKind('persona')),
    }),
    resource({
      id: 'index:glossary', kind: 'index', title: 'GitCMS Glossary',
      description: 'Plain-language definitions for code-first websites, Git, content operations, SEO, and AI agents.',
      htmlPath: '/glossary', body: listBody('Terms', 'The language of code-first websites and Day Two operations.', byKind('glossary')),
    }),
    resource({
      id: 'index:prompts', kind: 'index', title: 'GitCMS Prompt Library',
      description: 'Copy-paste prompts for building, handing off, and running code-first websites with AI agents.',
      htmlPath: '/prompts', body: listBody('Prompts', 'Prompts for coding agents and AI assistants across the website lifecycle.', byKind('prompt')),
    }),
    resource({
      id: 'index:tools', kind: 'index', title: 'GitCMS Free Tools',
      description: 'Free browser tools for Markdown, README, AGENTS.md, and CLAUDE.md files, public GitHub Markdown, and WebP image compression.',
      htmlPath: '/tools',
      og: { type: 'tool', filename: 'AGENTS.md · README.md · .webp', badge: '6 free browser tools' },
      ogCopy: {
        eyebrow: 'Free browser tools',
        title: 'Free tools for Markdown and coding-agent files.',
        subtitle: 'Edit AGENTS.md, CLAUDE.md, READMEs, and compress WebP images locally.',
      },
      body: listBody('Tools', 'Free tools that run in the browser. No sign-up.', byKind('tool')),
    }),
  ]

  return [...resources, ...indexes].sort((a, b) => a.htmlPath.localeCompare(b.htmlPath))
}

export async function getPublicResourceByHtmlPath(path: string) {
  const normalized = normalizeHtmlPath(path)
  return (await getPublicResources()).find((entry) => entry.htmlPath === normalized)
}

export function absolutePublicUrl(path: string) {
  return new URL(path, SITE_URL).toString()
}
