import { GitBranchIcon } from 'lucide-react'

const GitHubMark = ({ className }: { className?: string }) => (
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

type BoardColumn = {
  id: string
  label: string
  accent: string
  countBadge: string
  cards: Array<{ title: string, meta: string }>
}

const BOARD_COLUMNS: BoardColumn[] = [
  {
    id: 'ideas',
    label: 'Ideas',
    accent: 'text-amber-800',
    countBadge: 'bg-amber-100 text-amber-900',
    cards: [
      { title: 'Q2 launch narrative', meta: 'Brief · Marketing' },
      { title: 'Docs IA refresh', meta: 'Outline · Product' },
    ],
  },
  {
    id: 'draft',
    label: 'Draft',
    accent: 'text-sky-800',
    countBadge: 'bg-sky-100 text-sky-900',
    cards: [
      { title: 'Migration guide', meta: 'Alex · 2d ago' },
      { title: 'API error codes', meta: 'Sam · Today' },
    ],
  },
  {
    id: 'review',
    label: 'Review',
    accent: 'text-violet-800',
    countBadge: 'bg-violet-100 text-violet-900',
    cards: [
      { title: 'v2 API announcement', meta: 'Pending · Legal' },
    ],
  },
  {
    id: 'published',
    label: 'Published',
    accent: 'text-emerald-800',
    countBadge: 'bg-emerald-100 text-emerald-900',
    cards: [
      { title: 'February changelog', meta: 'Live · main' },
    ],
  },
]

/** Light content-board style mockup — switch to this from `editorial-flow-mockup` via variant. */
export function EditorialBoardMockup() {
  return (
    <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_25px_60px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.04]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 bg-neutral-50/80 px-5 py-3.5 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-1.5 text-sm text-neutral-600">
          <GitHubMark className="size-4 shrink-0 text-neutral-800" />
          <span className="text-neutral-400">/</span>
          <span className="truncate font-medium text-neutral-800">acme</span>
          <span className="text-neutral-400">/</span>
          <span className="truncate text-neutral-600">blog</span>
          <span className="text-neutral-400">/</span>
          <span className="truncate font-semibold text-[#5a7d1a]">
            content board
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-violet-100 px-2.5 py-1.5 text-xs font-medium text-violet-800">
            <GitBranchIcon className="size-3.5" strokeWidth={2} />
            main
          </span>
          <span className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600">
            Board
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1 border-b border-neutral-200 bg-neutral-50 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6">
        <span className="text-sm font-medium text-neutral-800">
          Editorial workflow
        </span>
        <span className="text-xs text-neutral-500">
          <span className="hidden sm:inline">Drag between stages · </span>
          Git stays the source of truth
        </span>
      </div>

      <div className="min-h-[22rem] p-5 sm:min-h-[26rem] sm:p-7 lg:min-h-[28rem] lg:p-8">
        <div className="flex h-full min-h-[18rem] gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:min-h-[20rem] sm:grid-cols-4 sm:gap-5 sm:overflow-visible lg:min-h-[22rem]">
          {BOARD_COLUMNS.map((col) => (
            <div
              key={col.id}
              className="flex w-[min(100%,14rem)] shrink-0 flex-col rounded-xl border border-neutral-200 bg-neutral-50/90 sm:w-auto sm:min-h-0"
            >
              <div className="flex items-center justify-between border-b border-neutral-200/80 bg-white/60 px-3 py-3 sm:px-4">
                <span
                  className={`text-[11px] font-bold uppercase tracking-[0.16em] sm:text-xs ${col.accent}`}
                >
                  {col.label}
                </span>
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-semibold tabular-nums ${col.countBadge}`}
                >
                  {col.cards.length}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-3 sm:gap-3.5 sm:p-4">
                {col.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-xl border border-neutral-200 bg-white px-3.5 py-3.5 shadow-sm sm:px-4 sm:py-4"
                  >
                    <p className="text-sm font-semibold leading-snug text-neutral-900 sm:text-base">
                      {card.title}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-neutral-500 sm:text-sm">
                      {card.meta}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
