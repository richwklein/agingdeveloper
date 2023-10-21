import React from "react";
import {cleanup, render} from "@testing-library/react";
import InternalLink from "../InternalLink";

describe("InternalLink tests", () => {
  afterEach(cleanup);

  const renderComponent = () => {
    return render( <InternalLink
      to="https://example.com"
      data-testid="internal-link">
      Test Content
    </InternalLink>);
  };

  test("That it renders correctly.", () => {
    const {getByTestId} = renderComponent();
    const link = getByTestId("internal-link");
    expect(link).toHaveTextContent("Test Content");
    expect(link.getAttribute("href")).toBe("https://example.com");
    expect(link.getAttribute("target")).toBeNull();
    expect(link.getAttribute("rel")).toBeNull();
    expect(link).toHaveClass("MuiLink-root");
  });
});
