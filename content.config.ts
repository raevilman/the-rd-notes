import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        slug: z.string().optional(),
        date_created: z.string().optional(),
        date_modified: z.string().optional(),
        author: z.string().optional(),
        is_published: z.boolean().optional().default(true),
        show_in_recent: z.boolean().optional(),
        is_project: z.boolean().optional().default(false),
        tags: z.union([z.array(z.string()), z.string()]).optional()
      })
    })
  }
})


