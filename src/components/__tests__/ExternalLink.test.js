import React from "react";
import {cleanup, render} from "@testing-library/react";
import ExternalLink from "../ExternalLink";

describe("ExternalLink tests", () => {
  afterEach(cleanup);

  const renderComponent = () => {
    return render( <ExternalLink
      to="https://example.com"
      data-testid="external-link">
      Test Content
    </ExternalLink>);
  };

  test("That it renders correctly.", () => {
    const {getByTestId} = renderComponent();
    expect(getByTestId("external-link")).toMatchSnapshot();
  });
});
