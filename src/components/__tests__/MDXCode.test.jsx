import React from "react";
import {cleanup, render} from "@testing-library/react";
import MDXCode from "../MDXCode";


describe("MDXCode", () => {
  afterEach(cleanup);

  const renderComponent = (children) => render(
      <MDXCode>
        {children}
      </MDXCode>,
  );

  test("that it renders correctly.", () => {
    const codeBlock = React.createElement(
        "code",
        {"className": "language-js"},
        "Module not found: Error: Can't resolve '@mdx-jsreact'\n");

    const {container} = renderComponent(codeBlock);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("that a non-codeblock is wrapped in a pre tag.", () => {
    const div = React.createElement("div", {}, "This is a div block");
    const {container} = renderComponent(div);
    expect(container.firstChild).toContainHTML("<pre><div>This is a div block</div></pre>");
  });

  test("that a string is wrapped in a pre tag.", () => {
    const {container} = renderComponent("content");
    expect(container.firstChild).toContainHTML("<pre>content</pre>");
  });
});
