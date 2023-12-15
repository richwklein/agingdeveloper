import React, {Fragment} from "react";
import {cleanup, render} from "@testing-library/react";
import InnerContainer from "../InnerContainer";

describe("InnerContainer", () => {
  afterEach(cleanup);

  const renderComponent = (useMain=false) => render(
      <InnerContainer useMain={useMain}>
        <Fragment>Test</Fragment>
      </InnerContainer>,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that it renders with main.", () => {
    const {container} = renderComponent({useMain: true});
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that it has a maxWidth of large.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toHaveClass("MuiContainer-maxWidthLg");
  });
});
