// Hosted AI site builders that keep a project in a GitHub repository.
// GitCMS edits the same repository, so the builder keeps building while
// clients edit copy in GitCMS. `autoSync` says whether the builder pulls
// outside commits back in by itself (Lovable, Bolt) or needs the repository
// pulled before the next build session (Emergent); page copy follows it.
// Sync claims follow each builder's own docs (see the AI site builders docs).
// Coding agents that build in the repository itself (Claude Code, Codex, Cursor)
// already have handoff pages under /agents and join the directory below.
import { getAgent } from '@/lib/agent-data'

export type SiteBuilderFaq = {
  question: string
  answer: string
}

export type SiteBuilder = {
  slug: string
  name: string
  logo: string
  /** What the builder usually generates, in one clause. */
  stack: string
  /** How the project gets a GitHub repository. */
  connect: string
  /** Whether the builder pulls commits made outside it back in by itself. */
  autoSync: boolean
  /** How commits made outside the builder come back in, per its docs. */
  syncBack: string
  faqs: Array<SiteBuilderFaq>
}

export const siteBuilders: Array<SiteBuilder> = [
  {
    slug: 'lovable',
    name: 'Lovable',
    logo: '/ai-logos/lovable.svg',
    stack: 'React apps built with Vite, Tailwind and shadcn/ui',
    connect: 'Connect GitHub in Lovable and it creates a repository for the project.',
    autoSync: true,
    syncBack: 'Lovable syncs its active branch both ways, so commits pushed to it, including GitCMS publishes, appear in Lovable.',
    faqs: [
      {
        question: 'Do GitCMS edits show up in Lovable?',
        answer: 'Yes. Lovable syncs your project’s active branch with GitHub in both directions. When a change is published in GitCMS, it’s a commit on that branch, and Lovable pulls it in, so your next prompt builds on the client’s latest copy.',
      },
      {
        question: 'Does my client need a Lovable account?',
        answer: 'No. You invite them to the site in GitCMS, where they sign in with Google and edit fields that match the site. They never see Lovable, the prompt box or the code.',
      },
      {
        question: 'Do copy edits in GitCMS use Lovable credits?',
        answer: 'No. Editing in GitCMS changes the content files directly, without asking Lovable’s AI. Save your credits for building.',
      },
      {
        question: 'Can I keep building in Lovable?',
        answer: 'Yes. Keep using Lovable for layout, design and new pages. Copy lives in content files, so Lovable’s AI reads and edits the same files when you ask it to.',
      },
      {
        question: 'Do I need Supabase for a blog?',
        answer: 'No. Each post is a Markdown file in the repository, bundled with the site when it builds. No database, no tables, nothing to keep in sync.',
      },
      {
        question: 'What happens to changes waiting for review?',
        answer: 'With review before publish, a draft lives on its own branch until someone approves it. Lovable only syncs its active branch, so drafts stay out of Lovable until they’re published.',
      },
    ],
  },
  {
    slug: 'bolt',
    name: 'Bolt',
    logo: '/ai-logos/bolt.svg',
    stack: 'React apps on Vite by default, and Astro or Next.js when you ask',
    connect: 'Connect GitHub in Bolt to link the project to a new private repository, or import one you already have.',
    autoSync: true,
    syncBack: 'Bolt checks GitHub for changes made outside Bolt every 30 seconds and pulls them in.',
    faqs: [
      {
        question: 'Do GitCMS edits show up in Bolt?',
        answer: 'Yes. Bolt checks the linked GitHub repository for changes made outside Bolt every 30 seconds and pulls them in. A change published in GitCMS is a commit to that repository, so it lands in your Bolt project.',
      },
      {
        question: 'Does my client need a Bolt account?',
        answer: 'No. You invite them to the site in GitCMS, where they sign in with Google and edit fields that match the site. They never see Bolt or the code.',
      },
      {
        question: 'Do copy edits in GitCMS use Bolt tokens?',
        answer: 'No. Editing in GitCMS changes the content files directly, without asking Bolt’s AI. Save your tokens for building.',
      },
      {
        question: 'My Bolt project uses Astro or Next.js. Does this still work?',
        answer: 'Yes. The prompt covers both: Astro sites use content collections, and Next.js sites read the files in server components. GitCMS edits Markdown, MDX, JSON and YAML whichever framework builds the site.',
      },
      {
        question: 'Can I keep building in Bolt?',
        answer: 'Yes. Keep using Bolt for layout, design and new pages. Copy lives in content files, so Bolt’s AI reads and edits the same files when you ask it to.',
      },
      {
        question: 'What happens to changes waiting for review?',
        answer: 'With review before publish, a draft lives on its own branch and becomes a commit on your main branch only when it’s approved and published. That’s when Bolt picks it up.',
      },
    ],
  },
  {
    slug: 'emergent',
    name: 'Emergent',
    logo: '/ai-logos/emergent.png',
    stack: 'full-stack web apps from a prompt',
    connect: 'Connect GitHub in Emergent and use Save to GitHub to put the project in a new or existing repository.',
    autoSync: false,
    syncBack: 'Emergent doesn’t watch GitHub for new commits, so pull the repository into your Emergent workspace before you build again.',
    faqs: [
      {
        question: 'Do GitCMS edits show up in Emergent?',
        answer: 'Not by themselves. Emergent saves your project to GitHub and can pull a repository into a workspace, but it doesn’t watch GitHub for new commits. Before you build again in Emergent, pull the repository in, so you start from your client’s latest copy.',
      },
      {
        question: 'Does my client need an Emergent account?',
        answer: 'No. You invite them to the site in GitCMS, where they sign in with Google and edit fields that match the site. They never see Emergent or the code.',
      },
      {
        question: 'Do copy edits in GitCMS use Emergent credits?',
        answer: 'No. Editing in GitCMS changes the content files directly, without asking Emergent’s agent. Save your credits for building.',
      },
      {
        question: 'Can I keep building in Emergent?',
        answer: 'Yes. Pull the repository into your Emergent workspace first, then build as usual and save to GitHub. Copy lives in content files, so Emergent’s agent reads and edits the same files when you ask it to.',
      },
      {
        question: 'What happens to changes waiting for review?',
        answer: 'With review before publish, a draft lives on its own branch and becomes a commit on your main branch only when it’s approved and published. Pull after that and Emergent has it.',
      },
    ],
  },
]

