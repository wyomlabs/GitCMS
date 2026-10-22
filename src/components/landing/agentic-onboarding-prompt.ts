export function getAgenticOnboardingPrompt(
  frameworkName: string | undefined,
): string {
  const frameworkContext = frameworkName
    ? [`This repo uses ${frameworkName} for the site.`]
    : []

  return [
    'You are onboarding GitCMS for this repository.',
    ...frameworkContext,
    '',
    'GitCMS is a Git-based CMS for markdown/MDX content sites. Use the create-gitcms CLI to generate `.gitcms` configuration for each real content site in this repo.',
    'Product site: https://gitcms.dev',
    '',
    'Inspect the repo first. Prefer the CLI over hand-writing config.',
    '',
    'Preferred commands from the repo root:',
    '- Interactive: npx create-gitcms@latest',
    '- Agentic dry run: npx create-gitcms@latest --yes --dry-run',
    '- Agentic write: npx create-gitcms@latest --yes',
    '- When a site has no address in its config: add --website-url <site-root>=<website-url> for that site',
    '',
    'Flag guidance:',
    '- Prefer auto detection first.',
    '- Use --mode single or --mode monorepo only when the repo structure is clear.',
    '- Use repeatable --site-root only to override or narrow monorepo site detection.',
    '- Each site needs its own website address. The CLI reads it from each site\'s framework config and names any site it could not find one for.',
    '- Use --dry-run before writing when you are not fully sure.',
    '- Re-running is safe: sites already in `.gitcms/sites.jsonc` stay unchanged and new sites are added.',
    '- Use --force only when regenerating config for sites that are already set up is intended.',
    '',
    'Ask the user only if:',
    '- multiple site-root choices are plausible and inspection cannot resolve them safely',
    '- website_url is unclear or cannot be inferred safely',
    '',
    'After running the CLI, report:',
    '- created or updated `.gitcms` paths',
    '- detected site roots',
    '- detected collections',
    '- warnings and follow-up settings to review in GitCMS',
    '- then commit and push the `.gitcms` folder and share the GitCMS link the CLI printed',
  ].join('\n')
}
