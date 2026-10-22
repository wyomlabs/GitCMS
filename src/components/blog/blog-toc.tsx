'use client'

import { useCallback, useRef, useState } from 'react'
import {
  AnchorProvider,
  ScrollProvider,
  TOCItem,
  useActiveAnchor,
} from 'fumadocs-core/toc'
import { Check, Facebook, Link2, Linkedin } from 'lucide-react'
import { cn } from '@/lib/utils'

type SerializedTOCItem = { title: string; url: string; depth: number }

type BlogTOCProps = {
  toc: Array<SerializedTOCItem>
  shareTitle?: string
}

function TOCLink({ item }: { item: SerializedTOCItem }) {
  const active = useActiveAnchor()
  const isActive = active === item.url.slice(1)

  return (
    <TOCItem
      href={item.url}
      className={cn(
        'block border-l-2 py-1.5 text-sm leading-snug transition-colors',
        item.depth === 3 ? 'pl-7' : 'pl-4',
        isActive
          ? 'border-neutral-900 font-medium text-neutral-900'
          : 'border-transparent text-neutral-500 hover:text-neutral-700',
      )}
    >
      {item.title}
    </TOCItem>
  )
}

const ICON_BUTTON =
  'flex size-8 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700'

function getCleanUrl() {
  const url = new URL(window.location.href)
  url.hash = ''
  return url.toString()
}

function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(getCleanUrl()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  const openShare = useCallback(
    (buildUrl: (cleanUrl: string, t: string) => string) => {
      window.open(buildUrl(getCleanUrl(), title), '_blank', 'noopener,noreferrer')
    },
    [title],
  )

  return (
    <div className="mt-6 border-t border-neutral-100 pt-5">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-500">
        Share
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Share on X"
          className={ICON_BUTTON}
          onClick={() =>
            openShare(
              (url, t) =>
                `https://x.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(url)}`,
            )
          }
        >
          <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Share on LinkedIn"
          className={ICON_BUTTON}
          onClick={() =>
            openShare(
              (url) =>
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            )
          }
        >
          <Linkedin className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Share on Facebook"
          className={ICON_BUTTON}
          onClick={() =>
            openShare(
              (url) =>
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            )
          }
        >
          <Facebook className="size-4" />
        </button>
        <button
          type="button"
          onClick={copyLink}
          aria-label={copied ? 'Copied' : 'Copy link'}
          className={ICON_BUTTON}
        >
          {copied ? (
            <Check className="size-4 text-green-600" />
          ) : (
            <Link2 className="size-4" />
          )}
        </button>
      </div>
    </div>
  )
}

export function BlogTOCSidebar({ toc, shareTitle }: BlogTOCProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  if (toc.length === 0) return null

  return (
    <AnchorProvider toc={toc}>
      <ScrollProvider containerRef={containerRef}>
        <div className="sticky top-24">
          <div
            ref={containerRef}
            className="h-[calc(100vh-9rem)] overflow-y-auto pe-4 [scrollbar-gutter:stable]"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-500">
              On this page
            </p>
            <nav className="flex flex-col">
              {toc.map((item) => (
                <TOCLink key={item.url} item={item} />
              ))}
            </nav>

            {shareTitle && <ShareButtons title={shareTitle} />}
          </div>
        </div>
      </ScrollProvider>
    </AnchorProvider>
  )
}
