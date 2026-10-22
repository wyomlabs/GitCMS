/**
 * Use-case pages (/for-*): one page per audience, each written around that
 * audience's own problem. Every page uses the same template
 * (components/use-case/UseCasePage.astro); only this copy changes. Mark
 * features that haven't shipped with `soon` so the page never overclaims.
 */
import type { DemoName } from '@/components/mock/DemoWindow.astro'
import type { PlanKey } from '@/lib/pricing-plans'
import type { PromptCategory } from '@/components/resources/resource-mdx-components'
import type { TestimonialPersona } from '@/lib/testimonials'

export type UseCaseSlug = 'agencies' | 'freelancers' | 'startups' | 'solo-builders'

type Point = { title: string; body: string }

export type UseCase = {
  slug: UseCaseSlug
  path: `/for-${UseCaseSlug}`
  name: string
  /** One line for menus and the /for picker. */
  blurb: string
  seoTitle: string
  seoDescription: string
  title: string
  description: string
  /** Product demo under the hero, and the one beside the workflow steps. */
  heroDemo: DemoName
  painsTitle: string
  pains: ReadonlyArray<Point>
  workflowTitle: string
  workflowDescription: string
  steps: ReadonlyArray<Point & { soon?: boolean }>
  workflowDemo: DemoName
  featuresTitle: string
  features: ReadonlyArray<Point & { soon?: boolean }>
  promptCategory: PromptCategory
  promptsTitle: string
  testimonial?: TestimonialPersona
  /** Starting point for the cost comparator sliders. */
  cost: { sites: number; editors: number }
  plan: PlanKey
  faqs: ReadonlyArray<{ question: string; answer: string }>
  related: ReadonlyArray<{ label: string; href: string }>
  ctaTitle: string
  ctaDescription: string
}

