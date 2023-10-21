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
    const link = getByTestId("external-link");
    expect(link).toHaveTextContent("Test Content");
    expect(link.getAttribute("href")).toBe("https://example.com");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    expect(link).toHaveClass("MuiLink-root");
  });
});
