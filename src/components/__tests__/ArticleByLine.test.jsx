import React from "react";
import {cleanup, render} from "@testing-library/react";
import ArticleByLine from "../ArticleByLine";

describe("ArticleByLine", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <ArticleByLine
        authorName="Georgia Smith"
        authorSlug="georgia-smith"
        publishedDate="November 1st, 2023" />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that it has a link to the authors page.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toContainHTML("href=\"/author/georgia-smith\"");
  });
});
