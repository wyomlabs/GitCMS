import { GitBranch, Sparkles } from 'lucide-react'

export { MCP_CONNECTOR_URL } from '@/lib/mcp'

export const GitHubMark = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 98 96"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
    />
  </svg>
)

export function McpSectionEyebrow({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-widest text-violet-700">
      <Sparkles className="size-3.5" />
      {children}
    </div>
  )
}

export function McpEditorMockup() {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-xl border border-neutral-200 bg-[#111] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
          <GitHubMark className="size-3.5" />
          <span className="text-neutral-600">/</span>
          <span>acme</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-300">blog</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-300">migration-guide</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-violet-500/15 px-2 py-1 text-[11px] font-medium text-violet-300">
            <GitBranch className="size-2.5" />
            task-142
          </span>
          <span className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-medium text-neutral-400">
            Save draft
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-violet-400/20 bg-violet-500/10 px-4 py-2">
        <div className="flex items-center gap-1.5 text-xs text-violet-200">
          <svg
            className="size-3.5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-7v4h4l-5 7z" />
          </svg>
          Reviewable AI suggestion
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-1 text-[11px] font-medium text-emerald-300">
            Accept
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-red-500/20 px-2 py-1 text-[11px] font-medium text-red-300">
            Discard
          </span>
        </div>
      </div>

      <div className="px-4 pt-4 pb-5 sm:px-6">
        <div className="mb-5 border-b border-white/10 pb-4">
          <div className="font-heading text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
            Migrating from a traditional CMS to markdown
          </div>
          <div className="mt-2.5 space-y-0">
            <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-2 py-1 sm:grid-cols-[140px_minmax(0,1fr)]">
              <span className="text-xs text-neutral-500 sm:text-sm">
                Task
              </span>
              <div className="flex h-8 items-center rounded-md bg-white/5 px-3 text-xs text-neutral-300 sm:h-9 sm:text-sm">
                Content task #142
              </div>
            </div>
            <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-2 py-1 sm:grid-cols-[140px_minmax(0,1fr)]">
              <span className="text-xs text-neutral-500 sm:text-sm">
                Collection
              </span>
              <div className="flex h-8 items-center rounded-md bg-white/5 px-3 text-xs text-neutral-300 sm:h-9 sm:text-sm">
                posts
              </div>
            </div>
            <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-2 py-1 sm:grid-cols-[140px_minmax(0,1fr)]">
              <span className="text-xs text-neutral-500 sm:text-sm">
                Status
              </span>
              <div className="flex min-h-8 items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 sm:min-h-9">
                <span className="rounded-sm bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-300">
                  draft
                </span>
                <span className="rounded-sm bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-300">
                  docs
                </span>
                <span className="rounded-sm bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-300">
                  review-ready
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm sm:text-base">
          <p className="leading-relaxed text-neutral-300">
            We&apos;re moving teams away from{' '}
            <del className="rounded-sm bg-red-500/25 px-0.5 text-red-300">
              copy-pasting AI drafts into a CMS after the fact
            </del>{' '}
            <ins className="rounded-sm bg-emerald-500/25 px-0.5 text-emerald-300 no-underline">
              a task-first workflow where brainstorming, drafting, and review stay connected
            </ins>
            .
          </p>
          <p className="leading-relaxed text-neutral-300">
            <ins className="rounded-sm bg-emerald-500/25 px-0.5 text-emerald-300 no-underline">
              GitCMS keeps the editor, schema, and review path in the same place the model is working.
            </ins>
          </p>
        </div>
      </div>
    </div>
  )
}
