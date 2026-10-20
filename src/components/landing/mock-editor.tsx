import { useEffect, useRef, useState } from 'react'
import {
  BoldIcon,
  Calendar,
  Code2,
  Code2Icon,
  ComponentIcon,
  GripVertical,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Image,
  ImageIcon,
  ItalicIcon,
  LightbulbIcon,
  Link,
  Link2,
  ListChecks,
  ListIcon,
  ListOrdered,
  ListTodoIcon,
  MinusIcon,
  Quote,
  RadicalIcon,
  StrikethroughIcon,
  Table,
  TableOfContentsIcon,
  Text,
  TypeIcon,
  UnderlineIcon,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

const slashItems = [
  { icon: <TypeIcon className="size-4" />, label: 'Text', shortcut: '' },
  {
    icon: <Heading1Icon className="size-4" />,
    label: 'Heading 1',
    shortcut: '# ',
  },
  {
    icon: <Heading2Icon className="size-4" />,
    label: 'Heading 2',
    shortcut: '## ',
    active: true,
  },
  {
    icon: <Heading3Icon className="size-4" />,
    label: 'Heading 3',
    shortcut: '### ',
  },
  {
    icon: <ListIcon className="size-4" />,
    label: 'Bulleted list',
    shortcut: '- ',
  },
  {
    icon: <ListOrdered className="size-4" />,
    label: 'Numbered list',
    shortcut: '1. ',
  },
  {
    icon: <ListTodoIcon className="size-4" />,
    label: 'To-do list',
    shortcut: '[] ',
  },
  { icon: <Code2 className="size-4" />, label: 'Code Block', shortcut: '```' },
  { icon: <Table className="size-4" />, label: 'Table', shortcut: '' },
  { icon: <Quote className="size-4" />, label: 'Blockquote', shortcut: '" ' },
  {
    icon: <LightbulbIcon className="size-4" />,
    label: 'Callout',
    shortcut: '',
  },
  { icon: <MinusIcon className="size-4" />, label: 'Divider', shortcut: '---' },
  { icon: <ImageIcon className="size-4" />, label: 'Image', shortcut: '![]()' },
  {
    icon: <TableOfContentsIcon className="size-4" />,
    label: 'Table of contents',
    shortcut: '',
  },
  { icon: <RadicalIcon className="size-4" />, label: 'Equation', shortcut: '' },
  {
    icon: <ComponentIcon className="size-4" />,
    label: 'SSG Component',
    shortcut: '',
  },
  { icon: <Link className="size-4" />, label: 'Link', shortcut: '' },
]

function useInView(threshold = 0.4) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function TypewriterText({
  text,
  active,
  delay = 0,
}: {
  text: string
  active: boolean
  delay?: number
}) {
  const [displayed, setDisplayed] = useState('')
  const [showCursor, setShowCursor] = useState(false)

  useEffect(() => {
    if (!active) {
      setDisplayed('')
      setShowCursor(false)
      return
    }

    let cancelled = false
    const startTimeout = setTimeout(() => {
      if (cancelled) return
      setShowCursor(true)
      let i = 0
      const interval = setInterval(() => {
        if (cancelled) return
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
          setTimeout(() => {
            if (!cancelled) setShowCursor(false)
          }, 600)
        }
      }, 40)
      return () => clearInterval(interval)
    }, delay)

    return () => {
      cancelled = true
      clearTimeout(startTimeout)
    }
  }, [active, text, delay])

  return (
    <span>
      {displayed}
      {showCursor && (
        <span className="animate-blink ml-px inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-[#EF4444]" />
      )}
    </span>
  )
}

