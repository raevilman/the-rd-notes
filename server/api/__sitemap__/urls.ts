import { defineEventHandler } from 'h3'
import { queryCollection as _queryCollection } from '#imports'

export default defineEventHandler(async (event) => {
  // Only include published content in sitemap
  const queryCollection = _queryCollection as any
  const items = await queryCollection(event, 'content')
    .where('is_published', '=', true)
    .select('path', 'date_created', 'date_modified')
    .all()

  return items.map((c: any) => ({
    loc: c.path || '/',
    lastmod: c.date_modified || c.date_created,
  }))
})