/** Where each builder's edits end up, in one sentence for page copy. */
export function getSiteBuilderSyncLine(builder: SiteBuilder) {
  return builder.autoSync
    ? `Their edits sync back into ${builder.name}.`
    : `Pull the repository into ${builder.name} before you build again, and you build on their latest edits.`
}

/**
 * Every tool someone might have built their site with: the builder pages here
 * plus the coding agents whose /agents pages cover the same handoff.
 */
export function getBuilderDirectoryLinks(): Array<{ label: string; href: string; logo: string }> {
  const agents = ['claude-code', 'codex', 'cursor'].flatMap((slug) => {
    const agent = getAgent(slug)
    return agent ? [{ label: agent.name, href: `/agents/${agent.slug}/`, logo: agent.logoPath }] : []
  })
  return [
    ...siteBuilders.map((builder) => ({ label: builder.name, href: `/cms-for-${builder.slug}/`, logo: builder.logo })),
    ...agents,
  ]
}

export function getSiteBuilderTitle(builder: SiteBuilder) {
  return `A CMS for ${builder.name} Sites: Let Clients Edit Without ${builder.name}`
}

export function getSiteBuilderDescription(builder: SiteBuilder) {
  return `Built your site with ${builder.name}? One prompt moves its copy into files, and GitCMS gives clients a visual editor for them. ${builder.autoSync ? `Edits sync back into ${builder.name}.` : `You pull their edits into ${builder.name}.`}`
}
