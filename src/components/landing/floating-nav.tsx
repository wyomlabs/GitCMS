import { useEffect, useState } from 'react'
import { Link } from '@/lib/router'
import { Menu } from 'lucide-react'
import { useSession } from '@/lib/auth-client'
import { startLogin } from '@/lib/start-login'
import { GitCMSLogo } from '@/components/gitcms-logo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function FloatingNav() {
  const [visible, setVisible] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-4 pointer-events-none opacity-0'
      }`}
    >
      <div className="flex w-[min(96vw,780px)] items-center justify-between rounded-2xl border border-black/[0.08] bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-md lg:hidden">
        <Link to="/" className="flex items-center gap-2">
          <GitCMSLogo className="size-7" />
          <span className="font-logo text-2xl font-medium tracking-tight">
            GitCMS
          </span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <a href="#for">Who It&apos;s For</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/agents">Agents</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="#features">Features</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href="#pricing"
                data-umami-event="landing_cta_clicked"
                data-umami-event-cta-variant="jump_to_pricing"
                data-umami-event-cta-target="#pricing"
                data-umami-event-landing-variant="home"
              >
                Pricing
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/docs/$" params={{ _splat: '' }}>Docs</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/blog">Blog</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/changelog">Changelog</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/$page" params={{ page: 'manifesto' }}>Manifesto</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {session?.user ? (
              <DropdownMenuItem asChild>
                <Link
                  to="/" app
                  data-umami-event="landing_cta_clicked"
                  data-umami-event-cta-variant="open_cms"
                  data-umami-event-cta-target="/"
                  data-umami-event-landing-variant="home"
                >
                  Open CMS
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild>
                <button
                  type="button"
                  onClick={() =>
                    startLogin()}
                  data-umami-event="landing_cta_clicked"
                  data-umami-event-cta-variant="get_started"
                  data-umami-event-cta-target="/"
                  data-umami-event-landing-variant="home"
                >
                  Get Started
                </button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden w-[min(96vw,1160px)] items-center justify-between rounded-2xl border border-black/[0.08] bg-white/80 px-8 py-3.5 shadow-sm backdrop-blur-md lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <GitCMSLogo />
          <span className="font-logo text-3xl font-medium tracking-tight">
            GitCMS
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-base text-neutral-600">
          <a
            href="#for"
            className="transition-colors hover:text-neutral-900"
          >
            Who It&apos;s For
          </a>
          <Link
            to="/agents"
            className="transition-colors hover:text-neutral-900"
          >
            Agents
          </Link>
          <a
            href="#features"
            className="transition-colors hover:text-neutral-900"
          >
            Features
          </a>
          <a
            href="#pricing"
            data-umami-event="landing_cta_clicked"
            data-umami-event-cta-variant="jump_to_pricing"
            data-umami-event-cta-target="#pricing"
            data-umami-event-landing-variant="home"
            className="transition-colors hover:text-neutral-900"
          >
            Pricing
          </a>
          <Link
            to="/docs/$"
            params={{ _splat: '' }}
            className="transition-colors hover:text-neutral-900"
          >
            Docs
          </Link>
          <Link
            to="/blog"
            className="transition-colors hover:text-neutral-900"
          >
            Blog
          </Link>
          <Link
            to="/changelog"
            className="transition-colors hover:text-neutral-900"
          >
            Changelog
          </Link>
          <Link
            to="/$page"
            params={{ page: 'manifesto' }}
            className="transition-colors hover:text-neutral-900"
          >
            Manifesto
          </Link>
        </nav>

        {session?.user ? (
          <Link
            to="/" app
            data-umami-event="landing_cta_clicked"
            data-umami-event-cta-variant="open_cms"
            data-umami-event-cta-target="/"
            data-umami-event-landing-variant="home"
            className="shrink-0 whitespace-nowrap rounded-lg bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Open CMS
          </Link>
        ) : (
          <button
            type="button"
            onClick={() =>
              startLogin()}
            data-umami-event="landing_cta_clicked"
            data-umami-event-cta-variant="get_started"
            data-umami-event-cta-target="/"
            data-umami-event-landing-variant="home"
            className="shrink-0 whitespace-nowrap rounded-lg bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Get Started
          </button>
        )}
      </div>
    </nav>
  )
}
