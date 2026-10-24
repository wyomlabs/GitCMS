import { markdownDocument } from '@/lib/machine-markdown'
import { absolutePublicUrl, type PublicResource } from '@/lib/public-resources'
import { PRODUCT_DEFINITION } from '@/lib/positioning'

const GROUPS: ReadonlyArray<{
  title: string
  kinds: ReadonlyArray<PublicResource['kind']>
}> = [
  { title: 'Who GitCMS is for', kinds: ['persona'] },
  { title: 'Features', kinds: ['feature'] },
  { title: 'Agents', kinds: ['agent'] },
  { title: 'Frameworks', kinds: ['framework'] },
  { title: 'AI site builders', kinds: ['builder'] },
  { title: 'Comparisons', kinds: ['comparison'] },
  { title: 'Blog', kinds: ['blog'] },
  { title: 'Prompt library', kinds: ['prompt'] },
  { title: 'Free tools', kinds: ['tool'] },
  { title: 'Glossary', kinds: ['glossary'] },
  { title: 'Documentation', kinds: ['docs'] },
  { title: 'Changelog', kinds: ['changelog'] },
]

function discoverable(resource: PublicResource) {
  return resource.listed !== false && !resource.noIndex && resource.kind !== 'index'
}

function line(resource: PublicResource) {
  return `- [${resource.title}](${absolutePublicUrl(resource.markdownPath)}): ${resource.description}`
}

export function renderLlmsTxt(resources: ReadonlyArray<PublicResource>) {
  const home = resources.find((resource) => resource.htmlPath === '/')
  const manifesto = resources.find((resource) => resource.htmlPath === '/manifesto')
  const lines = [
    '# GitCMS',
    '',
    `> ${PRODUCT_DEFINITION}`,
    '',
    '## Product',
    '',
    ...(home ? [line(home)] : []),
    ...(manifesto ? [line(manifesto)] : []),
    `- [HTML website](${absolutePublicUrl('/')}): Canonical human-readable GitCMS website`,
    '',
  ]

  for (const group of GROUPS) {
    const items = resources
      .filter((resource) => discoverable(resource) && group.kinds.includes(resource.kind))
      .sort((a, b) => a.title.localeCompare(b.title))
    if (items.length === 0) continue
    lines.push(`## ${group.title}`, '', ...items.map(line), '')
  }

  lines.push(
    '## Scoped indexes',
    '',
    `- [Documentation index](${absolutePublicUrl('/docs/llms.txt')}): Machine-readable index for GitCMS documentation`,
    '',
  )

  return `${lines.join('\n')}\n`
}

export function renderScopedLlmsTxt(
  title: string,
  description: string,
  resources: ReadonlyArray<PublicResource>,
) {
  return [
    `# ${title}`,
    '',
    `> ${description}`,
    '',
    ...resources
      .filter(discoverable)
      .sort((a, b) => a.title.localeCompare(b.title))
      .map(line),
    '',
  ].join('\n')
}

export function renderLlmsFull(resources: ReadonlyArray<PublicResource>) {
  return resources
    .filter((resource) => discoverable(resource))
    .sort((a, b) => a.htmlPath.localeCompare(b.htmlPath))
    .map((resource) => markdownDocument({
      title: resource.title,
      description: resource.description,
      canonicalPath: resource.htmlPath,
      body: resource.body,
    }).trim())
    .join('\n\n---\n\n') + '\n'
}
