import { cn } from '@/lib/utils'

export const DEMO_VIDEO_URL = '/videos/landing/mcp-claude-workflow-16x9.mp4'

export function DemoVideoEmbed({
  className,
  title = 'GitCMS demo',
}: {
  className?: string
  title?: string
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg',
        className,
      )}
    >
      <div className="aspect-video w-full bg-neutral-950">
        <video
          className="h-full w-full object-cover"
          src={DEMO_VIDEO_URL}
          aria-label={title}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  )
}
