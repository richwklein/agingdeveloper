import { z, defineCollection, reference } from "astro:content";

const article = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      featured: z.object({
        image: image(),
        author: z.object({
          name: z.string(),
          url: z.string()
        }).optional(),
        site: z.object({
          name: z.string(),
          url: z.string()
        }).optional(),
      }),
      published: z.string().date().transform((val) => new Date(val)),
      modified: z.string().date().transform((val) => new Date(val)).optional(),
      author: reference('author'),
      category: z.string().default("uncategorized"),
      tags: z.array(z.string()),
    }),
});

const author = defineCollection({
  type: "data",
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
      published: z.string().date(),
    }),
});

const site = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string(),
      category: z.string(),
      lang: z.string(),
      repository: z.string(),
      twitterUsername: z.string().optional(),
      avatar: image(),
      icon: image(),
      background: z.string(),
      theme: z.string(),
    }),
});

export const collections = { article, author, site };
