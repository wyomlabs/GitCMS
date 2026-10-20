export const blogCategories = [
  'guides',
  'engineering',
  'content-strategy',
] as const

export type BlogCategory = (typeof blogCategories)[number]

export const blogCategoryLabels: Record<BlogCategory, string> = {
  guides: 'Guides',
  engineering: 'Engineering',
  'content-strategy': 'Content Strategy',
}
