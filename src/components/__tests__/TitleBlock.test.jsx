import React from "react";
import {cleanup, render} from "@testing-library/react";
import TitleBlock from "../TitleBlock";

describe("TitleBlock", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <TitleBlock
        title= "Tesing Gatsby with Jest"
        subtitle="You can test with Jest with the best of them." />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that it renders without a subtitle.", () => {
    const {container} = render(<TitleBlock title="without subtitle" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
