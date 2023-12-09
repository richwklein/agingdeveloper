import React from "react";
import {cleanup, render} from "@testing-library/react";
import FeaturedArticle from "../FeaturedArticle";

// TODO improve tests
describe("FeaturedArticle", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <FeaturedArticle article={{
        "title": "This is an Aritcle Title",
        "excerpt": "This is content from the article.",
        "slug": "2023-12-01-slug",
        "date": "2023-12-01",
      }} />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });
});
