import { createFromSource } from 'fumadocs-core/search/server'
import { source } from '@/lib/source'

export const prerender = true
export const { staticGET: GET } = createFromSource(source)
