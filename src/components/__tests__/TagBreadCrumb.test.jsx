import React from "react";
import {cleanup, render} from "@testing-library/react";
import TagBreadcrumb from "../TagBreadCrumb";

describe("TagBreadcrumb", () => {
  afterEach(cleanup);

  test("that a category index is generated correctly.", () => {
    const {container} = render(<TagBreadcrumb isCategory={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that a tag index is generated correctly.", () => {
    const {container} = render(<TagBreadcrumb />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that a category breadcrumb is generated correctly.", () => {
    const {container} = render(<TagBreadcrumb name="Microservice" isCategory={true} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toContainHTML("href=\"/category/\"");
    expect(container.firstChild).toContainHTML("microservice");
  });

  test("that a tag breadcrumb is generated correctly.", () => {
    const {container} = render(<TagBreadcrumb name="Gatsbyjs"/>);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toContainHTML("href=\"/tag/\"");
    expect(container.firstChild).toContainHTML("gatsbyjs");
  });
});
