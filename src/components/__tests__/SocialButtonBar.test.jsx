import React from "react";
import {cleanup, render} from "@testing-library/react";
import SocialButtonBar, {SocialIcon} from "../SocialButtonBar";

describe("SocialButtonBar", () => {
  afterEach(cleanup);

  const renderComponent = () => render(
      <SocialButtonBar
        socials={[
          {name: "Twitter", url: "https://twitter.com"},
          {name: "Pinterest", url: "https://pinterest.com"},
        ]}/>,
  );

  test.todo("Implement tests.");

  test("that it renders correctly.", () => {
    const {container} = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that the icons and titles are correct.", () => {
    const {container, getByTestId} = renderComponent();
    expect(getByTestId("TwitterIcon")).toBeInTheDocument();
    expect(container.firstChild).toContainHTML("title=\"Twitter\"");
    expect(container.firstChild).toContainHTML("href=\"https://twitter.com\"");

    expect(getByTestId("PinterestIcon")).toBeInTheDocument();
    expect(container.firstChild).toContainHTML("title=\"Pinterest\"");
    expect(container.firstChild).toContainHTML("href=\"https://pinterest.com\"");
  });

  test("the default icon is used", () => {
    const {getByTestId} = render(<SocialIcon name="unknown" />);
    expect(getByTestId("PublicIcon")).toBeInTheDocument();
  });
});
