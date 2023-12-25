import React from "react";
import {cleanup, render} from "@testing-library/react";
import InternalBackButton from "../InternalBackButton";

describe("InternalBackButton", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <InternalBackButton name="authors" path="/author" />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that it contains the text.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toContainHTML("view all authors");
  });

  test("that the icons and href are.", () => {
    const {container, getByTestId} = renderComponent();
    expect(getByTestId("ChevronLeftIcon")).toBeInTheDocument();
    expect(container.firstChild).toContainHTML("href=\"/author\"");
  });
});
