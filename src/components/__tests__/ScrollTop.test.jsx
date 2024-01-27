import React from "react";
import * as Mui from "@mui/material";
import {cleanup, render} from "@testing-library/react";
import ScrollTop from "../ScrollTop";

jest.mock("@mui/material", () => {
  return {
    __esModule: true,
    ...jest.requireActual("@mui/material"),
  };
});

describe("ScrollTop", () => {
  const useScrollTrigger = jest.spyOn(Mui, "useScrollTrigger");

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  const renderComponent = () => render(
      <ScrollTop />,
  );

  test("that it renders when scrolled.", () => {
    useScrollTrigger.mockImplementation(() => true);
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that it does not show up without scroll.", () => {
    useScrollTrigger.mockImplementation(() => false);
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toContainHTML("visibility: hidden");
  });
});
