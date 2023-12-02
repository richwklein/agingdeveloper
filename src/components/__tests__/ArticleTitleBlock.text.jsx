import React from "react";
import {cleanup, render} from "@testing-library/react";
import ArticleTitleBlock from "../ArticleTitleBlock";

describe("ExternalLink", () => {
  afterEach(cleanup);

  const title = "Tesing Gatsby with Jest";
  const description = "You can test with Jest with the best of them.";

  const renderComponent = () => render(
      <ArticleTitleBlock
        title={title}
        description={description} />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });
});
