import { useState } from 'react'
import {
  BookOpenIcon,
  ChevronRightIcon,
  ClockIcon,
  MailIcon,
  FileTextIcon,
  LayoutGridIcon,
  LifeBuoyIcon,
  SearchIcon,
} from 'lucide-react'

function AuroraOverlay({ colors }: { colors: [string, string, string] }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute -left-1/4 -top-1/2 size-[80%] rounded-full opacity-60 blur-3xl"
        style={{ background: colors[0] }}
      />
      <div
        className="absolute -right-1/4 top-0 size-[70%] rounded-full opacity-50 blur-3xl"
        style={{ background: colors[1] }}
      />
      <div
        className="absolute -bottom-1/3 left-1/4 size-[60%] rounded-full opacity-40 blur-3xl"
        style={{ background: colors[2] }}
      />
    </div>
  )
}

const tabs = [
  { id: 'blog', label: 'Blog', icon: FileTextIcon, url: 'acme.com/blog' },
  {
    id: 'docs',
    label: 'Product Docs',
    icon: BookOpenIcon,
    url: 'docs.acme.com',
  },
  {
    id: 'helpdesk',
    label: 'Helpdesk',
    icon: LifeBuoyIcon,
    url: 'help.acme.com',
  },
  {
    id: 'changelog',
    label: 'Changelog',
    icon: ClockIcon,
    url: 'acme.com/changelog',
  },
  {
    id: 'directory',
    label: 'Directory',
    icon: LayoutGridIcon,
    url: 'acme.com/directory',
  },
  {
    id: 'newsletter',
    label: 'Newsletter',
    icon: MailIcon,
    url: 'acme.com/newsletter',
  },
] as const

type TabId = (typeof tabs)[number]['id']

