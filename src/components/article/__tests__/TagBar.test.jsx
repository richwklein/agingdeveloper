import React from "react";
import {cleanup, render} from "@testing-library/react";
import TagBar, {Tag} from "../TagBar";

// TODO improve tests
describe("TagBar", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <TagBar tags={["Theme Park", "Genie+", "Sadness", "I ♥ Dogs"]} />,
  );

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that a tag is generated correctly.", () => {
    const {container} = render(<Tag name="Tag Name" />);
    expect(container.firstChild).toContainHTML("data-testid=\"TagOutlinedIcon\"");
    expect(container.firstChild).toContainHTML("href=\"/tag/tag-name\"");
  });
});
