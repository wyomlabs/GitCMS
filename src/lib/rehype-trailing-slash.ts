import type { Element, Root, RootContent } from 'hast'
import { withTrailingSlash } from './trailing-slash'

function visit(node: Root | RootContent, onLink: (element: Element) => void) {
  if (node.type === 'element' && node.tagName === 'a') onLink(node)
  if ('children' in node) for (const child of node.children) visit(child, onLink)
}

/** Adds the trailing slash to internal page links in Markdown and MDX. */
export function rehypeTrailingSlash() {
  return (tree: Root) => {
    visit(tree, (link) => {
      const href = link.properties.href
      if (typeof href === 'string') link.properties.href = withTrailingSlash(href)
    })
  }
}
