import React, {Fragment} from "react";
import {cleanup, render} from "@testing-library/react";
import InternalLink from "../InternalLink";

describe("InternalLink", () => {
  afterEach(cleanup);

  const renderComponent = () => {
    return render(
        <InternalLink
          to="https://example.com"
          data-testid="internal-link">
          <Fragment>Test Content</Fragment>
        </InternalLink>,
    );
  };

  test("that it renders correctly.", () => {
    const {getByTestId} = renderComponent();
    expect(getByTestId("internal-link")).toMatchSnapshot();
  });
});
