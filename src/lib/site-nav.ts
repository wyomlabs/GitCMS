/** Site-wide navigation, shared by the header and the footer. */

export const USE_CASE_LINKS = [
  { label: 'Agencies', href: '/for-agencies', blurb: 'Hand off client sites without becoming the bottleneck' },
  { label: 'Freelancers', href: '/for-freelancers', blurb: 'Let clients edit, keep the code yours' },
  { label: 'Startups', href: '/for-startups', blurb: 'Website changes without engineering tickets' },
  { label: 'Solo builders', href: '/for-solo-builders', blurb: 'Ship the blog, docs and changelog your product needs' },
] as const

export const RESOURCE_LINKS = [
  { label: 'Blog', href: '/blog', blurb: 'Guides and opinions on running code-first sites' },
  { label: 'Prompt library', href: '/prompts', blurb: 'Copy-paste prompts for your coding agent' },
  { label: 'Glossary', href: '/glossary', blurb: 'Website and CMS terms, explained' },
  { label: 'Compare', href: '/compare', blurb: 'GitCMS next to the tools you’re weighing' },
  { label: 'Changelog', href: '/changelog', blurb: 'What shipped, release by release' },
  { label: 'Free tools', href: '/tools', blurb: 'Small utilities for your site’s repo' },
] as const
