import React from "react";
import {cleanup, render} from "@testing-library/react";
import ArticleTagGrid from "../ArticleTagGrid";

describe("ArticleTagGrid", () => {
  afterEach(cleanup);

  const tags = ["Theme Park", "Genie+", "Sadness", "I ♥ Dogs"];

  const renderComponent = () => render(
      <ArticleTagGrid category={"Family"} tags={tags} />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });
});
