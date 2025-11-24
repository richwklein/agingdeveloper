import { capitalize } from '@utils/misc'
import { file, glob } from 'astro/loaders' // Not available with legacy API
import { defineCollection, reference, z } from 'astro:content'

const article = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: 'src/content/article',
    generateId: ({ entry }) => {
      // remove the index.mdx and replace slashes with dashes
      return entry.replace(/\/index\.mdx$/, '').replace(/\//g, '-')
    },
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: reference('author'),
      featured: z.object({
        image: image(),
        author: z
          .object({
            name: z.string(),
            url: z.string(),
          })
          .optional(),
        site: z
          .object({
            name: z.string(),
            url: z.string(),
          })
          .optional(),
      }),
      popular: z.boolean().optional(),
      enhanced: z.boolean().optional().default(true),
      tags: z.array(z.string().transform((val) => capitalize(val))),
      category: z
        .string()
        .default('uncategorized')
        .transform((val) => capitalize(val)),
      published: z
        .string()
        .date()
        .transform((val) => new Date(val)),
      modified: z
        .string()
        .date()
        .transform((val) => new Date(val))
        .optional(),
      license: z
        .object({
          name: z.string(),
          url: z.string().url(),
          short: z.string().optional(),
          icon: z.string().optional(),
        })
        .optional(),
    }),
})

const author = defineCollection({
  loader: file('src/content/data/author.json'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      givenName: z.string(),
      familyName: z.string(),
      email: z.string().email(),
      avatar: image(),
      tagline: z.string(),
      bio: z.string(),
      twitterUsername: z.string().optional(),
      socials: z
        .array(
          z.object({
            name: z.string(),
            url: z.string().url(),
          })
        )
        .optional(),
      published: z
        .string()
        .date()
        .transform((val) => new Date(val)),
      modified: z
        .string()
        .date()
        .transform((val) => new Date(val))
        .optional(),
    }),
})

const site = defineCollection({
  loader: file('src/content/data/site.json'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string(),
      category: z.string(),
      origin: z.string(),
      repository: z.string(),
      avatar: image(),
      icon: image(),
      background: z.string(),
      theme: z.string(),
      displayLimit: z.number(),
    }),
})

const quote = defineCollection({
  loader: file('src/content/data/quote.json'),
  schema: () =>
    z.object({
      text: z.string().min(1, 'Quote text cannot be empty'),
      author: z.string().min(1, 'Author name cannot be empty').default('Anonymous'),
      chalked: z
        .string()
        .date()
        .transform((val) => new Date(val)),
      source: z
        .object({
          title: z.string(),
          type: z.enum(['book', 'movie', 'song', 'speech', 'letter', 'show', 'play', 'other']),
          year: z.number().optional(),
        })
        .optional(),
    }),
})

export const collections = { article, author, site, quote }
