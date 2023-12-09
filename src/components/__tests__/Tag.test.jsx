import React from "react";
import {cleanup, render} from "@testing-library/react";
import Tag from "../Tag";

describe("Tag", () => {
  afterEach(cleanup);

  test("that a category tag is generated correctly.", () => {
    const {container} = render(<Tag name="Category Name" isCategory={true} />);
    expect(container.firstChild).toContainHTML("data-testid=\"FolderOutlinedIcon\"");
    expect(container.firstChild).toContainHTML("href=\"/category/category-name\"");
  });

  test("that a tag is generated correctly.", () => {
    const {container} = render(<Tag name="Tag Name" />);
    expect(container.firstChild).toContainHTML("data-testid=\"TagOutlinedIcon\"");
    expect(container.firstChild).toContainHTML("href=\"/tag/tag-name\"");
  });
});
