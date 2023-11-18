import React, {Fragment} from "react";
import {cleanup, render} from "@testing-library/react";
import ExternalLink from "../ExternalLink";

describe("ExternalLink", () => {
  afterEach(cleanup);

  const renderComponent = () => {
    return render(
        <ExternalLink
          to="https://example.com"
          data-testid="external-link">
          <Fragment>Test Content</Fragment>
        </ExternalLink>,
    );
  };

  test("that it renders correctly.", () => {
    const {getByTestId} = renderComponent();
    expect(getByTestId("external-link")).toMatchSnapshot();
  });
});
