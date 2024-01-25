import React from "react";
import {cleanup, render} from "@testing-library/react";
import ArticleByLine from "../ArticleByLine";

describe("ArticleByLine", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <ArticleByLine
        author={{name: "Georgia Smith", slug: "georgia-smith"}}
        published="2023-11-02T15:30:00Z" />,
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
