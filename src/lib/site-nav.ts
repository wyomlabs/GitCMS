/** Site-wide navigation, shared by the header and the footer. */
import type { LucideIcon } from 'lucide-react'
import { BookA, Bot, Building2, GitCompareArrows, History, Laptop, Newspaper, PenLine, Puzzle, Rocket, SearchCheck, Signpost, SquareTerminal, Wrench } from 'lucide-react'
import { features } from '@/lib/features'
import { frameworkList } from '@/lib/framework-data'
import type { UseCaseSlug } from '@/lib/use-cases'
import { useCases } from '@/lib/use-cases'

export type NavLink = { label: string; href: string; blurb: string; icon: LucideIcon; badge?: 'Soon' | 'Alpha' }

export const USE_CASE_ICONS: Record<UseCaseSlug, LucideIcon> = {
  agencies: Building2,
  freelancers: Laptop,
  startups: Rocket,
  'solo-builders': PenLine,
}

/** Feature pages, plus SEO pointing at its homepage section until it has a page of its own. */
export const FEATURE_LINKS: ReadonlyArray<NavLink> = [
  ...features.map((feature) => ({ label: feature.name, href: feature.path, blurb: feature.blurb, icon: feature.icon, badge: feature.alpha && ('Alpha' as const) })),
  { label: 'SEO & AEO', href: '/#seo', blurb: 'Search data and content checks for your agent', icon: SearchCheck, badge: 'Alpha' },
]

export const PLATFORM_LINKS: ReadonlyArray<NavLink> = [
  { label: 'Agents & MCP', href: '/agents/', blurb: 'ChatGPT, Claude and coding agents draft for review', icon: Bot },
  { label: 'One-prompt setup', href: '/docs/getting-started/cli-onboarding/', blurb: 'Your coding agent runs create-gitcms', icon: SquareTerminal },
  { label: 'Browser extension', href: '/extension/', blurb: 'Open any GitHub repo or file in GitCMS', icon: Puzzle },
]

export const USE_CASE_LINKS: ReadonlyArray<NavLink> = useCases.map((useCase) => ({ label: useCase.name, href: useCase.path, blurb: useCase.blurb, icon: USE_CASE_ICONS[useCase.slug] }))

export const FRAMEWORK_LINKS = frameworkList.map((framework) => ({ label: framework.name, href: `/git-based-cms-for-${framework.slug}/`, logo: framework.logo }))

export const LEARN_LINKS: ReadonlyArray<NavLink> = [
  { label: 'Blog', href: '/blog/', blurb: 'Guides and opinions on running code-first sites', icon: Newspaper },
  { label: 'Prompt library', href: '/prompts/', blurb: 'Copy-paste prompts for your coding agent', icon: SquareTerminal },
  { label: 'Glossary', href: '/glossary/', blurb: 'Website and CMS terms, explained', icon: BookA },
  { label: 'Compare', href: '/compare/', blurb: 'GitCMS next to the tools you’re weighing', icon: GitCompareArrows },
  { label: 'Alternatives', href: '/alternatives/', blurb: 'Where to go from WordPress and others, by situation', icon: Signpost },
]

export const UPDATE_LINKS: ReadonlyArray<NavLink> = [
  { label: 'Changelog', href: '/changelog/', blurb: 'What shipped, release by release', icon: History },
  { label: 'Free tools', href: '/tools/', blurb: 'Small utilities for your site’s repo', icon: Wrench },
]

export const RESOURCE_LINKS: ReadonlyArray<NavLink> = [...LEARN_LINKS, ...UPDATE_LINKS]
