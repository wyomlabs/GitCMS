import { Link } from '@/lib/router'
import { frameworkList } from '@/lib/framework-data'

export function FrameworkCompatibilitySection() {
  return (
    <section
      id="frameworks"
      className="border-y border-neutral-100 bg-neutral-50 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl text-center">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
          Your stack stays yours
        </p>
        <h2 className="mt-4 font-logo text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
          Keep the framework you already chose.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-500 sm:text-lg">
          GitCMS adds visual editing, review, and publishing without asking you
          to rebuild the site or change how it is hosted.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 border-y border-neutral-200 py-10 sm:gap-x-12">
          {frameworkList.map((framework) => (
            <Link
              key={framework.slug}
              to="/git-based-cms-for-{$framework}"
              params={{ framework: framework.slug }}
              className="group flex items-center gap-2.5 text-base font-medium text-neutral-500 transition-colors hover:text-neutral-900"
            >
              <img
                src={framework.logo}
                alt=""
                aria-hidden="true"
                className="size-7 object-contain transition-transform group-hover:scale-110"
              />
              <span>{framework.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
