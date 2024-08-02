import BreadcrumbHeader from "@components/BreadcrumbHeader.astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, test } from "vitest";

describe("BreadcrumbHeader", () => {
  const render = async () => {
    const container = await AstroContainer.create();
    return container.renderToString(BreadcrumbHeader, {
      props: {
        head: { name: "Test", path: "/test" },
        tail: "end",
      },
    });
  };

  test("that it renders correctly.", async () => {
    const result = await render();
    expect(result).toMatchSnapshot();
  });
});
