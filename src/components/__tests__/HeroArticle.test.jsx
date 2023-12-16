import React from "react";
import {cleanup, render} from "@testing-library/react";
import HeroArticle from "../HeroArticle";

// TODO improve tests
describe("HeroArticle", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <HeroArticle article={{
        "title": "This is an Aritcle Title",
        "excerpt": "This is content from the article.",
        "slug": "2023-12-01-slug",
      }} />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });
});
