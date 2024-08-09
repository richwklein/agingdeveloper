import BackLink from "@components/BackLink.astro"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { beforeAll, describe, expect, test } from "vitest"

type RenderOptions = { useViewText?: boolean; className?: string }

describe("BackLink", () => {
  let link: string

  beforeAll(async () => {
    link = await render()
  })

  const render = async ({ useViewText, className }: RenderOptions = {}) => {
    const container = await AstroContainer.create()
    return await container.renderToString(BackLink, {
      props: {
        name: "Name",
        useViewText: useViewText,
        class: className,
      },
    })
  }
  test("that it contains correct tags", async () => {
    expect(link).toContain("<a")
    expect(link).toContain("<svg")
  })

  test("that it contains the name", async () => {
    expect(link).toContain("view all Name</a>")
  })

  test("that it contains the correct icon", async () => {
    expect(link).toContain('data-icon="mdi:chevron-left"')
  })

  test("that 'view all' can be removed", async () => {
    const result = await render({ useViewText: false })
    expect(result).not.toContain("view all")
    expect(link).toContain("Name</a>")
  })

  test("that class is set", async () => {
    const result = await render({ className: "test-class" })
    expect(result).toContain("test-class")
  })
})
