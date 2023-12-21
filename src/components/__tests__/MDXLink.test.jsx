import React from "react";
import {cleanup, render} from "@testing-library/react";
import MDXLink from "../MDXLink";

describe("MDXLink", () => {
  afterEach(cleanup);

  const renderComponent = (href) => render(
      <MDXLink href={href}>
      Test Content
      </MDXLink>,
  );

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

  test("that an anchor tag is internal.", () => {
    const {container} = renderComponent("#anchor");
    expect(container.firstChild).toHaveAttribute("data-link", "internal");
  });

  test("that a querystring param is internal.", () => {
    const {container} = renderComponent("?param=xyz");
    expect(container.firstChild).toHaveAttribute("data-link", "internal");
  });

  test("that non-http is unknown.", () => {
    const {container} = renderComponent("ftp://example.com");
    expect(container.firstChild).toHaveAttribute("data-link", "unknown");
  });

  test.todo("passing an additional attribute");
});
