import React from "react";
import {cleanup, render} from "@testing-library/react";
import TitleBlock from "../TitleBlock";

describe("TitleBlock", () => {
  afterEach(cleanup);

  const renderComponent = (subtitle=null) => render(
      <TitleBlock
        title= "Testing Gatsby with Jest"
        subtitle={subtitle} />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent("This is a subtitle.");
    expect(container.firstChild).toContainHTML("This is a subtitle.");
  });

  test("that it contains a subtitle.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test.todo("Test with an avatar");
  test.todo("Test with children");
});
