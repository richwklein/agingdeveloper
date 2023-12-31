import React from "react";
import {cleanup, render} from "@testing-library/react";
import ArticleTagGrid from "../ArticleTagGrid";

describe("ArticleTagGrid", () => {
  afterEach(cleanup);

  const tags = ["Sadness", "Theme Park", "Genie+", "I ♥ Dogs"];

  const renderComponent = () => render(
      <ArticleTagGrid category={"Family"} tags={tags} />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that the category is in the html.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toContainHTML("Family");
    expect(container.firstChild).toContainHTML("href=\"/category/family\"");
  });

  test("that tags handle special characters.", () => {
    const {container} = renderComponent();
    const child = container.firstChild;
    expect(child).toContainHTML("Theme Park");
    expect(child).toContainHTML("href=\"/tag/theme-park\"");

    expect(child).toContainHTML("Genie+");
    expect(child).toContainHTML("href=\"/tag/genie\"");

    expect(child).toContainHTML("I ♥ Dogs");
    expect(child).toContainHTML("href=\"/tag/i-dogs\"");
  });
});
