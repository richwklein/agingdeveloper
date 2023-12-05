import React from "react";
import {cleanup, render} from "@testing-library/react";
import FeaturedImage from "../FeaturedImage";

// TODO improve tests
describe("FeaturedImage", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <FeaturedImage
        author={{name: "Georgia Smith", url: "https://example.com/georgia-smith"}}
        site={{name: "Unsplash", url: "https://example.com/unsplash"}} />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });
});
