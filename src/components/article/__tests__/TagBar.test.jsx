import React from "react";
import {cleanup, render} from "@testing-library/react";
import TagBar from "../TagBar";

// TODO improve tests
describe("TagBar", () => {
  afterEach(cleanup);

  const tags = ["Theme Park", "Genie+", "Sadness", "I ♥ Dogs"];

  const renderComponent = () => render(
      <TagBar category={"Family"} tags={tags} />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });
});
