import React, {Fragment} from "react";
import {cleanup, render} from "@testing-library/react";
import MDXLink from "../MDXLink";

describe("MDXLink", () => {
  afterEach(cleanup);

  const renderComponent = (href) => {
    return render(
        <MDXLink
          href={href}>
          <Fragment>Test Content</Fragment>
        </MDXLink>,
    );
  };

  test("that an absolute url is external.", () => {
    const {container} = renderComponent("https://example.com");
    expect(container.firstChild).toHaveAttribute("data-link", "external");
  });

  test("that a matching absolute url is internal.", () => {
    const {container} = renderComponent("https://agingdeveloper.com");
    expect(container.firstChild).toHaveAttribute("data-link", "internal");
  });

  test("that a relative url is internal.", () => {
    const {container} = renderComponent("/author");
    expect(container.firstChild).toHaveAttribute("data-link", "internal");
  });

  test("that the same page is an anchor tag.", () => {
    const {container} = renderComponent("#anchor");
    expect(container.firstChild).toHaveAttribute("data-link", "same");
  });
});
