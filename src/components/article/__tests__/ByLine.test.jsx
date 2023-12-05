import React from "react";
import {cleanup, render} from "@testing-library/react";
import ByLine from "../ByLine";

describe("ByLine", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <ByLine
        author={{name: "Georgia Smith", slug: "georgia-smith"}}
        date="November 1st, 2023" />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that it has a link to the authors page.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toContainHTML("href=\"/author/georgia-smith\"");
  });
});
