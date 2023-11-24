import React, {Fragment} from "react";
import {cleanup, render} from "@testing-library/react";
import InnerContainer from "../InnerContainer";

describe("InnerContainer", () => {
  afterEach(cleanup);

  const renderComponent = () => {
    return render(
        <InnerContainer>
          <Fragment>Test Content</Fragment>
        </InnerContainer>,
    );
  };

  test("that it renders correctly.", () => {
    const {container} = renderComponent("https://example.com");
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that it has a maxWidth of large.", () => {
    const {container} = renderComponent("https://example.com");
    expect(container.firstChild).toHaveClass("MuiContainer-maxWidthLg");
  });
});