function SlashMenu({ visible }: { visible: boolean }) {
  return (
    <div
      className={`absolute top-full left-0 z-20 mt-1 w-[280px] rounded-lg border border-border bg-popover shadow-lg transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-2 pointer-events-none opacity-0'
      }`}
    >
      <div className="px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        Basic blocks
      </div>
      <ScrollArea className="h-[260px]">
        <div className="px-1 pb-1">
          {slashItems.slice(0, 12).map((item) => (
            <div
              key={item.label}
              className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm ${
                item.active
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-muted-foreground">{item.icon}</span>
                {item.label}
              </div>
              {item.shortcut && (
                <span className="text-[11px] text-muted-foreground">
                  {item.shortcut}
                </span>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

function FloatingToolbar({ visible }: { visible: boolean }) {
  const buttons = [
    { id: 'bold', icon: <BoldIcon className="size-3.5" />, active: true },
    { id: 'italic', icon: <ItalicIcon className="size-3.5" /> },
    { id: 'underline', icon: <UnderlineIcon className="size-3.5" /> },
    { id: 'strikethrough', icon: <StrikethroughIcon className="size-3.5" /> },
    { id: 'code', icon: <Code2Icon className="size-3.5" /> },
    { id: 'link', icon: <Link className="size-3.5" /> },
  ]

  return (
    <span
      className={`absolute -top-11 left-1/2 z-10 -translate-x-1/2 transition-all duration-200 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-1 pointer-events-none opacity-0'
      }`}
    >
      <span className="flex items-center gap-0.5 rounded-lg border border-border bg-popover px-1.5 py-1 shadow-lg">
        {buttons.map((btn) => (
          <span
            key={btn.id}
            className={`flex size-7 items-center justify-center rounded-md transition-colors ${
              btn.active ? 'bg-accent text-foreground' : 'text-muted-foreground'
            }`}
          >
            {btn.icon}
          </span>
        ))}
      </span>
    </span>
  )
}

function DragHandle({ visible }: { visible: boolean }) {
  return (
    <div
      className={`absolute -left-8 top-1/2 flex -translate-y-1/2 items-center transition-opacity duration-200 ${visible ? 'opacity-40' : 'opacity-0'}`}
    >
      <GripVertical className="size-4 text-muted-foreground" />
    </div>
  )
}

function FieldRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-[100px_minmax(0,1fr)] items-center gap-2 py-1 sm:grid-cols-[130px_minmax(0,1fr)]">
      <div className="flex items-center gap-1.5 px-1">
        <Icon size={14} className="shrink-0 text-muted-foreground" />
        <span className="truncate text-xs text-muted-foreground sm:text-sm">
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}

function TagChip({ label, color }: { label: string; color: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium sm:text-sm ${color}`}
    >
      {label}
    </span>
  )
}

export function MockEditor({
  frameworkName = 'Astro',
}: {
  frameworkName?: string
}) {
  const { ref, inView } = useInView(0.3)
  const [phase, setPhase] = useState(0)
  const frameworkSlug = frameworkName
    .toLowerCase()
    .replaceAll('.', '')
    .replaceAll(' ', '-')

  useEffect(() => {
    if (!inView) return

    const phaseOneTimer = setTimeout(() => setPhase(1), 800)
    const phaseTwoTimer = setTimeout(() => setPhase(2), 2600)
    const phaseThreeTimer = setTimeout(() => setPhase(3), 4800)
    const phaseFourTimer = setTimeout(() => setPhase(4), 7200)
    const phaseFiveTimer = setTimeout(() => setPhase(5), 9500)

    return () => {
      clearTimeout(phaseOneTimer)
      clearTimeout(phaseTwoTimer)
      clearTimeout(phaseThreeTimer)
      clearTimeout(phaseFourTimer)
      clearTimeout(phaseFiveTimer)
    }
  }, [inView])

  return (
    <div
      ref={ref}
      className="force-light w-full max-w-xl overflow-visible rounded-xl border border-border bg-background shadow-2xl"
    >
      {/* Tab bar — mimics the editor top bar */}
      <div className="flex items-center gap-2 rounded-t-[11px] border-b border-border bg-muted/50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="ml-2 text-xs font-medium text-muted-foreground">
          getting-started.md
        </span>
      </div>

      <div className="px-4 pt-4 pb-5 sm:px-6">
        {/* Frontmatter — matches real FrontmatterElement layout */}
        <div className="mb-5 border-b-2 pb-4">
          {/* Title — matches real TitleField: font-heading text-4xl font-bold */}
          <textarea
            readOnly
            aria-label="Article title"
            value={`Getting Started with ${frameworkName}`}
            rows={1}
            className="field-sizing-content w-full min-h-0 resize-none border-0 bg-transparent px-0 py-1 font-heading text-2xl font-bold leading-tight tracking-tight text-foreground outline-none sm:text-3xl"
          />

          {/* Field rows — matches real FieldRow grid layout */}
          <div className="mt-1 space-y-0">
            <FieldRow icon={Calendar} label="Date">
              <div className="flex h-8 items-center rounded-md bg-accent px-3 text-xs text-foreground sm:h-9 sm:text-sm">
                2026-02-21
              </div>
            </FieldRow>

            <FieldRow icon={Text} label="Description">
              <div className="flex h-8 items-center rounded-md bg-accent px-3 text-xs text-foreground sm:h-9 sm:text-sm">
                A quick guide to using {frameworkName} with GitCMS
              </div>
            </FieldRow>

            <FieldRow icon={Image} label="Cover Image">
              <div className="flex h-8 items-center rounded-md bg-accent px-3 text-xs text-foreground/75 sm:h-9 sm:text-sm">
                /posts/{frameworkSlug}-cover.jpg
              </div>
            </FieldRow>

            <FieldRow icon={ListChecks} label="Tags">
              <div className="flex min-h-8 flex-wrap items-center gap-1.5 rounded-md bg-accent px-2 py-1 sm:min-h-9">
                <TagChip
                  label={frameworkSlug}
                  color="bg-blue-100 text-blue-700"
                />
                <TagChip
                  label="getting-started"
                  color="bg-green-100 text-green-700"
                />
                <TagChip
                  label="tutorial"
                  color="bg-purple-100 text-purple-700"
                />
              </div>
            </FieldRow>

            <FieldRow icon={Link2} label="Slug">
              <div className="flex h-8 items-center rounded-md bg-accent px-3 text-xs text-foreground/75 sm:h-9 sm:text-sm">
                getting-started-with-{frameworkSlug}
              </div>
            </FieldRow>
          </div>
        </div>

        {/* Editor body — matches real editor fullWidth variant px/text styles */}
        <div className="space-y-1 text-base">
          {/* h2 — matches real: font-heading text-2xl font-semibold tracking-tight */}
          <div className="group/line relative py-1">
            <DragHandle visible={phase >= 1 && phase < 3} />
            <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              <TypewriterText
                text={`Why ${frameworkName} + GitCMS?`}
                active={phase >= 1}
                delay={0}
              />
            </h2>
          </div>

          {/* paragraph — matches real: m-0 px-0 py-1 */}
          <div className="group/line relative py-1">
            <DragHandle visible={phase >= 2 && phase < 3} />
            <p className="text-sm leading-relaxed text-foreground sm:text-base">
              <TypewriterText
                text={`${frameworkName} content stays in ordinary files in your repository — `}
                active={phase >= 2}
                delay={0}
              />
              {phase >= 4 && (
                <span className="relative inline">
                  <FloatingToolbar visible={phase === 4} />
                  <strong className="font-bold">
                    exactly where they belong
                  </strong>
                </span>
              )}
              {phase >= 4 && '.'}
            </p>
          </div>

          {/* Slash command line */}
          <div className="group/line relative py-1">
            <DragHandle visible={phase >= 3 && phase < 5} />
            <div className="relative">
              {phase >= 3 && phase < 5 ? (
                <span>
                  <span className="text-muted-foreground/80">/</span>
                  <span className="text-foreground">head</span>
                  <span className="animate-blink ml-px inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-[#EF4444]" />
                </span>
              ) : (
                <span className="text-foreground/65 italic">
                  Type / for commands...
                </span>
              )}
              <SlashMenu visible={phase >= 3 && phase < 5} />
            </div>
          </div>

          {/* Blockquote — matches real blockquote styling */}
          <div className="group/line relative py-1">
            <DragHandle visible={false} />
            <blockquote className="border-l-2 border-muted-foreground/20 pl-4 text-sm italic text-muted-foreground sm:text-base">
              "GitCMS turns your repo into a full CMS — no database needed."
            </blockquote>
          </div>

          {/* Callout — matches real: bg-muted p-4 pl-3 rounded-sm */}
          <div className="group/line relative py-1">
            <DragHandle visible={false} />
            <div className="flex gap-2 rounded-sm bg-muted p-3 pl-2.5 sm:p-4 sm:pl-3">
              <span className="select-none text-base sm:text-lg">💡</span>
              <span className="text-sm text-foreground sm:text-base">
                Works with Astro, Next.js, Hugo, and every SSG framework.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
