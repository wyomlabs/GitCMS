import { ArrowRight, ExternalLink, FileText, Github, MousePointerClick } from 'lucide-react'
import { Link } from '@/lib/router'

const chromeStoreUrl =
  'https://chromewebstore.google.com/detail/gitcms-headless-cms-for-y/pemglpclheejlbobifgdbjjofdhmiafm'

const shortcuts = [
  {
    icon: MousePointerClick,
    title: 'Right-click to open',
    description: 'Open a GitHub repository or Markdown link directly in GitCMS.',
  },
  {
    icon: FileText,
    title: 'Keep your place',
    description: 'Pass the selected GitHub file or folder location to GitCMS.',
  },
  {
    icon: Github,
    title: 'Jump from the address bar',
    description: 'Type gitcms, then a repository name or GitHub URL.',
  },
]

export function ExtensionPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          GitCMS browser companion
        </p>
        <h1 className="mt-5 max-w-3xl font-logo text-4xl font-medium tracking-tight sm:text-6xl">
          From GitHub to GitCMS in a click.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Open GitHub repositories, Markdown files, and folders in GitCMS,
          the visual CMS for code-first websites. Keep the editor, review,
          and publishing experience on the web, right where your team needs it.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href={chromeStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Chrome Web Store
            <ExternalLink className="size-4" />
          </a>
          <a
            href="/docs/features/chrome-extension"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            How it works
            <ArrowRight className="size-4" />
          </a>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Free to install. Firefox add-on submission in progress.
        </p>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {shortcuts.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl border border-border p-6">
              <Icon className="size-5 text-foreground" />
              <h2 className="mt-5 text-base font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-20 border-t border-border pt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Beyond the extension
          </p>
          <h2 className="mt-4 max-w-2xl font-logo text-3xl font-medium tracking-tight sm:text-4xl">
            Your AI built the website. Now give your team a way to run it.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            GitCMS gives people and supported AI agents a shared place to edit,
            review, and publish content while your repository remains the source
            of truth. The extension is a shortcut to GitCMS, not an embedded editor.
            Some web-app capabilities require an account or paid access.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
          >
            Explore GitCMS <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>
    </main>
  )
}
