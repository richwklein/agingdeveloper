import React, {Fragment} from "react";
import {cleanup, render} from "@testing-library/react";
import InnerContainer from "../InnerContainer";

describe("InnerContainer", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <InnerContainer>
        <Fragment>Test</Fragment>
      </InnerContainer>,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that it renders with main.", () => {
    const {container} = render(<InnerContainer isMain={true}>Test</InnerContainer>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that it has a maxWidth of large.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toHaveClass("MuiContainer-maxWidthLg");
  });
});
