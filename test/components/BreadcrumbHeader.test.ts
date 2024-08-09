import BreadcrumbHeader from "@components/BreadcrumbHeader.astro"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { beforeAll, describe, expect, test } from "vitest"

type RenderOptions = { tail?: string; className?: string }

describe("BreadcrumbHeader", () => {
  let header: string

  beforeAll(async () => {
    header = await render()
  })

  const render = async ({ tail, className }: RenderOptions = {}) => {
    const container = await AstroContainer.create()
    return await container.renderToString(BreadcrumbHeader, {
      props: {
        head: {
          name: "Head",
          path: "/head",
        },
        tail: tail,
        class: className,
      },
    })
  }
  test("that it contains correct tags", async () => {
    expect(header).toContain("</header")
    expect(header).toContain("</ol>")
    expect(header).toContain("</li>")
  })

  test("that it contains the header without a link", async () => {
    expect(header).toContain("<li>Head</li>")
    expect(header).not.toContain("</a>")
  })

  test("that it contains a link with a tail", async () => {
    const result = await render({ tail: "Tail" })
    expect(result).toContain("Head</a>")
    expect(result).toContain("<li>Tail</li>")
  })

  test("that class is set", async () => {
    const result = await render({ className: "test-class" })
    expect(result).toContain("test-class")
  })
})
