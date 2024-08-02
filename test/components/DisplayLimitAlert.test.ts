import DisplayLimitAlert from "@components/DisplayLimitAlert.astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, test } from "vitest";

describe("DisplayLimitAlert", () => {
  const render = async () => {
    const container = await AstroContainer.create();
    return container.renderToString(DisplayLimitAlert, {
      props: {
        limit: 5,
        total: 10,
      },
    });
  };

  test("that it renders correctly.", async () => {
    const result = await render();
    expect(result).toMatchSnapshot();
  });

  test("that it shows remaining.", async () => {
    const result = await render();
    expect(result).toContain("5 remaining.");
  });
});
