import { ArrowRight } from 'lucide-react'
import { Link } from '@/lib/router'
import { featuredPersonaList } from './persona-content'

export function PersonaPickerSection({
  title = 'Who is GitCMS for?',
  description = 'Start with the one that sounds most like how you work.',
  showEyebrow = true,
}: {
  title?: string
  description?: string
  showEyebrow?: boolean
}) {
  return (
    <section
      id="for"
      className="border-y border-neutral-100 bg-neutral-50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          {showEyebrow ? (
            <div className="text-sm font-medium uppercase tracking-widest text-violet-700">
              Who It&apos;s For
            </div>
          ) : null}
          <h2 className="mt-4 font-logo text-3xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {featuredPersonaList.map((persona, index) => (
            <Link
              key={persona.slug}
              to={persona.path}
              className="group relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-xl"
            >
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-400">
                    0{index + 1}
                  </span>
                  <div className="flex size-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 transition-colors group-hover:border-neutral-400 group-hover:text-neutral-600">
                    <ArrowRight className="size-4" />
                  </div>
                </div>

                <h3 className="mt-8 font-logo text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
                  {persona.name}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-base">
                  {persona.shortDescription}
                </p>

                <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-900">
                  See how GitCMS helps {persona.name.toLowerCase()}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
