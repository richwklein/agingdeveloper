import React from "react";
import {cleanup, render} from "@testing-library/react";
import HeroArticle from "../HeroArticle";

// TODO improve tests
describe("HeroArticle", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <HeroArticle article={{
        "title": "This is an Article Title",
        "excerpt": "This is content from the article.",
        "slug": "2023-12-01-slug",
        "published": "2023-11-21",
      }} />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test.todo("add image to test");
  test.todo("verify more info");
});
