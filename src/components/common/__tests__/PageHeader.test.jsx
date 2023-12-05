import React from "react";
import {cleanup, render} from "@testing-library/react";
import PageHeader from "../PageHeader";

// TODO improve test
describe("PageHeader", () => {
  afterEach(cleanup);

  const renderComponent = (href) => render(
      <PageHeader title="Test title" tagline="Test tagline is the best tagline"/>,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });
});
