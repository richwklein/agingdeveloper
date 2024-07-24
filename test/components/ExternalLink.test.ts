import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import ExternalLink from '../../src/components/ExternalLink.astro';

describe("ExternalLink", () => {

  const render = async () => {
    const container = await AstroContainer.create();
    return container.renderToString(ExternalLink, {
      slots: { default: "Test Content" },
      props: { to: "https://example.com" }
    });
  };

  test("that it renders correctly.", async () => {
    const result = await render();
    expect(result).toMatchSnapshot();
  });

  test("that it has a data-link of external.", async () => {
    const result = await render();
    expect(result).toContain("data-link=\"external\"");
  });

  test("that it has a new window target.", async () => {
    const result = await render();
    expect(result).toContain("target=\"_blank\"");
  });

  test("that it has a noopener and noreferrer.", async () => {
    const result = await render();
    expect(result).toContain("rel=\"noopener noreferrer\"");
  });

  test.todo("passing an additional attribute");
});
