import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { rehypeCode } from 'fumadocs-core/mdx-plugins'
import { rehypeTrailingSlash } from './src/lib/rehype-trailing-slash'

export default defineConfig({
  site: 'https://gitcms.dev',
  output: 'static',
  // Pages build to `<path>/index.html`, which Cloudflare serves at `<path>/`.
  // Canonicals, the sitemap and internal links all use that address.
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: {
    // Shared by Markdown and MDX (`extendMarkdownConfig`). Fumadocs' Shiki
    // highlighter emits the line markup its CodeBlock styles and copies;
    // Astro's own highlighter is off so code isn't highlighted twice.
    syntaxHighlight: false,
    rehypePlugins: [rehypeCode, rehypeTrailingSlash],
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/$/, '')
        return !pathname.startsWith('/redesign')
          && !pathname.endsWith('.md')
          && !pathname.endsWith('.txt')
          && !pathname.endsWith('.png')
      },
    }),
    react(),
    mdx({
      extendMarkdownConfig: true,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // The OG image renderer is a native addon; esbuild cannot bundle `.node`
    // files, so dev must load it from node_modules like the build does.
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
    ssr: {
      external: ['@resvg/resvg-js'],
    },
    server: {
      allowedHosts: ['local.gitcms.dev'],
    },
    preview: {
      allowedHosts: ['local.gitcms.dev'],
    },
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
  },
})
