import React from "react";
import {cleanup, render} from "@testing-library/react";
import PageFooter from "../PageFooter";

describe("PageFooter", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2020-05-01"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(cleanup);

  const renderComponent = () => {
    return render( <PageFooter title="test-title" repository="https://github.com/test-repository" />);
  };

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that copyright is the correct year.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toContainHTML("© 2020");
  });
});
