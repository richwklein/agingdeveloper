import OpenGraphCore from "@components/seo/OpenGraphCore.astro"
import { getSite } from "@utils/site"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import type { CollectionEntry } from "astro:content"
import { beforeAll, describe, expect, test } from "vitest"

type RenderOptions = { type?: string; path?: string }

describe("OpenGraphCore", () => {
  let site: CollectionEntry<"site">
  let headers: string | undefined

  beforeAll(async () => {
    site = await getSite()
    headers = await render()
  })

  const render = async ({ type = "website", path }: RenderOptions = {}) => {
    const container = await AstroContainer.create()
    return await container.renderToString(OpenGraphCore, {
      props: {
        title: "Title",
        description: "Description",
        path: path,
        type: type,
        site: site,
      },
    })
  }

  test("that it contains an open graph type", async () => {
    expect(headers).toContain('meta property="og:type" content="website"')
  })

  test("that it contains an open graph url", async () => {
    const baseUrl = import.meta.env.SITE
    expect(headers).toContain(`meta property="og:url" content="${baseUrl}"`)
  })

  test("that it contains an open graph title", async () => {
    expect(headers).toContain('meta property="og:title" content="Title"')
  })

  test("that it contains an open graph description", async () => {
    expect(headers).toContain('meta property="og:description" content="Description"')
  })

  test("that it contains an open graph site_name", async () => {
    expect(headers).toContain(`meta property="og:site_name" content="${site.data.title}"`)
  })

  test("that it contains an open graph locale", async () => {
    expect(headers).toContain(`meta property="og:locale" content="${site.data.lang}"`)
  })

  test("that it can take an article type", async () => {
    const result = await render({ type: "article" })
    expect(result).toContain('meta property="og:type" content="article"')
  })

  test("that it can take a profile type", async () => {
    const result = await render({ type: "profile" })
    expect(result).toContain('meta property="og:type" content="profile"')
  })

  test("that it can take a path", async () => {
    const result = await render({ path: "/article" })
    const baseUrl = import.meta.env.SITE
    expect(result).toContain(`meta property="og:url" content="${baseUrl}/article"`)
  })
})
