import React from "react";
import {cleanup, render} from "@testing-library/react";
import HeroBlock from "../HeroBlock";

// TODO improve tests
describe("HeroBlock", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <HeroBlock hero={{
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
