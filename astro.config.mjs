import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { unified } from '@astrojs/markdown-remark'
import {
  rehypeCode,
  remarkCodeTab,
  remarkHeading,
  remarkNpm,
  remarkStructure,
} from 'fumadocs-core/mdx-plugins'

const remarkPlugins = [
  remarkHeading,
  remarkCodeTab,
  remarkNpm,
  [remarkStructure, { exportAs: 'structuredData' }],
]
const rehypePlugins = [rehypeCode]

export default defineConfig({
  site: 'https://gitcms.dev',
  output: 'static',
  markdown: {
    processor: unified({
      syntaxHighlight: false,
      remarkPlugins,
      rehypePlugins,
    }),
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/$/, '')
        return pathname !== '/blog/git-based-cms-vs-db-based-cms'
          && !pathname.startsWith('/redesign')
          && !pathname.endsWith('.md')
          && !pathname.endsWith('.txt')
          && !pathname.endsWith('.png')
      },
    }),
    react(),
    mdx({
      extendMarkdownConfig: true,
      syntaxHighlight: false,
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
