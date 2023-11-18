import React, {Fragment} from "react";
import {cleanup, render} from "@testing-library/react";
import InnerContainer from "../InnerContainer";

describe("InnerContainer", () => {
  afterEach(cleanup);

  const renderComponent = () => {
    return render(
        <InnerContainer
          data-testid="inner-container">
          <Fragment>Test Content</Fragment>
        </InnerContainer>,
    );
  };

  test("that it renders correctly.", () => {
    const {getByTestId} = renderComponent();
    expect(getByTestId("inner-container")).toMatchSnapshot();
  });

  test("that it has a maxWidth of large", () => {
    const {getByTestId} = renderComponent();
    expect(getByTestId("inner-container")).toHaveClass("MuiContainer-maxWidthLg");
  });
});
