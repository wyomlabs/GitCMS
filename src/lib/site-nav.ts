/** Site-wide navigation, shared by the header and the footer. */
import { useCases } from '@/lib/use-cases'

export const USE_CASE_LINKS = useCases.map((useCase) => ({ label: useCase.name, href: useCase.path, blurb: useCase.blurb }))

export const RESOURCE_LINKS = [
  { label: 'Blog', href: '/blog', blurb: 'Guides and opinions on running code-first sites' },
  { label: 'Prompt library', href: '/prompts', blurb: 'Copy-paste prompts for your coding agent' },
  { label: 'Glossary', href: '/glossary', blurb: 'Website and CMS terms, explained' },
  { label: 'Compare', href: '/compare', blurb: 'GitCMS next to the tools you’re weighing' },
  { label: 'Changelog', href: '/changelog', blurb: 'What shipped, release by release' },
  { label: 'Free tools', href: '/tools', blurb: 'Small utilities for your site’s repo' },
] as const
