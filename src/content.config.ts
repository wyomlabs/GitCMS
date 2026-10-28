import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const dateSchema = z.preprocess(
  (value) => value instanceof Date ? value.toISOString().split('T')[0] : value,
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
)

const blogCategories = ['guides', 'engineering', 'content-strategy'] as const

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: dateSchema,
    updatedDate: dateSchema.optional(),
    category: z.enum(blogCategories),
    authors: z.array(z.string()),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
    draft: z.boolean().optional(),
  }),
})

const changelog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/changelog' }),
  schema: z.object({
    title: z.string(),
    version: z.string(),
    date: dateSchema,
    description: z.string().optional(),
  }),
})

const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/comparisons' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    competitor: z.string(),
    category: z.string(),
    // Closing call-to-action line, shown in the page's CTA band.
    cta: z.string().optional(),
    lastReviewed: dateSchema,
    order: z.number().int().optional(),
  }),
})

// "X alternatives" pages: options by situation for people leaving a tool.
// The slug is the competitor's, matching `/compare/gitcms-vs-<slug>/`.
const alternatives = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/alternatives' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    competitor: z.string(),
    cta: z.string().optional(),
    lastReviewed: dateSchema,
    order: z.number().int().optional(),
  }),
})

const glossaryCategories = [
  'building',
  'rendering',
  'content',
  'git',
  'cms',
  'agents',
  'seo',
  'deploy',
  'operations',
] as const

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/glossary' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(glossaryCategories),
    definition: z.string(),
    description: z.string(),
    related: z.array(z.string()).optional(),
    lastReviewed: dateSchema,
  }),
})

const promptCategories = ['handoff', 'content', 'seo', 'migration'] as const

const prompts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/prompts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(promptCategories),
    agents: z.array(z.string()),
    order: z.number().int().optional(),
    lastReviewed: dateSchema,
  }),
})

// Interactive surfaces a tool page can show above its copy. Embedded tools
// are framed from the app (`/embed/v1/tools/<slug>`); `github-repo` opens a
// public repository in the app's repo viewer.
export const toolSurfaces = [
  'markdown-editor',
  'agents-md-editor',
  'claude-md-editor',
  'image-compressor',
  'github-repo',
] as const

const tools = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/tools' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tool: z.enum(toolSurfaces),
    order: z.number().int().optional(),
  }),
})

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
})

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
  }),
})

const docsMeta = defineCollection({
  loader: glob({ pattern: '**/*.{json,yaml,yml}', base: './content/docs' }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    pages: z.array(z.string()).optional(),
    icon: z.string().optional(),
  }),
})

export const collections = {
  blog,
  changelog,
  comparisons,
  alternatives,
  glossary,
  prompts,
  tools,
  pages,
  docs,
  docsMeta,
}
