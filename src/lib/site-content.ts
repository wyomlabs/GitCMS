// Copy for the homepage and its demo mockups. B and C (pages/redesign/_b,
// _c) still read a few of these until they're deleted.
import { UPCOMING_PLANS } from '@/lib/pricing-plans'

export const CATEGORY = 'The control plane for code-first websites'

export const SUBHEAD =
  'Shipping a website with code is cheap now. Handing it over isn’t. GitCMS gives clients, teammates and AI agents one dashboard to edit, review and publish, while every change lands in your repository.'

export const PROOF_POINTS = [
  'No migration',
  'No content database',
  'Works with your framework and host',
  'Content stays yours if you leave',
] as const

export const DAY_TWO_REQUESTS = [
  { who: 'Marketing', avatar: 'M', tone: 'amber', ask: 'Update pricing for Q4' },
  { who: 'Client', avatar: 'C', tone: 'sky', ask: 'Swap the hero photo' },
  { who: 'Founder', avatar: 'F', tone: 'emerald', ask: 'Publish the case study' },
  { who: 'Claude', avatar: 'agent', tone: 'orange', ask: 'Refresh 20 location pages' },
] as const

export const PILLARS = [
  {
    title: 'People edit',
    body: 'Clients and marketers change pages, posts and images in a visual editor. No Git, no IDE, no “can you change this sentence?” tickets.',
  },
  {
    title: 'Agents propose',
    body: 'Claude, ChatGPT and Codex work through GitCMS over MCP, with the same collections, fields and rules your team uses.',
  },
  {
    title: 'Nothing ships unreviewed',
    body: 'Changes wait as drafts until someone approves them. Every publish is a real commit, so history and rollback come free.',
  },
] as const

export const WORDPRESS_SWAP = [
  { kept: 'An admin your client can use', left: 'A PHP runtime and a database to babysit' },
  { kept: 'Drafts, reviews and roles', left: 'Plugin updates and security patches' },
  { kept: 'Media library and SEO checks', left: 'Themes that fight your design system' },
  { kept: 'One place to publish', left: 'Content locked in somebody else’s tables' },
] as const

export const SEO_CHECKS = [
  { label: 'Title is 54 characters', state: 'pass' },
  { label: 'Meta description is 148 characters', state: 'pass' },
  { label: 'Focus keyword appears in the first heading', state: 'pass' },
  { label: '2 images are missing alt text', state: 'warn' },
  { label: '3 internal links to related pages', state: 'pass' },
] as const

export const SEARCH_QUERIES = [
  { query: 'emergency roof repair austin', clicks: 412, impressions: '8.1k', position: '3.2' },
  { query: 'roof leak repair near me', clicks: 188, impressions: '6.4k', position: '7.8' },
  { query: 'metal roof cost texas', clicks: 21, impressions: '5.9k', position: '11.4', opportunity: true },
  { query: 'hail damage roof inspection', clicks: 96, impressions: '2.2k', position: '5.1' },
] as const

export const FLEET = [
  { site: 'acme-roofing.com', status: 'Live', note: 'Client editing', tone: 'emerald' },
  { site: 'northstar.dental', status: 'Review', note: '2 changes waiting', tone: 'violet' },
  { site: 'paperco.studio', status: 'Live', note: 'Claude connected', tone: 'emerald' },
  { site: 'linearlabs.dev', status: 'Draft', note: 'Pricing page update', tone: 'sky' },
  { site: 'harborcafe.co', status: 'Live', note: 'Updated 2h ago', tone: 'emerald' },
] as const

export const AGENTS = [
  { name: 'Claude', logo: '/ai-logos/claude-orange.svg' },
  { name: 'ChatGPT', logo: '/ai-logos/openai-bw.svg' },
  { name: 'Codex', logo: '/brand-logos/openai.svg' },
  { name: 'Cursor', logo: '/ai-logos/cursor.svg' },
  { name: 'OpenCode', logo: '/ai-logos/opencode.svg' },
  { name: 'Gemini', logo: '/ai-logos/gemini.svg' },
] as const

export const FRAMEWORKS = [
  { name: 'Astro', logo: '/ssg-logos/astro.svg' },
  { name: 'Next.js', logo: '/ssg-logos/nextjs.svg' },
  { name: 'Nuxt', logo: '/ssg-logos/nuxtjs.svg' },
  { name: 'SvelteKit', logo: '/ssg-logos/svelte.svg' },
  { name: 'Hugo', logo: '/ssg-logos/hugo.svg' },
  { name: 'Eleventy', logo: '/ssg-logos/eleventy.svg' },
  { name: 'Docusaurus', logo: '/ssg-logos/docusaurus.svg' },
  { name: 'TanStack Start', logo: '/ssg-logos/tanstack-start.svg' },
] as const

type PlanCell = string | boolean

export const PRICING_PLANS = UPCOMING_PLANS

export const PRICING_ROWS: ReadonlyArray<{ label: string; cells: readonly [PlanCell, PlanCell, PlanCell, PlanCell] }> = [
  { label: 'Sites', cells: ['1 preview', 'Pay per site', 'Pay per site', '5 included'] },
  { label: 'People', cells: ['Unlimited, to explore', '1', 'Unlimited', 'Unlimited'] },
  { label: 'AI agents over MCP', cells: ['Explore', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { label: 'Visual editor and media', cells: [true, true, true, true] },
  { label: 'Save and publish', cells: [false, true, true, true] },
  { label: 'Content board and reviews', cells: ['Preview', 'Basic', true, true] },
  { label: 'SEO checks before publish', cells: ['Preview', true, true, true] },
  { label: 'Search Console insights', cells: [false, true, true, true] },
  { label: 'Roles and permissions', cells: ['Preview', false, true, true] },
  { label: 'Client sites in one workspace', cells: [false, false, false, true] },
  { label: 'Extra sites', cells: ['—', '+$15', '+$29', '+$10/site'] },
]

export const FAQS = [
  {
    question: 'Do I have to migrate my content?',
    answer: 'No. GitCMS reads the Markdown, MDX, JSON and YAML already in your repository. Connect the repo, pick the folders, and your existing pages show up as collections.',
  },
  {
    question: 'Does my client need a GitHub account?',
    answer: 'No. Invite them by email. They see pages, drafts and a Publish button, never branches or commits.',
  },
  {
    question: 'Which frameworks and hosts does it work with?',
    answer: 'Anything that builds from files in Git: Astro, Next.js, Nuxt, SvelteKit, Hugo, Eleventy and more, hosted on Vercel, Netlify, Cloudflare or your own server. GitCMS never sits between your visitors and your site.',
  },
  {
    question: 'What can AI agents do through GitCMS?',
    answer: 'Agents connected over MCP can search and read entries, draft changes, and open them for review, using your collections and fields. With review before publish, nothing goes live until a person approves it.',
  },
  {
    question: 'How is this different from WordPress?',
    answer: 'WordPress is your admin, your runtime and your database. GitCMS is only the admin: your site stays plain code and files you own, built and hosted however you like.',
  },
  {
    question: 'What happens if I stop using GitCMS?',
    answer: 'Your site keeps working. Content was always files in your repository, and every change is already in its Git history.',
  },
  {
    question: 'What happens to the founding license when monthly plans launch?',
    answer: 'It keeps working, and you never have to move to a monthly plan. A founding license is a single payment per site and includes every future update. It stops being sold when monthly plans launch, so the price is only available until then.',
  },
] as const
