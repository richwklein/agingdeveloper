import InternalBackLink from '@components/InternalBackLink.astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';

describe("InternalBackButton", async () => {

  const render = async (useViewText = true) => {
    const container = await AstroContainer.create();
    return container.renderToString(InternalBackLink, {
      props: {
        name: "authors",
        path: "/author",
        useViewText: useViewText,
      }
    });
  };

  test("that it renders correctly.", async () => {
    const result = await render();
    expect(result).toMatchSnapshot();
  });

  test("that it contains the text.", async () => {
    const result = await render();
    expect(result).toContain("view all authors");
  });

  test("that it can exclude view all.", async () => {
    const result = await render(false);
    expect(result).not.toContain("view all");
  });

  test("that the icons and href are.", async () => {
    const result = await render();
    expect(result).toContain("data-icon=\"mdi:chevron-left\"");
    expect(result).toContain("href=\"/author\"");
  });
});