import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, test } from "vitest";
import InternalLink from "../../src/components/InternalLink.astro";

describe("InternalLink", () => {
  const render = async () => {
    const container = await AstroContainer.create();
    return container.renderToString(InternalLink, {
      slots: { default: "Test Content" },
      props: { to: "https://example.com" },
    });
  };

  test("that it renders correctly.", async () => {
    const result = await render();
    expect(result).toMatchSnapshot();
  });

  test("that it has a data-link of internal.", async () => {
    const result = await render();
    expect(result).toContain('data-link="internal"');
  });

  test("that it has same window target.", async () => {
    const result = await render();
    expect(result).toContain('target="_self"');
  });

  test.todo("passing an additional attribute");
});
