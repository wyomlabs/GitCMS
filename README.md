# gitcms.dev

The website for [GitCMS](https://gitcms.dev), the visual CMS for code-first websites that keeps every edit in Git.

This repository is also GitCMS's own dogfood site. The blog, docs, and changelog here are edited in GitCMS, and each save is a commit in this repository. Browse the history to see what that looks like on a real site.

## Run locally

```sh
pnpm install
pnpm dev
```

The site runs at http://localhost:4321. `pnpm build` writes the static site to `dist/`, and `src/worker.ts` serves it on Cloudflare Workers.

## Layout

- `content/` holds blog posts, docs, changelog entries, comparisons, glossary terms, prompts, and free tool pages as Markdown and MDX.
- `.gitcms/` is the GitCMS configuration for this site.
- `src/` holds the Astro pages, layouts, and React components.

Found a typo or an outdated doc? Open an issue or a pull request.
