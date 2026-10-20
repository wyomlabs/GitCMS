import { useState } from 'react'
import { PRODUCT_DEFINITION } from '@/lib/positioning'

export const homepageFaqs = [
  {
    question: 'What is GitCMS?',
    answer: PRODUCT_DEFINITION,
  },
  {
    question: 'My site was built with Claude Code, Codex, or Cursor. Can my team edit it?',
    answer:
      'Yes, if the site lives in a Git repository and loads its editable content from Markdown or MDX: pages, posts, docs, changelogs, and similar collections. If copy is hardcoded inside components, ask your coding agent to move it into a collection. GitCMS gives you a copy-paste setup prompt for exactly that.',
  },
  {
    question: 'Do I need to know Git or Markdown to use GitCMS?',
    answer:
      'No. Marketers, writers, and clients edit visually and move work through drafts, review, and publishing. Git stays underneath as the source of truth, but nobody has to deal with branches or pull requests.',
  },
  {
    question: 'How do AI agents work with GitCMS?',
    answer:
      'ChatGPT, Claude, and other MCP-compatible agents connect to GitCMS and work inside the same workflow as people. They can draft and edit content with your site’s collections, fields, and writing instructions as context.',
  },
  {
    question: 'Does GitCMS auto-publish AI-generated changes?',
    answer:
      'Not when your site uses review before publish. Agent work becomes a draft that a person reviews and approves before it goes live. Sites that use direct publish commit saves straight to the default branch, for people and agents alike.',
  },
  {
    question: 'How is GitCMS different from WordPress or Webflow?',
    answer:
      'WordPress and Webflow are the website platform: they host the site and store its content. GitCMS is the admin layer for a website that stays code. Your framework, repository, and hosting stay yours; GitCMS adds the editing, review, and publishing workflow on top.',
  },
  {
    question: 'Can agencies hand client sites off with GitCMS?',
    answer:
      'Yes. Connect the client’s repository, invite the client with access to their site only, and let them handle routine changes while your team keeps the engineering work.',
  },
  {
    question: 'Do we have to migrate content or change hosting?',
    answer:
      'No. GitCMS connects to the repository you already have and commits changes back to it. Your build and hosting deploy those commits as usual.',
  },
  {
    question: 'What happens to my content if I stop using GitCMS?',
    answer:
      'Nothing. Your content is already in your repository as plain files, with full Git history. There is no GitCMS database to export from.',
  },
  {
    question: 'Can I try GitCMS before buying?',
    answer:
      'Yes. Connect a site and explore it in preview mode first. A license enables saving, publishing, and agent access.',
  },
] as const

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <div className="text-sm font-medium uppercase tracking-widest text-[#7c3aed]">
              FAQ
            </div>
            <h2 className="mt-4 font-logo text-4xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="border-t border-neutral-200">
            {homepageFaqs.map((faq, index) => {
              const isOpen = openIndex === index

              return (
                <div
                  key={faq.question}
                  className="border-b border-neutral-200"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-lg font-medium leading-snug text-neutral-900">
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-3xl leading-none text-neutral-500">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-6 pr-10 text-base leading-relaxed text-neutral-500">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
