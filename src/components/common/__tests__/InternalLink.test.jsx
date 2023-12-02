import React from "react";
import {cleanup, render} from "@testing-library/react";
import InternalLink from "../InternalLink";

describe("InternalLink", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <InternalLink
        to="https://example.com">
        Test Content
      </InternalLink>,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that it has a data-link of internal.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toHaveAttribute("data-link", "internal");
  });
});
