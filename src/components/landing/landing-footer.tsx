import { Link } from '@/lib/router'
import { GitCMSLogo } from '@/components/gitcms-logo'
import { DiscordIcon } from '@/components/icons/discord-icon'
import { DISCORD_INVITE_URL, SITE_REPOSITORY_URL } from '@/lib/support-links'
import { GitHubIcon } from '@/components/icons/github-icon'
import { XIcon } from '@/components/icons/x-icon'
import { directoryAgentList } from '@/lib/agent-data'
import { frameworkList } from '@/lib/framework-data'

const socialLinks = [
  {
    label: 'X',
    href: 'https://x.com/gitcms_app',
    icon: XIcon,
  },
  {
    label: 'Discord',
    href: DISCORD_INVITE_URL,
    icon: DiscordIcon,
  },
  {
    label: 'GitHub',
    href: SITE_REPOSITORY_URL,
    icon: GitHubIcon,
  },
] as const

export function LandingFooter() {
  return (
    <footer className="bg-neutral-100 px-4 pt-12 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-7xl">
        {/* Top section: brand left, grouped links right */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {/* Logo + description */}
          <div className="shrink-0 lg:max-w-sm">
            <div className="flex items-center gap-2.5">
              <GitCMSLogo className="size-8" />
              <span className="font-logo text-3xl font-medium tracking-tight text-neutral-900">
                GitCMS
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
              Modern tooling for markdown-first content sites — blogs, docs,
              changelogs, and help docs.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition-colors hover:border-neutral-300 hover:text-neutral-900"
                  >
                    <Icon className="size-4.5" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-3">
            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">
                Resources
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <a
                    href="/#features"
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="/#pricing"
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/changelog"
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/prompts"
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    Prompt library
                  </Link>
                </li>
                <li>
                  <Link
                    to="/glossary"
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    Glossary
                  </Link>
                </li>
                <li>
                  <Link
                    to="/docs/$"
                    params={{ _splat: 'getting-started/quick-start' }}
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    Docs
                  </Link>
                </li>
                <li>
                  <a
                    href="/llms.txt"
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    llms.txt
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Info */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">
                Quick Info
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <Link
                    to="/agents"
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    Agents
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agents"
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    MCP & Agents
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$page"
                    params={{ page: 'manifesto' }}
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    Manifesto
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$page"
                    params={{ page: 'terms' }}
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/$page"
                    params={{ page: 'privacy' }}
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            {/* For */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">For</h3>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <Link
                    to="/for-agencies"
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    Agencies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/for-startups"
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    Startups & Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/for-freelancers"
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    Freelancers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/for-solo-builders"
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    Solo Builders
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Agents — horizontal row */}
        <div className="mt-10">
          <h3 className="text-sm font-semibold text-neutral-900">Agents</h3>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {directoryAgentList.map((agent) => (
              <Link
                key={agent.slug}
                to="/agents/$agent"
                params={{ agent: agent.slug }}
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
              >
                {agent.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Comparisons — horizontal row */}
        <div className="mt-10">
          <h3 className="text-sm font-semibold text-neutral-900">
            Comparisons
          </h3>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {[
              { slug: 'gitcms-vs-contentful', label: 'vs Contentful' },
              { slug: 'gitcms-vs-sanity', label: 'vs Sanity' },
              { slug: 'gitcms-vs-storyblok', label: 'vs Storyblok' },
              { slug: 'gitcms-vs-strapi', label: 'vs Strapi' },
              { slug: 'gitcms-vs-payload', label: 'vs Payload' },
              { slug: 'gitcms-vs-wordpress', label: 'vs WordPress' },
              { slug: 'gitcms-vs-drupal', label: 'vs Drupal' },
              { slug: 'gitcms-vs-ghost', label: 'vs Ghost' },
              { slug: 'gitcms-vs-tinacms', label: 'vs TinaCMS' },
              { slug: 'gitcms-vs-decap-cms', label: 'vs Decap CMS' },
              { slug: 'gitcms-vs-pages-cms', label: 'vs Pages CMS' },
              { slug: 'gitcms-vs-keystatic', label: 'vs Keystatic' },
              { slug: 'gitcms-vs-sveltia-cms', label: 'vs Sveltia CMS' },
              { slug: 'gitcms-vs-cloudcannon', label: 'vs CloudCannon' },
              { slug: 'gitcms-vs-mintlify', label: 'vs Mintlify' },
              { slug: 'gitcms-vs-gitbook', label: 'vs GitBook' },
              { slug: 'gitcms-vs-feather', label: 'vs Feather' },
            ].map((item) => (
              <Link
                key={item.slug}
                to="/compare/$"
                params={{ _splat: item.slug }}
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Supported Frameworks — horizontal row */}
        <div className="mt-10">
          <h3 className="text-sm font-semibold text-neutral-900">
            Supported Frameworks
          </h3>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {frameworkList.map((fw) => (
              <Link
                key={fw.slug}
                to="/git-based-cms-for-{$framework}"
                params={{ framework: fw.slug }}
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
              >
                {fw.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-neutral-200 pt-6 pb-8 text-center text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} GitCMS. All Rights Reserved
        </div>
      </div>
    </footer>
  )
}
