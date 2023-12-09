import React from "react";
import {cleanup, render} from "@testing-library/react";
import TitleBlock from "../TitleBlock";

describe("TitleBlock", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <TitleBlock
        title= "Tesing Gatsby with Jest"
        description="You can test with Jest with the best of them." />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });
});
