import React from "react";
import {cleanup, render} from "@testing-library/react";
import DisplayLimit from "../DisplayLimit";

describe("DisplayLimit", () => {
  afterEach(cleanup);

  const renderComponent = (limit=10) => render(
      <DisplayLimit limit={limit} total={100} />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that it shows remaining", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toContainHTML("90 remaining");
  });

  test("that less than limit nothing is rendered", () => {
    const {container} = renderComponent(110);
    expect(container).toBeEmptyDOMElement();
  });
});
