import React from "react";
import {createShallow, createMount} from "@material-ui/core/test-utils";
import {ThemeProvider} from "@material-ui/core/styles";
import InnerBox from "../InnerBox";

describe("InnerBox", () => {
  let mount;
  let wrapper;

  beforeEach(() => {
    mount = createMount();
    wrapper = mount(<InnerBox variant="test">Test Content</InnerBox>);
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it("is a div", () => {
    expect(wrapper.find("div")).toExist();
  });

  it("has children", () => {
    expect(wrapper.find("div")).toHaveText("Test Content");
  });

  it("has props", () => {
    expect(wrapper.find("div")).toHaveProp("variant", "test");
  });

  it("is centered", () => {
    const shallow = createShallow();
    const component = shallow(<InnerBox/>);
    expect(component).toHaveProp("marginX", "auto");
    expect(component).toHaveProp("width", "100%");
    expect(component).toHaveProp("maxWidth", 1280);
  });
});
