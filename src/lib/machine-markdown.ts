import { AGENT_SETUP_PROMPT } from '@/lib/agent-setup-prompt'
import { codeFirstTeams } from '@/lib/code-first-teams'
import { LICENSE_PRICE_SUMMARY, SITE_URL } from '@/lib/positioning'
import { pageUrlPath } from '@/lib/public-resources'


function parseQuotedProp(source: string, name: string) {
  const match = source.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`))
  return match?.[1]?.trim() ?? ''
}

function parseObjectStringFields(source: string) {
  const fields: Record<string, string> = {}
  const fieldPattern = /(category|gitcms|competitor|note|label|value|free|paid)\s*:\s*(['"])([\s\S]*?)\2\s*,?/g
  for (const match of source.matchAll(fieldPattern)) {
    fields[match[1]] = match[3].replace(/\\'/g, "'").replace(/\\"/g, '"')
  }
  return fields
}

function convertFeatureTables(input: string) {
  return input.replace(/<FeatureTable\b([\s\S]*?)\/>/g, (_whole, props: string) => {
    const competitor = parseQuotedProp(props, 'competitor') || 'Competitor'
    const rowsBlock = props.match(/rows\s*=\s*\{\[([\s\S]*?)\]\}/)?.[1] ?? ''
    const rows = [...rowsBlock.matchAll(/\{([\s\S]*?)\}/g)].flatMap((match) => {
      const row = parseObjectStringFields(match[1])
      return row.category && row.gitcms && row.competitor ? [row] : []
    })

    if (rows.length === 0) return '\n'

    return [
      '',
      `| Capability | GitCMS | ${competitor} |`,
      '| --- | --- | --- |',
      ...rows.map((row) => {
        const note = row.note ? ` — ${row.note}` : ''
        return `| ${row.category}${note} | ${row.gitcms} | ${row.competitor} |`
      }),
      '',
    ].join('\n')
  })
}

function convertPricing(input: string) {
  return input.replace(/<PricingCompare\b([\s\S]*?)\/>/g, (_whole, props: string) => {
    const competitorName = parseQuotedProp(props, 'competitorName') || 'Competitor'
    const competitorBlock = props.match(/competitor\s*=\s*\{\{([\s\S]*?)\}\}/)?.[1] ?? ''
    const gitcmsBlock = props.match(/gitcms\s*=\s*\{\{([\s\S]*?)\}\}/)?.[1] ?? ''
    const competitor = parseObjectStringFields(competitorBlock)
    const gitcms = parseObjectStringFields(gitcmsBlock)

    return [
      '',
      `- **GitCMS:** ${LICENSE_PRICE_SUMMARY}${gitcms.note ? ` — ${gitcms.note}` : ''}`,
      `- **${competitorName}:** ${[competitor.free, competitor.paid].filter(Boolean).join('; ')}${competitor.note ? ` — ${competitor.note}` : ''}`,
      '',
    ].join('\n')
  })
}

function convertCaseStudies(input: string) {
  return input.replace(/<CaseStudy\b([\s\S]*?)>([\s\S]*?)<\/CaseStudy>/g, (_whole, props: string, children: string) => {
    const title = parseQuotedProp(props, 'title')
    const source = parseQuotedProp(props, 'source')
    const sourceUrl = parseQuotedProp(props, 'sourceUrl')
    const statsBlock = props.match(/stats\s*=\s*\{\[([\s\S]*?)\]\}/)?.[1] ?? ''
    const stats = [...statsBlock.matchAll(/\{([\s\S]*?)\}/g)].flatMap((match) => {
      const stat = parseObjectStringFields(match[1])
      return stat.label && stat.value ? [stat] : []
    })

    return [
      '',
      `### Case study${title ? `: ${title}` : ''}`,
      '',
      stripSimpleHtml(children).trim(),
      ...(stats.length > 0 ? ['', ...stats.map((stat) => `- **${stat.value}** — ${stat.label}`)] : []),
      ...(source ? ['', `Source: ${sourceUrl ? `[${source}](${sourceUrl})` : source}`] : []),
      '',
    ].join('\n')
  })
}

function stripSimpleHtml(input: string) {
  return input
    .replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/?(?:p|ul|ol|div|span|strong|em|aside)[^>]*>/gi, '')
}

function convertMdxChunk(input: string) {
  let output = input

  output = output.replace(/<GitCMSSetupPrompt\s*\/>/g, `\n\`\`\`text\n${AGENT_SETUP_PROMPT}\n\`\`\`\n`)
  output = output.replace(
    /<CodeFirstTeamsList\s*\/>/g,
    `\n${codeFirstTeams.map((team) => `- [${team.name}](${team.sourceUrl})`).join('\n')}\n`,
  )

  output = output.replace(/<video\b([\s\S]*?)>([\s\S]*?)<\/video>/gi, (_whole, attrs: string) => {
    const src = parseQuotedProp(attrs, 'src')
    return src ? `\nVideo: ${new URL(src, SITE_URL).toString()}\n` : '\n'
  })

  output = convertCaseStudies(output)
  output = convertFeatureTables(output)
  output = convertPricing(output)

  output = output
    .replace(/<VerdictCompetitor\b([^>]*)>/g, (_whole, attrs: string) => `\n### Choose ${parseQuotedProp(attrs, 'title') || 'the competitor'} if\n`)
    .replace(/<VerdictGitCMS\b[^>]*>/g, '\n### Choose GitCMS if\n')
    .replace(/<\/?Verdict\b[^>]*>/g, '\n')
    .replace(/<\/VerdictCompetitor>|<\/VerdictGitCMS>/g, '\n')
    .replace(/<Tradeoffs\b[^>]*>/g, '\n### Honest tradeoffs\n')
    .replace(/<\/Tradeoffs>/g, '\n')
    .replace(/<Callout\b([^>]*)>([\s\S]*?)<\/Callout>/g, (_whole, attrs: string, children: string) => {
      const title = parseQuotedProp(attrs, 'title') || 'Note'
      const text = stripSimpleHtml(children).trim().replace(/\n+/g, ' ')
      return `\n> **${title}:** ${text}\n`
    })
    .replace(/<CompareCTA\b([\s\S]*?)\/>/g, (_whole, attrs: string) => {
      const description = parseQuotedProp(attrs, 'description')
      return description ? `\n> ${description}\n` : '\n'
    })

  output = stripSimpleHtml(output)

  // Any remaining capitalized JSX element is presentation-only. Remove the
  // tag itself while preserving child prose around it.
  output = output
    .replace(/<\/?[A-Z][A-Za-z0-9.]*\b[^>]*>/g, '')
    .replace(/^\s*[A-Za-z][A-Za-z0-9]*\s*=\s*\{[\s\S]*?^\s*\}\s*$/gm, '')

  return output
}

/** Convert repository MDX into plain Markdown without touching fenced code. */
export function mdxToMachineMarkdown(source: string) {
  const parts = source.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/g)
  const output = parts
    .map((part, index) => (index % 2 === 1 ? part : convertMdxChunk(part)))
    .join('')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim()

  return `${output}\n`
}

export function markdownDocument({
  title,
  description,
  canonicalPath,
  body,
}: {
  title: string
  description?: string
  canonicalPath: string
  body: string
}) {
  const canonical = new URL(pageUrlPath(canonicalPath), SITE_URL).toString()
  const intro = [
    `# ${title}`,
    description ? `> ${description}` : '',
    `Canonical: ${canonical}`,
  ].filter(Boolean)

  const cleanBody = mdxToMachineMarkdown(body)
  return `${intro.join('\n\n')}\n\n${cleanBody}`
}
