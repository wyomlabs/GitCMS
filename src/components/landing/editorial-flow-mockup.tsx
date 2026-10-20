import { GitBranch } from 'lucide-react'
import { EditorialBoardMockup } from './editorial-board-mockup'

export type EditorialFlowMockupVariant = 'timeline' | 'board'

/**
 * `timeline` — vertical cards on dark UI chrome (matches 04 / Teams mockup).
 * `board` — light content-board UI mockup.
 */
const EDITORIAL_FLOW_MOCKUP_VARIANT: EditorialFlowMockupVariant = 'timeline'

const TIMELINE_STEPS = [
  {
    id: 'ideas',
    title: 'Ideas',
    subtitle: 'Briefs, topics, and references in one place.',
    badge: 'Ideation',
    dotClass: 'bg-amber-500',
    step: '01',
  },
  {
    id: 'draft',
    title: 'Draft',
    subtitle: 'Writers shape content without touching Git.',
    badge: 'Writing',
    dotClass: 'bg-sky-500',
    step: '02',
  },
  {
    id: 'review',
    title: 'Review',
    subtitle: 'Approvals, comments, and activity stay visible.',
    badge: 'Review',
    dotClass: 'bg-violet-500',
    step: '03',
  },
  {
    id: 'published',
    title: 'Published',
    subtitle: 'Ship to your site; history stays in the repo.',
    badge: 'Live',
    dotClass: 'bg-emerald-500',
    step: '04',
  },
] as const

function EditorialFlowTimelineMockup() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-white">
              Editorial workflow
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Ideas → draft → review → published
            </p>
          </div>
          <span className="shrink-0 rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-neutral-400">
            4 stages
          </span>
        </div>
      </div>

      <div className="space-y-0">
        {TIMELINE_STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`flex gap-4 ${index < TIMELINE_STEPS.length - 1 ? 'pb-5' : ''}`}
          >
            <div className="relative z-[1] flex w-10 shrink-0 justify-center pt-0.5">
              {index < TIMELINE_STEPS.length - 1 ? (
                <div
                  className="absolute left-1/2 top-10 h-[calc(100%+1.25rem)] w-0 -translate-x-1/2 border-l-2 border-dashed border-white/20"
                  aria-hidden
                />
              ) : null}
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-full ${step.dotClass} text-xs font-medium text-white`}
              >
                {step.step}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">
                    {step.title}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {step.subtitle}
                  </p>
                </div>
                <span className="shrink-0 pl-3 text-xs text-neutral-500">
                  {step.badge}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-3.5">
        <div className="flex size-8 items-center justify-center rounded-full border border-white/10">
          <GitBranch className="size-3.5 text-neutral-500" strokeWidth={2} />
        </div>
        <p className="text-sm text-neutral-500">Git stays the source of truth</p>
      </div>
    </div>
  )
}

export function EditorialFlowMockup() {
  if (EDITORIAL_FLOW_MOCKUP_VARIANT === 'board') {
    return <EditorialBoardMockup />
  }
  return <EditorialFlowTimelineMockup />
}

export { EditorialBoardMockup } from './editorial-board-mockup'
