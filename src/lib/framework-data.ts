export type FrameworkInfo = {
  slug: string
  name: string
  logo: string
  accentColor: string
  editorHighlight: string
  contentPath: string
  exampleFile: string
  configFile: string
  // Framework-specific Day Two copy: how agents build these sites, what the
  // client edits after handoff, and one practical handoff tip.
  dayOne: string
  handoff: string
  handoffTip: string
  // Hand-written questions for frameworks that deserve more depth than the
  // shared template, e.g. the main frameworks agencies build client sites on.
  extraFaqs?: Array<FrameworkFaq>
}

export type FrameworkFaq = {
  question: string
  answer: string
}

export const frameworkList: Array<FrameworkInfo> = [
  {
    slug: 'astro',
    name: 'Astro',
    logo: '/ssg-logos/astro.svg',
    accentColor: '#FF5D01',
    editorHighlight: 'Astro content collections with visual field editing',
    contentPath: 'src/content/blog',
    exampleFile: 'src/content/blog/getting-started.mdx',
    configFile: 'astro.config.mjs',
    dayOne:
      'Coding agents reach for Astro for marketing sites: fast by default, Tailwind-friendly, and content collections built in.',
    handoff:
      'Page copy, posts, and case studies live in content collections under src/content, so clients edit Markdown and fields, never .astro components.',
    handoffTip:
      'Agents often hardcode copy in .astro components. Ask yours to move editable text into a pages collection before you hand the site off.',
    extraFaqs: [
      {
        question: 'Does GitCMS work with Astro content collections?',
        answer:
          'Yes. Each Astro content collection maps to a GitCMS collection. Match your field names to the schema in your content config (if Astro expects pubDate, use pubDate), and GitCMS edits the same Markdown or MDX files Astro builds from.',
      },
      {
        question: 'How do I let a client edit an Astro site?',
        answer:
          'Keep the copy your client should edit in content collections instead of hardcoding it in .astro components, connect the repository to GitCMS, and invite the client with access to that site only. They edit visually; every save is a commit Astro builds and deploys as usual.',
      },
      {
        question: 'Can I replace WordPress with Astro and GitCMS?',
        answer:
          'Yes. Many agencies now rebuild WordPress sites in Astro, often with Claude Code, for speed and lower hosting cost. GitCMS gives the client back what they had in WordPress: an admin where they can edit pages and publish posts, without plugins, themes, or a database.',
      },
    ],
  },
  {
    slug: 'nextjs',
    name: 'Next.js',
    logo: '/ssg-logos/nextjs.svg',
    accentColor: '#171717',
    editorHighlight: 'MDX and frontmatter editing for App Router and Pages Router',
    contentPath: 'content/blog',
    exampleFile: 'content/blog/getting-started.mdx',
    configFile: 'next.config.ts',
    dayOne:
      'Next.js is the default stack for product companies, and agents build App Router marketing pages and MDX blogs in hours.',
    handoff:
      'Keep editable content in a content/ directory outside app/, loaded with your MDX pipeline. Marketing edits those files, not React components.',
    handoffTip:
      'Keep routing in app/ and words in content/. That one boundary is what lets marketing work without touching the codebase.',
  },
  {
    slug: 'tanstack-start',
    name: 'TanStack Start',
    logo: '/ssg-logos/tanstack-start.png',
    accentColor: '#EF4444',
    editorHighlight: 'MDX and frontmatter editing with full-stack type safety',
    contentPath: 'src/content/blog',
    exampleFile: 'src/content/blog/getting-started.mdx',
    configFile: 'app.config.ts',
    dayOne:
      'TanStack Start gives agents type-safe routes and server functions, and Markdown or MDX content loads cleanly in route loaders.',
    handoff:
      'Posts, docs, and page copy live in a content/ directory your loaders read at build or request time.',
    handoffTip:
      'Load content in route loaders from one content/ folder per collection, so GitCMS and your agent agree on where content lives.',
  },
  {
    slug: 'hugo',
    name: 'Hugo',
    logo: '/ssg-logos/hugo.svg',
    accentColor: '#FF4088',
    editorHighlight: 'Hugo shortcodes and TOML/YAML frontmatter preserved',
    contentPath: 'content/posts',
    exampleFile: 'content/posts/getting-started.md',
    configFile: 'hugo.toml',
    dayOne:
      'Hugo builds thousands of pages in seconds, which makes it a favorite for docs, blogs, and large content sites agents generate.',
    handoff:
      'Content lives in content/ sections with YAML or TOML front matter. Clients edit entries; layouts and shortcode templates stay with developers.',
    handoffTip:
      'Set GitCMS’s front matter format to match your site (YAML or TOML) and keep shortcodes for developers; editors work on prose and fields.',
  },
  {
    slug: 'jekyll',
    name: 'Jekyll',
    logo: '/ssg-logos/jekyll.svg',
    accentColor: '#CC0000',
    editorHighlight: 'Jekyll front matter mapped to visual input fields',
    contentPath: '_posts',
    exampleFile: '_posts/2026-03-01-getting-started.md',
    configFile: '_config.yml',
    dayOne:
      'Jekyll still powers plenty of GitHub Pages sites, and agents are a fast way to modernize an old one.',
    handoff:
      'Posts live in _posts with date-prefixed filenames. GitCMS’s filename pattern builder keeps new posts in Jekyll’s format automatically.',
    handoffTip:
      'Use the filename pattern {date.isoDate}-{slug} so every post a client creates matches Jekyll’s naming convention.',
  },
  {
    slug: 'gatsby',
    name: 'Gatsby',
    logo: '/ssg-logos/gatsby.svg',
    accentColor: '#663399',
    editorHighlight: 'Structured frontmatter that feeds into Gatsby GraphQL layer',
    contentPath: 'content/blog',
    exampleFile: 'content/blog/getting-started.md',
    configFile: 'gatsby-config.ts',
    dayOne:
      'Many Gatsby sites are now maintained, extended, or migrated by coding agents rather than rebuilt from scratch.',
    handoff:
      'Markdown and MDX content in content/ is sourced through gatsby-source-filesystem. Clients edit those files; GraphQL queries stay in code.',
    handoffTip:
      'Keep your gatsby-source-filesystem paths stable; GitCMS collections map one-to-one to those content folders.',
  },
  {
    slug: 'eleventy',
    name: 'Eleventy',
    logo: '/ssg-logos/eleventy.svg',
    accentColor: '#111111',
    editorHighlight: 'Eleventy data cascade and template-agnostic editing',
    contentPath: 'src/posts',
    exampleFile: 'src/posts/getting-started.md',
    configFile: '.eleventy.js',
    dayOne:
      'Eleventy’s plain templates and Markdown make it easy for agents to generate and for humans to read.',
    handoff:
      'Markdown pages and posts live in your input directory. Clients edit content and front matter; templates and the data cascade stay with you.',
    handoffTip:
      'Put posts in their own folder with a directory data file, so front matter defaults stay consistent for every entry a client creates.',
  },
  {
    slug: 'nuxtjs',
    name: 'Nuxt.js',
    logo: '/ssg-logos/nuxtjs.svg',
    accentColor: '#00B870',
    editorHighlight: 'Works with Nuxt Content module and custom content paths',
    contentPath: 'content/blog',
    exampleFile: 'content/blog/getting-started.md',
    configFile: 'nuxt.config.ts',
    dayOne:
      'Vue teams and agents build Nuxt sites fast, and Nuxt Content turns a content/ folder into pages and queries.',
    handoff:
      'Nuxt Content reads Markdown from content/. Clients edit those files; Vue components and queries stay in code.',
    handoffTip:
      'Keep one Nuxt Content collection per content type, and match GitCMS fields to the front matter your queries use.',
  },
  {
    slug: 'svelte',
    name: 'SvelteKit',
    logo: '/ssg-logos/svelte.svg',
    accentColor: '#FF3E00',
    editorHighlight: 'mdsvex-compatible editing with frontmatter fields',
    contentPath: 'src/content/blog',
    exampleFile: 'src/content/blog/getting-started.md',
    configFile: 'svelte.config.js',
    dayOne:
      'SvelteKit sites are small, fast, and easy for agents to generate, often with mdsvex for Markdown.',
    handoff:
      'Markdown content lives in src/content (or wherever your loader reads it). Clients edit content; Svelte components stay with developers.',
    handoffTip:
      'Load Markdown from a single content folder instead of scattering .md routes, so collections stay predictable for editors.',
  },
  {
    slug: 'docusaurus',
    name: 'Docusaurus',
    logo: '/ssg-logos/docusaurus.svg',
    accentColor: '#25C2A0',
    editorHighlight: 'Docusaurus docs and blog collections with sidebar-aware editing',
    contentPath: 'docs',
    exampleFile: 'docs/getting-started.md',
    configFile: 'docusaurus.config.ts',
    dayOne:
      'Docusaurus is the default for product docs, and agents now draft and restructure whole doc sets.',
    handoff:
      'Docs and blog posts live in docs/ and blog/. Writers and product teams edit pages; sidebars and plugins stay in config.',
    handoffTip:
      'Agent-written docs need review. Use review before publish so product owners approve doc changes before they ship.',
  },
  {
    slug: 'vuepress',
    name: 'VuePress',
    logo: '/ssg-logos/vuepress.svg',
    accentColor: '#3EAF7C',
    editorHighlight: 'VuePress Markdown extensions and frontmatter preserved',
    contentPath: 'docs',
    exampleFile: 'docs/guide/getting-started.md',
    configFile: '.vuepress/config.ts',
    dayOne:
      'VuePress keeps docs as Markdown with Vue components where needed, a format agents handle well.',
    handoff:
      'Markdown pages live in docs/. Writers edit pages and front matter; theme and config stay with developers.',
    handoffTip:
      'Keep doc pages and their images together under docs/, so writers edit content without touching theme or config files.',
  },
  {
    slug: 'mkdocs',
    name: 'MkDocs',
    logo: '/ssg-logos/mkdocs.svg',
    accentColor: '#4051B5',
    editorHighlight: 'MkDocs nav structure and Material theme metadata support',
    contentPath: 'docs',
    exampleFile: 'docs/getting-started.md',
    configFile: 'mkdocs.yml',
    dayOne:
      'MkDocs and Material for MkDocs power a lot of technical documentation, and agents keep generating more of it.',
    handoff:
      'Pages live in docs/ as Markdown. Writers edit content; navigation and theme stay in mkdocs.yml.',
    handoffTip:
      'MkDocs needs no Node.js. GitCMS edits the Markdown in docs/ and your existing build publishes it.',
  },
  {
    slug: 'zola',
    name: 'Zola',
    logo: '/ssg-logos/zola.png',
    accentColor: '#004C8A',
    editorHighlight: 'Zola taxonomies and shortcodes with TOML frontmatter editing',
    contentPath: 'content/blog',
    exampleFile: 'content/blog/getting-started.md',
    configFile: 'config.toml',
    dayOne:
      'Zola is a single binary with fast builds, a good fit for lean agent-built sites and blogs.',
    handoff:
      'Content lives in content/ sections with TOML front matter. Editors work on pages and posts; templates stay with developers.',
    handoffTip:
      'Zola uses TOML front matter between +++ fences. Set GitCMS’s front matter format to TOML so edits keep that format.',
  },
]

