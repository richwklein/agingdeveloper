import React, {Fragment} from "react";
import {cleanup, render} from "@testing-library/react";
import InternalLink from "../InternalLink";

describe("InternalLink", () => {
  afterEach(cleanup);

  const renderComponent = () => {
    return render(
        <InternalLink
          to="https://example.com">
          <Fragment>Test Content</Fragment>
        </InternalLink>,
    );
  };

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that it has a data-link of internal.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toHaveAttribute("data-link", "internal");
  });
});