function BrowserFrame({
  url,
  children,
}: {
  url: string
  children: React.ReactNode
}) {
  return (
    <div className="aspect-[4/3] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl sm:aspect-[3/2]">
      <div className="flex items-center gap-2 border-b border-neutral-100 bg-neutral-50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="ml-4 flex-1 rounded-md bg-neutral-100 px-3 py-1 text-[11px] text-neutral-400">
          {url}
        </div>
      </div>
      <div className="h-[calc(100%-37px)] overflow-hidden bg-white">
        {children}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mockup: Blog                                                      */
/* ------------------------------------------------------------------ */

const blogPosts = [
  {
    title: 'Why We Chose Astro',
    tag: 'Engineering',
    date: 'Feb 28, 2026',
    tagColor: 'bg-purple-50 text-purple-600',
    excerpt: "After evaluating five frameworks, here's why Astro won...",
  },
  {
    title: 'Series A Announcement',
    tag: 'Company',
    date: 'Feb 20, 2026',
    tagColor: 'bg-emerald-50 text-emerald-600',
    excerpt: 'We raised $12M to accelerate content infrastructure...',
  },
  {
    title: 'Building Our Design System',
    tag: 'Engineering',
    date: 'Feb 12, 2026',
    tagColor: 'bg-purple-50 text-purple-600',
    excerpt: 'How we built a component library that scales across...',
  },
  {
    title: 'Content Strategy for Devtools',
    tag: 'Product',
    date: 'Feb 5, 2026',
    tagColor: 'bg-blue-50 text-blue-600',
    excerpt: 'How we approach documentation as a product surface...',
  },
  {
    title: 'Migrating from Contentful',
    tag: 'Engineering',
    date: 'Jan 30, 2026',
    tagColor: 'bg-purple-50 text-purple-600',
    excerpt: 'A step-by-step guide to moving your content layer...',
  },
  {
    title: 'Meet the Team',
    tag: 'Company',
    date: 'Jan 22, 2026',
    tagColor: 'bg-emerald-50 text-emerald-600',
    excerpt: 'Introducing the people behind Acme and our mission...',
  },
]

function BlogMockup() {
  return (
    <div className="flex h-full flex-col">
      {/* Nav */}
      <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-2.5">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-neutral-900">
            Acme Blog
          </span>
          <div className="hidden gap-3 text-[11px] text-neutral-400 sm:flex">
            <span>Engineering</span>
            <span>Product</span>
            <span>Company</span>
          </div>
        </div>
        <div className="rounded-md bg-neutral-900 px-3 py-1 text-[10px] font-medium text-white">
          Subscribe
        </div>
      </div>

      {/* Featured post hero */}
      <div className="px-4 py-4 sm:px-6">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-500 via-pink-400 to-violet-400 px-6 py-6 sm:px-8 sm:py-8">
          <AuroraOverlay colors={['#fbbf24', '#f472b6', '#a78bfa']} />
          <span className="relative inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
            Featured
          </span>
          <h2 className="relative mt-2 text-base font-bold leading-snug text-white sm:text-lg">
            Introducing Acme v3.0
          </h2>
          <p className="relative mt-1 max-w-md text-[11px] leading-relaxed text-white/80 sm:text-[12px]">
            A complete redesign of our core platform with new APIs, faster
            performance, and a developer experience built for the modern web.
          </p>
          <div className="relative mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-white">
            Read more <ChevronRightIcon className="size-3" />
          </div>
        </div>
      </div>

      {/* Post grid */}
      <div className="flex-1 overflow-hidden px-6 py-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.title}
              className="rounded-lg border border-neutral-100 p-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${post.tagColor}`}
                >
                  {post.tag}
                </span>
                <span className="text-[10px] text-neutral-400">
                  {post.date}
                </span>
              </div>
              <h3 className="mt-2 text-[12px] font-semibold leading-snug text-neutral-900">
                {post.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-neutral-400">
                {post.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mockup: Product Docs                                              */
/* ------------------------------------------------------------------ */

function DocsMockup() {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="hidden w-48 shrink-0 border-r border-neutral-100 px-4 py-4 sm:block">
        <span className="text-xs font-semibold text-neutral-900">
          Acme Docs
        </span>
        <div className="mt-4 space-y-0.5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            Getting Started
          </div>
          <div className="rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-900">
            Introduction
          </div>
          <div className="px-2 py-1 text-[11px] text-neutral-500">
            Installation
          </div>
          <div className="px-2 py-1 text-[11px] text-neutral-500">
            Quick Start
          </div>

          <div className="pt-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            Core Concepts
          </div>
          <div className="px-2 py-1 text-[11px] text-neutral-500">
            Configuration
          </div>
          <div className="px-2 py-1 text-[11px] text-neutral-500">
            Collections
          </div>
          <div className="px-2 py-1 text-[11px] text-neutral-500">
            Content Schema
          </div>

          <div className="pt-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            API Reference
          </div>
          <div className="px-2 py-1 text-[11px] text-neutral-500">REST API</div>
          <div className="px-2 py-1 text-[11px] text-neutral-500">Webhooks</div>
          <div className="px-2 py-1 text-[11px] text-neutral-500">
            Authentication
          </div>

          <div className="pt-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            Guides
          </div>
          <div className="px-2 py-1 text-[11px] text-neutral-500">
            Migration
          </div>
          <div className="px-2 py-1 text-[11px] text-neutral-500">
            Deployment
          </div>
          <div className="px-2 py-1 text-[11px] text-neutral-500">
            Custom Domains
          </div>
          <div className="px-2 py-1 text-[11px] text-neutral-500">
            Environments
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden px-6 py-5 sm:px-8">
        <div className="text-[10px] text-neutral-400">Getting Started</div>
        <h1 className="mt-1 text-xl font-bold tracking-tight text-neutral-900">
          Introduction
        </h1>
        <p className="mt-3 text-[12px] leading-relaxed text-neutral-500">
          Welcome to Acme. This guide walks you through setting up your first
          project and deploying to production.
        </p>
        <div className="mt-4 rounded-lg bg-neutral-900 p-3">
          <code className="text-[11px] text-emerald-400">
            <span className="text-neutral-500">$</span> npm install @acme/sdk
          </code>
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-neutral-500">
          After installation, create a configuration file in your project root.
          This defines your collections, content schema, and deployment
          settings.
        </p>

        {/* Callout */}
        <div className="mt-4 flex gap-2 rounded-lg border border-blue-100 bg-blue-50 p-3">
          <span className="text-sm">💡</span>
          <p className="text-[11px] leading-relaxed text-blue-700">
            New to Acme? Start with the{' '}
            <span className="font-medium underline">Quick Start</span> guide to
            get a project running in under 5 minutes.
          </p>
        </div>

        <h2 className="mt-5 text-sm font-bold tracking-tight text-neutral-900">
          Prerequisites
        </h2>
        <ul className="mt-2 space-y-1">
          {[
            'Node.js 18 or later',
            'A GitHub account',
            'A package manager (npm, pnpm, or yarn)',
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-[11px] text-neutral-500"
            >
              <span className="inline-block size-1 shrink-0 rounded-full bg-neutral-300" />
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-5 text-sm font-bold tracking-tight text-neutral-900">
          Project structure
        </h2>
        <div className="mt-2 rounded-lg bg-neutral-900 p-3">
          <pre className="text-[10px] leading-relaxed text-neutral-400">
            <span className="text-emerald-400">my-project/</span>
            {'\n'}├── content/
            {'\n'}│ ├── blog/
            {'\n'}│ └── docs/
            {'\n'}├── public/
            {'\n'}├── acme.config.ts
            {'\n'}└── package.json
          </pre>
        </div>

        <div className="mt-4 flex items-center gap-1 text-[11px] font-medium text-blue-600">
          Next: Installation <ChevronRightIcon className="size-3" />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mockup: Helpdesk                                                  */
/* ------------------------------------------------------------------ */

const helpdeskCategories = [
  { title: 'Getting Started', count: '12 articles', icon: '🚀' },
  { title: 'Account & Billing', count: '8 articles', icon: '💳' },
  { title: 'Integrations', count: '15 articles', icon: '🔗' },
  { title: 'API Reference', count: '23 articles', icon: '📡' },
  { title: 'Troubleshooting', count: '19 articles', icon: '🔧' },
  { title: 'Security', count: '7 articles', icon: '🔒' },
]

const popularArticles = [
  'How to connect your domain',
  'Setting up team permissions',
  'Understanding webhooks',
  'Configuring SSO for your workspace',
  'Importing content from CSV files',
  'Setting up CI/CD pipelines',
]

function HelpdeskMockup() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-4 py-4 sm:px-6">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-500 px-8 py-6 text-center sm:py-8">
          <AuroraOverlay colors={['#818cf8', '#c084fc', '#6366f1']} />
          <h1 className="relative text-base font-semibold text-white sm:text-lg">
            How can we help?
          </h1>
          <div className="relative mx-auto mt-3 flex max-w-sm items-center rounded-lg bg-white/15 px-3 py-2 backdrop-blur-sm">
            <SearchIcon className="size-3.5 text-white/50" />
            <span className="ml-2 text-[11px] text-white/50">
              Search articles...
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-6 py-5 sm:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {helpdeskCategories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-lg border border-neutral-100 p-3 text-center"
            >
              <span className="text-lg">{cat.icon}</span>
              <h3 className="mt-1 text-[11px] font-semibold text-neutral-900">
                {cat.title}
              </h3>
              <p className="text-[10px] text-neutral-400">{cat.count}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <h2 className="text-xs font-semibold text-neutral-900">
            Popular articles
          </h2>
          <div className="mt-2 space-y-1">
            {popularArticles.map((article) => (
              <div
                key={article}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-[11px]"
              >
                <span className="text-neutral-600">{article}</span>
                <ChevronRightIcon className="size-3 text-neutral-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mockup: Changelog                                                 */
/* ------------------------------------------------------------------ */

const changelogReleases = [
  {
    version: 'v3.2.0',
    date: 'March 8, 2026',
    tag: 'New Feature',
    tagColor: 'bg-emerald-50 text-emerald-600',
    items: [
      'Added real-time collaboration',
      'New dashboard analytics widget',
      'Markdown table support',
    ],
  },
  {
    version: 'v3.1.1',
    date: 'February 25, 2026',
    tag: 'Bug Fix',
    tagColor: 'bg-amber-50 text-amber-600',
    items: ['Fixed image upload timeout', 'Resolved OAuth redirect issue'],
  },
  {
    version: 'v3.1.0',
    date: 'February 15, 2026',
    tag: 'Improvement',
    tagColor: 'bg-blue-50 text-blue-600',
    items: [
      'Redesigned settings page',
      'Faster search indexing',
      'Added bulk export',
    ],
  },
  {
    version: 'v3.0.0',
    date: 'February 1, 2026',
    tag: 'Major Release',
    tagColor: 'bg-rose-50 text-rose-600',
    items: [
      'Complete UI overhaul with new design system',
      'New plugin architecture for custom integrations',
      'GraphQL API support',
      'Multi-region deployment',
    ],
  },
  {
    version: 'v2.9.2',
    date: 'January 18, 2026',
    tag: 'Bug Fix',
    tagColor: 'bg-amber-50 text-amber-600',
    items: [
      'Fixed markdown parser edge case with nested lists',
      'Corrected timezone handling in scheduled posts',
    ],
  },
]

function ChangelogMockup() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-neutral-100 px-8 py-4">
        <h1 className="text-sm font-semibold text-neutral-900">Changelog</h1>
        <p className="text-[11px] text-neutral-400">
          New updates and improvements
        </p>
      </div>

      <div className="flex-1 overflow-hidden px-8 py-5">
        <div className="space-y-6">
          {changelogReleases.map((release) => (
            <div key={release.version} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="size-2 rounded-full bg-neutral-900" />
                <div className="w-px flex-1 bg-neutral-200" />
              </div>
              <div className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-neutral-900">
                    {release.version}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${release.tagColor}`}
                  >
                    {release.tag}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">
                  {release.date}
                </span>
                <ul className="mt-1.5 space-y-0.5">
                  {release.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-1.5 text-[11px] text-neutral-500"
                    >
                      <span className="mt-[5px] inline-block size-1 shrink-0 rounded-full bg-neutral-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mockup: Directory                                                 */
/* ------------------------------------------------------------------ */

const directoryFilters = ['All', 'SaaS', 'Dev Tools', 'Design', 'Marketing']

/* Company logo SVGs (source: Simple Icons) */
const companyLogos = {
  Linear: (
    <svg className="size-4" viewBox="0 0 24 24" fill="#5E6AD2">
      <path d="M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z" />
    </svg>
  ),
  Vercel: (
    <svg className="size-4" viewBox="0 0 24 24" fill="#000">
      <path d="m12 1.608 12 20.784H0Z" />
    </svg>
  ),
  Figma: (
    <svg className="size-4" viewBox="0 0 24 24">
      <path
        fill="#F24E1E"
        d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"
      />
    </svg>
  ),
  Resend: (
    <svg className="size-4" viewBox="0 0 24 24" fill="#000">
      <path d="M14.679 0c4.648 0 7.413 2.765 7.413 6.434s-2.765 6.434-7.413 6.434H12.33L24 24h-8.245l-8.88-8.44c-.636-.588-.93-1.273-.93-1.86 0-.831.587-1.565 1.713-1.883l4.574-1.224c1.737-.465 2.936-1.81 2.936-3.572 0-2.153-1.761-3.4-3.939-3.4H0V0z" />
    </svg>
  ),
  Framer: (
    <svg className="size-4" viewBox="0 0 24 24" fill="#0055FF">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  ),
  Loops: (
    <svg className="size-4" viewBox="0 0 24 24" fill="#4B5AFF">
      <path d="M13.608 1.622h-3.231A10.39 10.39 0 0 0 0 12.002a10.39 10.39 0 0 0 10.377 10.376h3.243A10.39 10.39 0 0 0 24 12.001 10.39 10.39 0 0 0 13.608 1.622M1.284 12a9.085 9.085 0 0 1 10.6-8.96 9.044 9.044 0 0 1 7.568 8.955 5.85 5.85 0 0 1-4.87 5.756 7.12 7.12 0 0 0 2.923-5.756 7.121 7.121 0 0 0-12.17-5.038 7.14 7.14 0 0 0-2.087 5.038 10.35 10.35 0 0 0 4.83 8.783A9.1 9.1 0 0 1 1.291 12zm10.704-5.606A5.83 5.83 0 0 1 16.204 12a5.83 5.83 0 0 1-4.216 5.603A5.83 5.83 0 0 1 7.772 12a5.83 5.83 0 0 1 4.216-5.606m1.62 14.686h-.036a9 9 0 0 1-1.474-.125 9.04 9.04 0 0 1-7.558-8.651V12a5.844 5.844 0 0 1 4.87-5.756A7.12 7.12 0 0 0 6.485 12a7.12 7.12 0 0 0 5.35 6.907A7.143 7.143 0 0 0 20.756 12a10.34 10.34 0 0 0-4.828-8.784A9.086 9.086 0 0 1 22.702 12a9.086 9.086 0 0 1-9.092 9.08" />
    </svg>
  ),
}

type DirectoryCompanyName =
  | 'Linear'
  | 'Vercel'
  | 'Figma'
  | 'Resend'
  | 'Framer'
  | 'Loops'

interface DirectoryListing {
  name: DirectoryCompanyName
  desc: string
  category: string
  bg: string
}

const directoryListings: Array<DirectoryListing> = [
  {
    name: 'Linear',
    desc: 'Issue tracking for modern teams',
    category: 'SaaS',
    bg: 'bg-indigo-50',
  },
  {
    name: 'Vercel',
    desc: 'Frontend cloud platform',
    category: 'Dev Tools',
    bg: 'bg-neutral-100',
  },
  {
    name: 'Figma',
    desc: 'Collaborative design tool',
    category: 'Design',
    bg: 'bg-orange-50',
  },
  {
    name: 'Resend',
    desc: 'Email API for developers',
    category: 'Dev Tools',
    bg: 'bg-neutral-100',
  },
  {
    name: 'Framer',
    desc: 'Website builder for designers',
    category: 'Design',
    bg: 'bg-blue-50',
  },
  {
    name: 'Loops',
    desc: 'Email marketing platform',
    category: 'Marketing',
    bg: 'bg-indigo-50',
  },
]

function DirectoryMockup() {
  return (
    <div className="flex h-full flex-col">
      {/* Colorful hero banner */}
      <div className="px-4 py-4 sm:px-6">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 via-emerald-500 to-green-400 px-6 py-5 sm:px-8 sm:py-6">
          <AuroraOverlay colors={['#5eead4', '#34d399', '#a7f3d0']} />
          <h1 className="relative text-base font-bold text-white sm:text-lg">
            Acme Directory
          </h1>
          <p className="relative mt-0.5 text-[11px] text-white/80">
            Discover the best tools and resources for your stack.
          </p>
          <div className="relative mt-3 flex items-center rounded-lg bg-white/20 px-3 py-2 backdrop-blur-sm sm:max-w-sm">
            <SearchIcon className="size-3.5 text-white/60" />
            <span className="ml-2 text-[11px] text-white/60">
              Search listings...
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 overflow-x-auto border-b border-neutral-100 px-6 py-2.5 sm:px-8">
        {directoryFilters.map((filter, i) => (
          <span
            key={filter}
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
              i === 0
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-500'
            }`}
          >
            {filter}
          </span>
        ))}
      </div>

      {/* Listings with real logos */}
      <div className="flex-1 overflow-hidden px-6 py-4 sm:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {directoryListings.map((item) => (
            <div
              key={item.name}
              className="flex items-start gap-3 rounded-lg border border-neutral-100 p-3"
            >
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${item.bg}`}
              >
                {companyLogos[item.name]}
              </div>
              <div className="min-w-0">
                <h3 className="text-[12px] font-semibold text-neutral-900">
                  {item.name}
                </h3>
                <p className="truncate text-[10px] text-neutral-400">
                  {item.desc}
                </p>
                <span className="mt-1 inline-block rounded-full bg-neutral-100 px-1.5 py-0.5 text-[9px] text-neutral-500">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mockup: Newsletter                                                */
/* ------------------------------------------------------------------ */

const newsletterIssues = [
  {
    issue: '#42',
    title: 'Shipping the content board',
    status: 'Sent',
    date: 'March 29, 2026',
    excerpt:
      'How GitCMS now moves content from idea to draft to review with a workflow built for markdown sites.',
  },
  {
    issue: '#41',
    title: 'Why we built the MCP app',
    status: 'Sent',
    date: 'March 22, 2026',
    excerpt:
      'Inside the first real version of the GitCMS MCP app and what changed after replacing open_cms.',
  },
  {
    issue: '#40',
    title: 'Editorial workflow without Git training',
    status: 'Draft',
    date: 'In review',
    excerpt:
      'A draft issue focused on abstracting Git behind a clearer workflow for writers and marketers.',
  },
]

function NewsletterMockup() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-neutral-100 px-6 py-4 sm:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold text-neutral-900">
              Acme Newsletter
            </h1>
            <p className="text-[11px] text-neutral-400">
              Weekly product notes, shipped from markdown.
            </p>
          </div>
          <div className="rounded-md bg-neutral-900 px-3 py-1 text-[10px] font-medium text-white">
            Subscribe
          </div>
        </div>
      </div>

      <div className="px-4 py-4 sm:px-6">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 px-6 py-6 sm:px-8 sm:py-7">
          <AuroraOverlay colors={['#fde68a', '#fdba74', '#fca5a5']} />
          <span className="relative inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
            Latest issue
          </span>
          <h2 className="relative mt-2 text-base font-bold leading-snug text-white sm:text-lg">
            Shipping the content board
          </h2>
          <p className="relative mt-1 max-w-md text-[11px] leading-relaxed text-white/80 sm:text-[12px]">
            A short update on editorial workflow, review before publish, and
            what changed in GitCMS this week.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-6 py-4 sm:px-8">
        <div className="space-y-3">
          {newsletterIssues.map((issue) => (
            <div
              key={issue.issue}
              className="rounded-lg border border-neutral-100 p-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-neutral-400">
                  {issue.issue}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${
                    issue.status === 'Sent'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-amber-50 text-amber-600'
                  }`}
                >
                  {issue.status}
                </span>
                <span className="text-[10px] text-neutral-400">
                  {issue.date}
                </span>
              </div>
              <h3 className="mt-2 text-[12px] font-semibold text-neutral-900">
                {issue.title}
              </h3>
              <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                {issue.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main section                                                      */
/* ------------------------------------------------------------------ */

const mockups: Record<TabId, () => React.JSX.Element> = {
  blog: BlogMockup,
  docs: DocsMockup,
  helpdesk: HelpdeskMockup,
  changelog: ChangelogMockup,
  directory: DirectoryMockup,
  newsletter: NewsletterMockup,
}

export function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<TabId>('blog')
  const activeTabData = tabs.find((t) => t.id === activeTab)!
  const ActiveMockup = mockups[activeTab]

  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-5xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="font-logo text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Every page your team needs to keep changing.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
            Marketing pages, blogs, docs, changelogs, help centers, directories
            — if your site reads it from Markdown or MDX, GitCMS lets people and
            agents run it.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700'
                }`}
              >
                <Icon className="size-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Browser frame */}
        <div className="mt-8">
          <BrowserFrame url={activeTabData.url}>
            <ActiveMockup />
          </BrowserFrame>
        </div>
      </div>
    </section>
  )
}
