import React from "react";
import {cleanup, render} from "@testing-library/react";
import InnerContainer from "../InnerContainer";

describe("InnerContainer", () => {
  afterEach(cleanup);

  const renderComponent = (useMain=false) => render(
      <InnerContainer useMain={useMain}>
        <>Test</>
      </InnerContainer>,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toContainHTML("<div");
  });

  test("that it renders with main.", () => {
    const {container} = renderComponent(true);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toContainHTML("<main");
  });

  test("that it has a maxWidth of large.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toHaveClass("MuiContainer-maxWidthLg");
  });
});
