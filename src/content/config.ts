import { capitalize } from '@utils/misc'
import { defineCollection, reference, z } from 'astro:content'

const article = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      featured: z.object({
        image: image().refine(
          (val) => val.width <= 1920,
          'Featured image width must be less than 1920 pixels.'
        ),
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
      published: z
        .string()
        .date()
        .transform((val) => new Date(val)),
      modified: z
        .string()
        .date()
        .transform((val) => new Date(val))
        .optional(),
      author: reference('author'),
      popular: z.boolean().optional(),
      category: z
        .string()
        .default('uncategorized')
        .transform((val) => capitalize(val)),
      tags: z.array(z.string().transform((val) => capitalize(val))),
    }),
})

const author = defineCollection({
  type: 'data',
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
  type: 'data',
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

export const collections = { article, author, site }
