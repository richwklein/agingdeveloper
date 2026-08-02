import { capitalize } from '@utils/misc'
import { file, glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection, reference } from 'astro:content'

const article = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: 'content/article',
    generateId: ({ entry }) => {
      // Remove index filenames and flatten the directory path into an id.
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
            url: z.url(),
          })
          .optional(),
        site: z
          .object({
            name: z.string(),
            url: z.url(),
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
      published: z.iso.date().transform((val) => new Date(val)),
      modified: z.iso
        .date()
        .transform((val) => new Date(val))
        .optional(),
      license: z
        .object({
          name: z.string(),
          url: z.url(),
          short: z.string().optional(),
          icon: z.string().optional(),
        })
        .optional(),
    }),
})

const author = defineCollection({
  loader: file('content/data/author.json'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      givenName: z.string(),
      familyName: z.string(),
      email: z.email(),
      avatar: image(),
      tagline: z.string(),
      bio: z.string(),
      twitterUsername: z.string().optional(),
      socials: z
        .array(
          z.object({
            name: z.string(),
            url: z.url(),
          })
        )
        .optional(),
      published: z.iso.date().transform((val) => new Date(val)),
      modified: z.iso
        .date()
        .transform((val) => new Date(val))
        .optional(),
    }),
})

const site = defineCollection({
  loader: file('content/data/site.json'),
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
  loader: file('content/data/quote.json'),
  schema: () =>
    z.object({
      text: z.string().min(1, 'Quote text cannot be empty'),
      author: z.string().min(1, 'Author name cannot be empty').default('Anonymous'),
      chalked: z.iso.date().transform((val) => new Date(val)),
      source: z
        .object({
          title: z.string(),
          type: z.enum([
            'book',
            'movie',
            'song',
            'speech',
            'letter',
            'show',
            'play',
            'magazine',
            'newspaper',
            'other',
          ]),
          year: z.number().optional(),
        })
        .optional(),
    }),
})

export const collections = { article, author, site, quote }
