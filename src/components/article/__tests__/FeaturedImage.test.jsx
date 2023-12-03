import React from "react";
import {cleanup, render} from "@testing-library/react";
import FeaturedImage from "../FeaturedImage";

// TODO improve tests
describe("FeaturedImage", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <FeaturedImage
        authorName="Georgia Smith"
        authorUrl="https://example.com/georgia-smith"
        siteName="Unsplash"
        siteUrl="https://example.com/unsplash" />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });
});
