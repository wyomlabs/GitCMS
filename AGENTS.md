# gitcms.dev

This repository is the public website for [GitCMS](https://gitcms.dev): marketing pages, blog, docs, changelog, comparisons, glossary, prompts, and free tools. It is an Astro static site served by a small Cloudflare Worker. GitCMS edits this repository as its own dogfood site, so content changes usually arrive as GitCMS commits.

## Commands

- `pnpm install`
- `pnpm dev` starts the site at http://localhost:4321.
- `pnpm type-check` and `pnpm build` must pass before a change is finished.

Set `PUBLIC_APP_URL` to point product links and tool embeds at a local or preview GitCMS app. It defaults to `https://app.gitcms.dev`.

## Rules

- Content lives in `content/<collection>`; collection schemas are in `src/content.config.ts`. GitCMS reads the matching configuration in `.gitcms/`, so keep the two in sync when you add or change a collection or frontmatter field.
- Prefer prerendered Astro pages and hydrate React only where interaction requires it.
- This site has no auth, database, or billing. Product CTAs point at the app (`PUBLIC_APP_URL`).
- `src/worker.ts` serves static assets, redirects legacy `/:owner/:repo` links to the app, and serves `404.html` for any other miss. It also adds `noindex` and canonical headers to `.md` copies and `llms.txt`, answers `Accept: text/markdown` page requests with the page's `.md` copy, and sets the homepage's discovery `Link` header. `run_worker_first` in `wrangler.jsonc` routes everything except static asset folders through it; add new asset folders there too. Agent discovery documents (`/.well-known/api-catalog`, `ai-catalog.json`, `agent-skills/`) are built from `src/lib/agent-discovery.ts`; the MCP Server Card itself is served by the MCP Worker. `src/middleware.ts` applies the same redirect during `astro dev`, which doesn't run the worker. Keep pages asset-first, and add new top-level sections and public folders to the reserved segments in `src/lib/legacy-repo-redirect.ts`.
- Pages are served at `<path>/` (`trailingSlash: 'always'`), so write internal links with the trailing slash: `/docs/quick-start/`, `/agents/${slug}/`. Markdown and MDX links get it from `src/lib/rehype-trailing-slash.ts`. Canonicals come from `Astro.url`; don't pass page paths to layouts.
- `astro dev` doesn't apply `public/_redirects` or run `src/worker.ts`. To check redirects, 404s and headers as production serves them, run `pnpm preview:cf` (builds, then serves the Worker at http://localhost:8799).
- Cloudflare Workers Builds deploys the `gitcms-site` Worker: `main` goes to production at gitcms.dev, and other branches get preview URLs. GitHub Actions only runs checks (`.github/workflows/ci.yml`).
- Redirects for moved pages go in `public/_redirects`, static rules above splat rules, targets with the trailing slash.
- Free tool pages are the `tools` collection. Their interactive part is framed from the app at `/embed/v1/tools/<slug>`; the slug must be one the app serves.
- Marketing and content pages use `src/layouts/MarketingLayout.astro` and compose `src/components/site` (Section, SectionHeading, CtaBand, CopyButton, shared classes in `styles.ts`). Product demos live in `src/components/mock`. Use-case pages (`/for-*`) share one template; their copy is `src/lib/use-cases.ts`. Docs keep their own layout (`DocsShell`); don't move them onto MarketingLayout.
- Page and section headings take their typeface from `heading`, `h1`, `h2` and `prose` in `src/components/site/styles.ts`. `HEADING_FONT` there switches every heading between the brand serif and Geist; don't set heading fonts per page.
- Preserve the visual design unless a task asks for a redesign.
- See `CONTENT.md` for writing guidelines.
