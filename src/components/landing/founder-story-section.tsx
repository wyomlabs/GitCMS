import { startLogin } from '@/lib/start-login'
import { LICENSE_PRICING } from '@/lib/positioning'

export function FounderStorySection() {
  return (
    <section id="founder-story" className="px-6 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-200 bg-white px-6 py-10 shadow-sm sm:rounded-3xl sm:px-12 sm:py-14 lg:px-16 lg:py-16">
        {/* Avatar + intro */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/images/founder-waishnav-192.webp"
            alt="Waishnav, founder of GitCMS"
            width={192}
            height={192}
            className="size-20 rounded-full border-2 border-neutral-200 object-cover shadow-sm sm:size-24"
          />

          <h2 className="mt-6 font-logo text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
            heyo! it&apos;s{' '}
            <span className="text-[#7c3aed]">waishnav</span>
          </h2>

          <p className="mt-1.5 text-sm text-neutral-400 sm:text-base">
            (founder of GitCMS, and the studio that builds and ships it)
          </p>
        </div>

        {/* Story */}
        <div className="mt-10 space-y-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
          <p>
            our studio does two things: we build our own products, and we ship
            websites for clients. for years, the expensive part of a website
            was{' '}
            <strong className="font-semibold text-neutral-900">the build</strong>. that&apos;s why
            everyone reached for wordpress, webflow, and drag-and-drop
            builders. you traded speed, ownership, and performance for one
            thing: an editor your client could actually use.
          </p>

          <p>
            then the build stopped being the hard part. with{' '}
            <strong className="font-semibold text-neutral-900">
              claude code, codex, and cursor
            </strong>
            , a custom site that used to take a week ships in a day or two.
            designers and growth folks iterate on pages directly in code. it&apos;s
            faster than any builder we&apos;ve used, and the site keeps getting
            better because an agent can keep working on it.
          </p>

          <p>
            honestly? i think drag-and-drop builders are a workaround whose
            reason to exist is gone. but they did one thing we forgot about:{' '}
            <strong className="font-semibold text-neutral-900">
              they gave the client an admin
            </strong>
            .
          </p>

          <p>
            that&apos;s{' '}
            <strong className="font-semibold text-neutral-900">day two</strong>. the week after
            launch, the email arrives: &ldquo;can you change our opening
            hours?&rdquo; marketing wants to publish a case study. an agent
            rewrote twenty pages and someone needs to check them. the fastest
            site you ever shipped quietly turns you into its content operator.
          </p>

          <p>
            gitcms started as my own tool for publishing blogs, docs, and
            changelogs from a repo. it turned out to be the missing piece for
            this new way of building:{' '}
            <strong className="font-semibold text-neutral-900">
              the admin for websites that stay code
            </strong>
            . clients and marketers edit visually. agents draft through the
            same review flow. git stays the source of truth.
          </p>

          <p>
            we run it on our own products and on the sites we hand to our
            clients. that&apos;s the bar: if it isn&apos;t good enough to give
            our own clients, it doesn&apos;t ship.
          </p>

          <p>
            for{' '}
            <strong className="font-semibold text-neutral-900">
              ${LICENSE_PRICING.sitePrice} once
            </strong>
            , not another monthly subscription. if something breaks,
            you&apos;re emailing the people who wrote the code.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <button
            type="button"
            onClick={() =>
              startLogin()}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#B5D74E] bg-[#DCF986] px-8 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#d4f47a] sm:text-base"
          >
            Try it for free
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  )
}