export const frameworksBySlug: Record<string, FrameworkInfo> = Object.fromEntries(
  frameworkList.map((fw) => [fw.slug, fw]),
)

export function getFramework(slug: string) {
  return frameworksBySlug[slug]
}

// Framework ids create-gitcms detects (gitcms-config's SSG list). Others
// still set up; the CLI just reports the framework as undetected.
const CLI_FRAMEWORK_IDS = new Set(['astro', 'nextjs', 'gatsby', 'hugo', 'jekyll', 'eleventy', 'vuepress', 'docusaurus', 'nuxtjs', 'mkdocs', 'svelte', 'tanstack-start'])

/** What `create-gitcms` prints as this site's framework. */
export function cliFrameworkId(framework: FrameworkInfo) {
  return CLI_FRAMEWORK_IDS.has(framework.slug) ? framework.slug : 'undetected'
}

export function getFrameworkLandingDescription(framework: FrameworkInfo) {
  return `GitCMS is the CMS for code-first ${framework.name} sites: your team, clients, and AI agents edit, review, and publish changes while content stays in your repo.`
}

export function getFrameworkLandingTitle(framework: FrameworkInfo) {
  return `${framework.name} CMS for Teams, Clients, and AI Agents`
}

export function getFrameworkFaqs(framework: FrameworkInfo): Array<FrameworkFaq> {
  return [
    {
      question: `What is GitCMS for ${framework.name}?`,
      answer: `GitCMS is a visual CMS for ${framework.name} sites that live in a Git repository. It reads the Markdown or MDX files your site builds from (for example ${framework.contentPath}), lets your team, clients, and AI agents edit, review, and publish them, and commits every change back to your repo.`,
    },
    ...(framework.extraFaqs ?? []),
    {
      question: `Can non-developers edit a ${framework.name} site without Git?`,
      answer:
        'Yes. Writers, marketers, and clients edit in a visual editor and move work through drafts, review, and publishing. Git stays underneath; nobody has to touch branches, pull requests, or the codebase.',
    },
    {
      question: `My ${framework.name} site was built with Claude Code, Codex, or Cursor. Will GitCMS work?`,
      answer:
        'Yes, if the site is in a Git repository and loads its editable content from Markdown or MDX. GitCMS gives you a copy-paste prompt so your coding agent can set up the configuration, including moving hardcoded copy into collections.',
    },
    {
      question: `Do I need to change my ${framework.name} build or hosting?`,
      answer:
        'No. GitCMS commits to your repository and your existing build and hosting deploy those commits as usual. There is no content database or API to add.',
    },
  ]
}
