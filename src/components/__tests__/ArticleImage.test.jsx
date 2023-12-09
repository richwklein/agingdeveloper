import React from "react";
import {cleanup, render} from "@testing-library/react";
import ArticleImage from "../ArticleImage";

// TODO improve tests
describe("ArticleImage", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <ArticleImage
        author={{name: "Georgia Smith", url: "https://example.com/georgia-smith"}}
        site={{name: "Unsplash", url: "https://example.com/unsplash"}} />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });
});
