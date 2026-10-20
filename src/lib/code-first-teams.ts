/**
 * Well-known teams whose public site content (docs, blog, changelog) lives
 * as Markdown or MDX in Git. Each entry links the public source that
 * shows it. Logos are from Simple Icons (CC0).
 */
export type CodeFirstTeam = {
  name: string
  logoPath: string
  sourceUrl: string
}

export const codeFirstTeams: ReadonlyArray<CodeFirstTeam> = [
  { name: 'Cursor', logoPath: '/brand-logos/cursor.svg', sourceUrl: 'https://leerob.com/agents' },
  { name: 'OpenAI', logoPath: '/brand-logos/openai.svg', sourceUrl: 'https://github.com/openai/openai-cookbook' },
  { name: 'Cloudflare', logoPath: '/brand-logos/cloudflare.svg', sourceUrl: 'https://github.com/cloudflare/cloudflare-docs' },
  { name: 'GitHub', logoPath: '/brand-logos/github.svg', sourceUrl: 'https://github.com/github/docs' },
  { name: 'Supabase', logoPath: '/brand-logos/supabase.svg', sourceUrl: 'https://github.com/supabase/supabase/tree/master/apps/www/_blog' },
  { name: 'Next.js', logoPath: '/brand-logos/nextdotjs.svg', sourceUrl: 'https://github.com/vercel/next.js/tree/canary/docs' },
  { name: 'Tailwind CSS', logoPath: '/brand-logos/tailwindcss.svg', sourceUrl: 'https://github.com/tailwindlabs/tailwindcss.com' },
  { name: 'React', logoPath: '/brand-logos/react.svg', sourceUrl: 'https://github.com/reactjs/react.dev' },
]
