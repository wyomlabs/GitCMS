import * as React from 'react'
import { Bot, Check, Copy, Megaphone, Sparkles, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { GitCMSLogo } from '@/components/gitcms-logo'
import { getAgenticOnboardingPrompt } from './agentic-onboarding-prompt'

type BuilderAgent = {
  label: string
  logoPath: string
}

const builderAgents: Array<BuilderAgent> = [
  { label: 'Claude Code', logoPath: '/ai-logos/claude-orange.svg' },
  { label: 'Codex', logoPath: '/ai-logos/openai-bw.svg' },
  { label: 'Cursor', logoPath: '/ai-logos/cursor.svg' },
  { label: 'Lovable', logoPath: '/ai-logos/lovable.svg' },
  { label: 'Bolt', logoPath: '/ai-logos/bolt.svg' },
]

const inboundFlowPaths = [
  { path: 'M100 0 C100 80 320 80 500 150', color: '#fb923c' },
  { path: 'M300 0 C300 75 410 95 500 150', color: '#d4d4d4' },
  { path: 'M500 0 L500 150', color: '#b5d74e' },
  { path: 'M700 0 C700 75 590 95 500 150', color: '#e879f9' },
  { path: 'M900 0 C900 80 680 80 500 150', color: '#93c5fd' },
]

const actorToGitCMSFlowPaths = [
  'M130 140 C130 30 450 55 450 0',
  'M450 140 L450 0',
  'M770 140 C770 30 450 55 450 0',
]

const onboardingPrompt = getAgenticOnboardingPrompt(undefined)

export function HeroControlPlaneVisual() {
  const [isCopied, setIsCopied] = React.useState(false)
  const copyResetTimeoutRef = React.useRef<number | null>(null)

  const clearCopyResetTimeout = React.useCallback(() => {
    if (copyResetTimeoutRef.current === null) return
    window.clearTimeout(copyResetTimeoutRef.current)
    copyResetTimeoutRef.current = null
  }, [])

  const handleCopyPrompt = React.useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return

    void navigator.clipboard.writeText(onboardingPrompt).then(() => {
      clearCopyResetTimeout()
      setIsCopied(true)
      copyResetTimeoutRef.current = window.setTimeout(() => {
        setIsCopied(false)
        copyResetTimeoutRef.current = null
      }, 1800)
    })
  }, [clearCopyResetTimeout])

  React.useEffect(() => {
    return () => clearCopyResetTimeout()
  }, [clearCopyResetTimeout])

  return (
    <div className="mx-auto w-full max-w-[760px]">
      <div className="grid grid-cols-5 gap-2 sm:gap-4">
        {builderAgents.map((agent) => (
          <div
            key={agent.label}
            className="flex min-w-0 flex-col items-center gap-2 text-center"
          >
            <img
              src={agent.logoPath}
              alt=""
              aria-hidden="true"
              className="size-7 object-contain sm:size-8"
            />
            <span className="truncate text-[10px] font-medium text-neutral-700 sm:text-xs">
              {agent.label}
            </span>
          </div>
        ))}
      </div>

      <svg
        viewBox="0 0 1000 150"
        aria-hidden="true"
        className="h-16 w-full sm:h-20"
        preserveAspectRatio="none"
      >
        <path
          d="M100 0 C100 80 320 80 500 150"
          fill="none"
          stroke="#fb923c"
          strokeWidth="2"
          opacity="0.65"
        />
        <path
          d="M300 0 C300 75 410 95 500 150"
          fill="none"
          stroke="#d4d4d4"
          strokeWidth="2"
        />
        <path
          d="M500 0 L500 150"
          fill="none"
          stroke="#b5d74e"
          strokeWidth="2"
          opacity="0.8"
        />
        <path
          d="M700 0 C700 75 590 95 500 150"
          fill="none"
          stroke="#e879f9"
          strokeWidth="2"
          opacity="0.55"
        />
        <path
          d="M900 0 C900 80 680 80 500 150"
          fill="none"
          stroke="#93c5fd"
          strokeWidth="2"
          opacity="0.7"
        />
        {inboundFlowPaths.map(({ path, color }) => (
          <path
            key={path}
            d={path}
            pathLength="100"
            fill="none"
            color={color}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="hero-flow-path hero-flow-path--inbound"
          />
        ))}
      </svg>

      <button
        type="button"
        onClick={handleCopyPrompt}
        aria-label="Add GitCMS to this website — copy setup prompt"
        data-umami-event="landing_agentic_onboarding_clicked"
        data-umami-event-action="copy_prompt_hero"
        className="group flex w-full items-center rounded-full border border-[#b5d74e]/70 bg-white px-4 py-3 text-left shadow-[0_10px_35px_-24px_rgba(132,204,22,0.8)] transition-all hover:border-[#9fc23f] hover:shadow-[0_14px_40px_-24px_rgba(132,204,22,0.95)] sm:px-6 sm:py-4"
      >
        <Sparkles className="size-4 shrink-0 text-violet-500 sm:size-5" />
        <span className="ml-3 min-w-0 flex-1 truncate text-sm font-semibold text-neutral-900 sm:text-base">
          Add GitCMS to this website.
        </span>
        <span className="mx-3 h-7 w-px bg-neutral-200 sm:mx-5" />
        <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-neutral-500 transition-colors group-hover:text-neutral-900 sm:text-sm">
          {isCopied ? (
            <Check className="size-4 text-green-600" />
          ) : (
            <Copy className="size-4" />
          )}
          <span className="hidden sm:inline">
            {isCopied ? 'Copied' : 'Copy prompt'}
          </span>
        </span>
      </button>

      <div className="flex h-12 justify-center">
        <div className="hero-flow-spine h-full w-px bg-[#b5d74e]" />
      </div>

      <div className="relative flex flex-col items-center text-center">
        <GitCMSLogo className="size-14 sm:size-16" />
        <div className="mt-2 font-logo text-3xl font-medium tracking-tight sm:text-4xl">
          GitCMS
        </div>
        <p className="mt-1 text-sm text-neutral-500 sm:text-base">
          Edit &middot; Review &middot; Publish
        </p>

        <div className="absolute left-[calc(50%+88px)] top-12 hidden items-center sm:flex lg:left-[calc(50%+108px)]">
          <span className="h-px w-10 bg-[#b5d74e] lg:w-16" />
          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
            <Check className="size-4" />
            Published
          </span>
        </div>
      </div>

      <div className="relative h-16 sm:h-20">
        <svg
          viewBox="0 0 900 140"
          aria-hidden="true"
          className="absolute inset-0 size-full"
          preserveAspectRatio="none"
        >
          <path
            d="M450 0 C450 55 130 30 130 140"
            fill="none"
            stroke="#b5d74e"
            strokeWidth="2"
          />
          <path
            d="M450 0 L450 140"
            fill="none"
            stroke="#b5d74e"
            strokeWidth="2"
          />
          <path
            d="M450 0 C450 55 770 30 770 140"
            fill="none"
            stroke="#b5d74e"
            strokeWidth="2"
          />
          {actorToGitCMSFlowPaths.map((path) => (
            <path
              key={path}
              d={path}
              pathLength="100"
              fill="none"
              color="#b5d74e"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="hero-flow-path hero-flow-path--actors"
            />
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-8">
        <HeroActor
          icon={Megaphone}
          label="Marketing"
          action="Updates pages"
          tone="peach"
        />
        <HeroActor
          icon={UserRound}
          label="Client"
          action="Reviews changes"
          tone="blue"
        />
        <HeroActor
          icon={Bot}
          label="AI agent"
          action="Suggests edits"
          tone="violet"
        />
      </div>
    </div>
  )
}

function HeroActor({
  icon: Icon,
  label,
  action,
  tone,
}: {
  icon: LucideIcon
  label: string
  action: string
  tone: 'peach' | 'blue' | 'violet'
}) {
  const toneClass = {
    peach: 'bg-orange-50 text-orange-950',
    blue: 'bg-blue-50 text-blue-950',
    violet: 'bg-violet-50 text-violet-950',
  }[tone]
  const iconClass = {
    peach: 'bg-orange-100 text-orange-700',
    blue: 'bg-blue-100 text-blue-700',
    violet: 'bg-violet-100 text-violet-700',
  }[tone]

  return (
    <div className="flex min-w-0 flex-col items-center text-center">
      <div
        className={`flex size-12 items-center justify-center rounded-full ring-4 ring-white sm:size-16 ${iconClass}`}
      >
        <Icon className="size-6 sm:size-8" />
      </div>
      <span
        className={`mt-3 rounded-full px-2.5 py-1 text-[10px] font-semibold sm:px-4 sm:text-sm ${toneClass}`}
      >
        {label}
      </span>
      <span className="mt-1 hidden text-xs text-neutral-500 sm:block sm:text-sm">
        {action}
      </span>
    </div>
  )
}
