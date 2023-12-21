import React from "react";
import {cleanup, render} from "@testing-library/react";
import ExternalLink from "../ExternalLink";

describe("ExternalLink", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <ExternalLink
        to="https://example.com">
        Test Content
      </ExternalLink>,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that it has a data-link of external.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toHaveAttribute("data-link", "external");
  });

  test("that it has a new window target.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toHaveAttribute("target", "_blank");
  });

  test("that it has a noopener and noreferrer.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toHaveAttribute("rel", "noopener noreferrer");
  });

  test.todo("passing an additional attribute");
});
