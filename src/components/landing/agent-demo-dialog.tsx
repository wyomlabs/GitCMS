import { Play } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type AgentDemoDialogTheme = 'light' | 'purple'

const triggerThemeClass: Record<AgentDemoDialogTheme, string> = {
  light:
    'border-neutral-300 bg-white/70 text-neutral-900 backdrop-blur-sm hover:bg-white',
  purple: 'border-white/35 bg-white/10 text-white hover:bg-white/15',
}

export function AgentDemoDialog({
  theme = 'purple',
}: {
  theme?: AgentDemoDialogTheme
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          data-umami-event="landing_agent_demo_opened"
          className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${triggerThemeClass[theme]}`}
        >
          Watch demo
          <Play className="size-3.5 fill-current" aria-hidden="true" />
        </button>
      </DialogTrigger>

      <DialogContent className="gap-0 overflow-hidden border-white/15 bg-neutral-950 p-0 text-white shadow-2xl sm:max-w-3xl [&_[data-slot=dialog-close]]:rounded-full [&_[data-slot=dialog-close]]:bg-black/65 [&_[data-slot=dialog-close]]:p-2 [&_[data-slot=dialog-close]]:text-white">
        <DialogTitle className="sr-only">GitCMS agent workflow demo</DialogTitle>
        <DialogDescription className="sr-only">
          A short demonstration of an AI agent creating content changes for
          review in GitCMS.
        </DialogDescription>
        <video
          src="/videos/landing/mcp-claude-workflow-4x3.mp4"
          aria-label="GitCMS agent workflow demo"
          className="aspect-[4/3] w-full bg-black object-cover"
          controls
          autoPlay
          playsInline
          preload="metadata"
        />
      </DialogContent>
    </Dialog>
  )
}
