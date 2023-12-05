import React from "react";
import {cleanup, render} from "@testing-library/react";
import TimeToRead from "../TimeToRead";

describe("TimeToRead", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <TimeToRead
        minutes={12.25}
        words={99999}
        lang="en-us" />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that minutes get rounded up.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toContainHTML("13 min read");
  });

  test("that word count is formatted based on lang.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toContainHTML("99,999 words");
  });
});