export const useCases: ReadonlyArray<UseCase> = [
  {
    slug: 'agencies',
    path: '/for-agencies',
    name: 'Agencies',
    blurb: 'Hand off client sites without becoming the bottleneck',
    seoTitle: 'GitCMS for Agencies — Hand Off Claude Code and Astro Sites With a Client CMS',
    seoDescription: 'Build client sites with Claude Code, Astro, or Next.js, then hand them off with GitCMS: a safe visual CMS for clients while your agency controls what ships.',
    title: 'Ship client sites with your agent. Hand them off without WordPress.',
    description: 'Claude Code made a custom client site an afternoon’s work. Then the client wants to change a sentence, and it lands back on your desk. GitCMS gives every client a safe admin for their own site, and gives you one place to see every site, review and agent.',
    heroDemo: 'fleet',
    painsTitle: 'Launch is cheap now. Everything after it eats your margin.',
    pains: [
      { title: 'You become the client’s content operator', body: 'Every typo, photo swap and blog post turns into a task for your team: too small to bill, too frequent to ignore.' },
      { title: 'WordPress was the old answer', body: 'It gave clients an admin panel, and gave you plugins, theme updates and security patches on a stack you stopped wanting to build on.' },
      { title: 'Twenty sites, no overview', body: 'Who can edit which site, what’s waiting for approval, what went live last week: it’s spread across email, Slack and twenty repositories.' },
    ],
    workflowTitle: 'The handoff, start to finish',
    workflowDescription: 'The site is built and deployed. Handing it over takes one prompt and one invite.',
    steps: [
      { title: 'Set up with one prompt', body: 'Your coding agent runs create-gitcms in the client’s repository. It finds the site, collections and media folder, and commits the setup.' },
      { title: 'Invite the client to their site', body: 'Editor or reviewer access to that one site. Clients sign in with Google; they don’t need a GitHub account.' },
      { title: 'They handle the routine', body: 'Copy, photos, prices and posts are edited visually. Every save is a commit to their repository.' },
      { title: 'Bigger asks arrive pinned', body: 'Clients pin feedback on the page. Your agent picks it up with a copied prompt, and GitCMS checks the fix on the preview deployment.' },
    ],
    workflowDemo: 'change-requests',
    featuresTitle: 'Built for a portfolio of client sites',
    features: [
      { title: 'Every client site, one workspace', body: 'See every site, review and agent at a glance. Use separate workspaces when a client needs full separation.' },
      { title: 'Access scoped per site', body: 'Each client sees only their own site. No shared developer accounts, no access to your other clients.' },
      { title: 'Review before publish', body: 'Turn it on per site when client or agent changes need your approval before they go live.' },
      { title: 'Change requests', body: 'Clients point at the exact heading, image or button they want changed instead of writing long emails.' },
      { title: 'Their agents, your rules', body: 'A client’s ChatGPT or Claude can draft through MCP. On sites with review before publish, its drafts wait for a person like everyone else’s.' },
      { title: 'Nothing to migrate when they leave', body: 'Content is plain files in their repository. Offboarding a client means removing access, not exporting a database.' },
    ],
    promptCategory: 'handoff',
    promptsTitle: 'Prompts for your next handoff',
    testimonial: 'agency',
    cost: { sites: 12, editors: 12 },
    plan: 'agency',
    faqs: [
      { question: 'Do clients need a GitHub account?', answer: 'No. Invited clients can sign in with Google and work entirely in the GitCMS interface. Only the people who connect repositories need GitHub.' },
      { question: 'Can clients break the site?', answer: 'Clients edit content fields and Markdown, not components or layout. With review before publish turned on, their changes wait for your approval before going live.' },
      { question: 'Does this work for sites built with Claude Code, Codex, or Cursor?', answer: 'Yes, as long as the site lives in a Git repository and loads its editable content from Markdown or MDX. Your coding agent can move hardcoded copy into collections and set up GitCMS for you.' },
      { question: 'Can we manage many client sites?', answer: 'Yes. One workspace can hold many sites, access is scoped per site, and you can use separate workspaces when clients need full separation.' },
    ],
    related: [
      { label: 'Roles and site access', href: '/docs/features/access-control' },
      { label: 'Editorial workflow', href: '/docs/features/editorial-workflow' },
      { label: 'GitCMS vs WordPress', href: '/compare/gitcms-vs-wordpress' },
    ],
    ctaTitle: 'Hand off your next client site with a CMS',
    ctaDescription: 'Connect a client repository, invite the client, and stop being the bottleneck for routine changes.',
  },
  {
    slug: 'freelancers',
    path: '/for-freelancers',
    name: 'Freelancers',
    blurb: 'Let clients edit, keep the code yours',
    seoTitle: 'GitCMS for Freelancers — Hand Off Custom Client Websites With a Simple CMS',
    seoDescription: 'Built a custom client site with code or AI coding agents? GitCMS gives clients a simple visual CMS so routine edits stop coming back to you.',
    title: 'Let clients edit the site you built, without calling you for every change',
    description: 'You built it fast with Astro or Next.js, maybe with Claude Code. Now the client needs to update prices, photos and posts. GitCMS gives them a simple admin on top of their repository, and you only hear from them when it’s real work.',
    heroDemo: 'editor',
    painsTitle: 'Small client edits cost more than they look',
    pains: [
      { title: 'Five-minute edits, all week', body: 'A new phone number on Tuesday, a photo swap on Friday. Each one is five minutes of work and an hour of lost focus.' },
      { title: 'Git isn’t a handover', body: 'Clients won’t learn branches and pull requests, and you don’t want them in your codebase anyway.' },
      { title: 'Builders cost you the code', body: 'Webflow or WordPress give clients an editor, but you give up the speed, the ownership and the stack you’d rather work in.' },
    ],
    workflowTitle: 'From launch to handoff in an evening',
    workflowDescription: 'No rebuild and no migration. GitCMS works on the repository you already shipped.',
    steps: [
      { title: 'Set up with one prompt', body: 'Paste the setup prompt into your coding agent. It runs create-gitcms, checks the content folders and commits the setup.' },
      { title: 'Invite your client', body: 'They sign in with Google and see only their site, in fields that match the pages they know.' },
      { title: 'They make the routine changes', body: 'Text, images and posts. Every save is a commit, so anything can be rolled back.' },
      { title: 'You approve what matters', body: 'Turn on review before publish and check their changes before they go live, or let them publish directly once you trust them.' },
    ],
    workflowDemo: 'review',
    featuresTitle: 'Everything a clean handoff needs',
    features: [
      { title: 'An editor that matches the site', body: 'Structured fields for prices, hours and photos, plus a visual editor for Markdown and MDX pages.' },
      { title: 'Review before publish', body: 'Approve client changes before they ship, per site, when you need to.' },
      { title: 'Change requests', body: 'Clients pin feedback to the page instead of sending screenshots with arrows.' },
      { title: 'History and undo', body: 'Every change is a Git commit with a name on it, so you can see who changed what and roll it back.' },
      { title: 'Their host keeps deploying', body: 'Netlify, Vercel or Cloudflare build the commits exactly as before. Nothing about hosting changes.' },
      { title: 'The content stays theirs', body: 'Plain files in their repository. If they stop using GitCMS, nothing needs exporting.' },
    ],
    promptCategory: 'handoff',
    promptsTitle: 'Prompts for handing a site over',
    testimonial: 'agency',
    cost: { sites: 4, editors: 4 },
    plan: 'agency',
    faqs: [
      { question: 'Do my clients need to learn Git?', answer: 'No. Clients edit visually and sign in with Google. Git stays underneath; they never see branches, commits or your codebase.' },
      { question: 'Will GitCMS change my site’s code?', answer: 'No. Setup adds a .gitcms configuration folder to the repository. Your components, build and hosting stay as they are.' },
      { question: 'What if a client makes a mistake?', answer: 'Every save is a commit, so any change can be rolled back. Turn on review before publish if you want to approve changes before they go live.' },
      { question: 'My client site was built with Claude Code. Will it work?', answer: 'Yes, if the site is in a Git repository and loads its editable content from Markdown or MDX. If copy is hardcoded in components, your agent can move it into collections first.' },
    ],
    related: [
      { label: 'Quick start', href: '/docs/getting-started/quick-start' },
      { label: 'Editorial workflow', href: '/docs/features/editorial-workflow' },
      { label: 'Make a site client-editable', href: '/prompts/make-site-client-editable' },
    ],
    ctaTitle: 'Hand off your next site without the follow-up emails',
    ctaDescription: 'Connect the client’s repository, invite them, and let routine edits stop coming back to you.',
  },
  {
    slug: 'startups',
    path: '/for-startups',
    name: 'Startups',
    blurb: 'Website changes without engineering tickets',
    seoTitle: 'GitCMS for Startups — Let Marketing Edit Your Code-First Website Without Engineering',
    seoDescription: 'Your website lives in a repo. GitCMS lets marketing, founders, and AI agents edit, review, and publish changes without engineering tickets or learning Git.',
    title: 'Your website is code. Changing it shouldn’t need an engineer.',
    description: 'Every pricing tweak, launch post and customer logo turns into a ticket, and AI agents can now rewrite twenty pages before anyone looks. GitCMS gives marketing a visual editor, and gives every change, from a person or an agent, a review before it ships.',
    heroDemo: 'review',
    painsTitle: 'The website became an engineering queue',
    pains: [
      { title: 'Engineers became the publishing layer', body: 'Marketing writes in a doc, files a ticket and waits for a deploy. Launches slip on copy changes.' },
      { title: 'AI made changes cheap, not safe', body: 'An agent can edit fifty files in a minute. Without a review step, nobody notices the wrong price until a customer does.' },
      { title: 'A builder means a second website', body: 'Moving marketing to Webflow splits the site in two: a different stack, different deploys, and a design that drifts.' },
    ],
    workflowTitle: 'How a launch post ships',
    workflowDescription: 'Marketing, founders and agents work in one flow. Engineering stays out of it unless the change is real code.',
    steps: [
      { title: 'Capture the request', body: 'Every request becomes a content task on the board: Ideas, Draft, Review, Published.' },
      { title: 'Draft visually or with an agent', body: 'Write in the editor, or let ChatGPT or Claude draft through MCP in the same content task.' },
      { title: 'Review on a real preview', body: 'GitCMS finds the preview deployment your host builds. Reviewers comment inline and approve.' },
      { title: 'Publish to the repo', body: 'The approved change is committed to your default branch, and your CI deploys it like any other push.' },
    ],
    workflowDemo: 'board',
    featuresTitle: 'One place for every website change',
    features: [
      { title: 'Roles and reviews', body: 'Editors draft, reviewers approve. Review before publish keeps unapproved changes off the live site.' },
      { title: 'Content board', body: 'See every request from idea to published, and who it’s waiting on.' },
      { title: 'Agents with the same rules', body: 'ChatGPT, Claude and personal agents draft through MCP into content tasks, not straight into production.' },
      { title: 'Preview deployments', body: 'Each draft opens on the preview your host already builds, so reviewers see the real page.' },
      { title: 'Fields that protect the design', body: 'Marketing edits content fields and Markdown, not components, so a copy change can’t break the layout.' },
      { title: 'History in Git', body: 'Every published change is a commit with an author, reviewable and revertible like the rest of your code.' },
    ],
    promptCategory: 'content',
    promptsTitle: 'Prompts for everyday website changes',
    testimonial: 'startup',
    cost: { sites: 1, editors: 6 },
    plan: 'team',
    faqs: [
      { question: 'Does marketing need to learn Git?', answer: 'No. They edit visually and move work through drafts, review and publishing. Git stays underneath.' },
      { question: 'Can AI agents publish to our live site?', answer: 'Not on sites that use review before publish. Agents can draft, edit and submit for review; publishing is a human action in GitCMS.' },
      { question: 'Do we have to change our build or hosting?', answer: 'No. GitCMS commits to your repository and your existing CI and hosting deploy those commits as usual. There is no content database or API to add.' },
      { question: 'What can marketing change without engineering?', answer: 'Anything that lives in content: pages, posts, docs, changelog entries, and site data like menus, footers and pricing tables. Components and layout stay with engineering.' },
    ],
    related: [
      { label: 'Editorial workflow', href: '/docs/features/editorial-workflow' },
      { label: 'AI agents', href: '/agents' },
      { label: 'Update a detail everywhere', href: '/prompts/update-copy-across-pages' },
    ],
    ctaTitle: 'Take the website out of the engineering queue',
    ctaDescription: 'Connect the repository behind your site and let marketing, founders and AI agents work through one reviewable flow.',
  },
  {
    slug: 'solo-builders',
    path: '/for-solo-builders',
    name: 'Solo builders',
    blurb: 'Publish the content that gets your product found',
    seoTitle: 'GitCMS for Solo Builders — Publish the Blog, Docs, and Changelog That Get Your Product Found',
    seoDescription: 'Built your product site with code or a coding agent? GitCMS helps solo builders keep the blog, docs, and changelog publishing, with your agent drafting and SEO checks before anything ships.',
    title: 'People find your product through what you publish. Keep publishing.',
    description: 'Search results and AI answers send people to your blog posts, docs and changelog, not your landing page. GitCMS puts writing, your agent and SEO checks in one place on top of your repository, so content stops being the thing you skip.',
    heroDemo: 'seo',
    painsTitle: 'When you’re the whole team, content is the first thing to slip',
    pains: [
      { title: 'The product always wins', body: 'You know posts and docs bring in signups. But when a release is due, the changelog entry and the how-to guide are what get skipped.' },
      { title: 'You can’t see what’s working', body: 'Search Console is a tab you never open. You don’t know which pages sit on page two, or which ones ChatGPT and Perplexity quote.' },
      { title: 'Agents write fast, but blind', body: 'Ask your coding agent for a post and it writes straight into the repo: no target query, no meta description, no internal links, and nobody checking before deploy.' },
    ],
    workflowTitle: 'From search data to a published post',
    workflowDescription: 'One loop you can run every week, in less time than it takes to open the codebase.',
    steps: [
      { title: 'Spot the opportunity', body: 'Search Console sits next to each page. A query stuck on page two becomes a content task in one click.', soon: true },
      { title: 'Draft with your agent', body: 'Claude or ChatGPT drafts through GitCMS, in your collections and your CONTENT.md voice, inside the content task. Not loose files in your repo.' },
      { title: 'Check it before it ships', body: 'A search preview and a checklist: title length, meta description, alt text, internal links, and an intro that answers the question directly, which is what answer engines quote.', soon: true },
      { title: 'Publish, and it’s a commit', body: 'Approve the change and GitCMS commits it. Your host deploys it like any other push.' },
    ],
    workflowDemo: 'search',
    featuresTitle: 'An SEO and AEO workflow, without the plugin',
    features: [
      { title: 'Search Console next to the page', body: 'Clicks, impressions and queries for the page you’re editing, and the keywords worth a new post.', soon: true },
      { title: 'Pre-publish SEO checks', body: 'A search preview and a checklist on every draft, before anything goes live.', soon: true },
      { title: 'Prompts for answer engines', body: 'Copy-paste prompts for direct-answer intros, meta descriptions and internal links, ready for your agent.' },
      { title: 'Blog, docs and changelog together', body: 'Each is a collection of Markdown or MDX files in your repo, all run from one workspace.' },
      { title: 'Your agent, with a review step', body: 'Agents draft through MCP into content tasks, and you read the change before it publishes.' },
      { title: 'No CMS to run', body: 'No database, no API and no migration. If you leave, your content is already plain files in your repo.' },
    ],
    promptCategory: 'seo',
    promptsTitle: 'SEO and AEO prompts for your agent',
    testimonial: 'solo',
    cost: { sites: 2, editors: 1 },
    plan: 'solo',
    faqs: [
      { question: 'Does GitCMS help with SEO and AEO?', answer: 'It gives you the workflow around them: your agent drafting in a content task, structured fields for titles and descriptions, and prompts for direct-answer intros, meta descriptions and internal links. Search Console data next to each page and pre-publish SEO checks are coming soon. It doesn’t promise rankings; it makes publishing good pages a habit.' },
      { question: 'Is GitCMS too much for a one-person project?', answer: 'No. It connects to the repository you already have and adds no database or infrastructure. If you only publish occasionally, use it just for the editor and ignore the rest.' },
      { question: 'Is this an AI writer?', answer: 'No. GitCMS is where people and agents edit, review and publish website changes. Your agent can draft inside it, but you decide the angle, the quality and what goes live.' },
      { question: 'Can I run blog, docs and changelog together?', answer: 'Yes. As long as each one is a collection of Markdown or MDX files in your repo, they all run from the same workspace.' },
      { question: 'Why not keep using Markdown files and my editor?', answer: 'You can, and many builders do. GitCMS helps when publishing keeps slipping, when you want an agent to draft without editing the repo directly, or when someone else needs to contribute without touching Git.' },
    ],
    related: [
      { label: 'Sitemaps and internal links', href: '/docs/features/sitemaps-internal-links' },
      { label: 'AI agents', href: '/agents' },
      { label: 'SEO, AEO and GEO glossary', href: '/glossary#seo' },
    ],
    ctaTitle: 'Keep your product site publishing while you keep building',
    ctaDescription: 'Connect the repository behind your site and run your blog, docs and changelog from one reviewable workflow.',
  },
]

export function getUseCase(slug: UseCaseSlug): UseCase {
  const useCase = useCases.find((candidate) => candidate.slug === slug)
  if (!useCase) throw new Error(`Unknown use case: ${slug}`)
  return useCase
}
