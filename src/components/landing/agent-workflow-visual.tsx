import { Check, FileText, ShieldCheck, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'

type ContentAgent = {
  name: string
  logoPath: string
  logoClassName?: string
}

const contentAgents: Array<ContentAgent> = [
  { name: 'ChatGPT', logoPath: '/ai-logos/openai-bw.svg' },
  { name: 'Claude', logoPath: '/ai-logos/claude-orange.svg' },
  { name: 'OpenClaw', logoPath: '/ai-logos/openclaw.svg' },
  { name: 'Hermes', logoPath: '/ai-logos/hermes.svg' },
  {
    name: 'Grok Bot',
    logoPath: '/ai-logos/grok-bot.svg',
    logoClassName: 'rounded-md',
  },
]

export function AgentWorkflowVisual() {
  return (
    <div className="mx-auto w-full max-w-[680px]">
      <p className="text-center font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/40 sm:text-xs">
        Use the agents you already know
      </p>

      <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-5">
        {contentAgents.map((agent) => (
          <div
            key={agent.name}
            className="group flex min-w-0 flex-col items-center gap-2 text-center"
          >
            <div className="flex size-11 items-center justify-center rounded-xl border border-white/80 bg-white shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5 sm:size-14">
              <img
                src={agent.logoPath}
                alt=""
                aria-hidden="true"
                className={`size-6 object-contain sm:size-7 ${agent.logoClassName ?? ''}`}
              />
            </div>
            <span className="truncate text-[10px] font-medium text-white/60 sm:text-xs">
              {agent.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mx-auto h-12 w-px bg-gradient-to-b from-white/25 to-[#DCF986]" />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-sm font-semibold text-white">Homepage update</p>
            <p className="mt-0.5 text-xs text-white/60">One shared content task</p>
          </div>
          <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
            In review
          </span>
        </div>

        <div className="divide-y divide-white/10 px-5 sm:px-6">
          <WorkflowStep
            icon={<FileText className="size-4" />}
            title="An agent proposed new launch copy"
            detail="Draft and page changes are ready to inspect"
            tone="violet"
          />
          <WorkflowStep
            icon={<UserRound className="size-4" />}
            title="Marketing refined the message"
            detail="Feedback and edits stay with the task"
            tone="blue"
          />
          <WorkflowStep
            icon={<Check className="size-4" />}
            title="A reviewer approved the update"
            detail="The website is ready to publish"
            tone="green"
          />
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-white/[0.03] px-5 py-4 sm:px-6">
          <span className="inline-flex items-center gap-2 text-xs text-white/50 sm:text-sm">
            <ShieldCheck className="size-4 text-[#DCF986]" />
            People stay in control
          </span>
          <span className="rounded-lg bg-[#DCF986] px-3 py-2 text-xs font-semibold text-neutral-950 sm:px-4 sm:text-sm">
            Ready to publish
          </span>
        </div>
      </div>
    </div>
  )
}

function WorkflowStep({
  icon,
  title,
  detail,
  tone,
}: {
  icon: ReactNode
  title: string
  detail: string
  tone: 'violet' | 'blue' | 'green'
}) {
  const toneClass = {
    violet: 'bg-violet-400/10 text-violet-300',
    blue: 'bg-blue-400/10 text-blue-300',
    green: 'bg-[#DCF986]/10 text-[#DCF986]',
  }[tone]

  return (
    <div className="flex items-center gap-3 py-4 sm:gap-4">
      <span
        className={`flex size-9 shrink-0 items-center justify-center rounded-full ${toneClass}`}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-white/60">
          {detail}
        </p>
      </div>
    </div>
  )
}
