import React from "react";
import { shallow } from "enzyme";
import Header from "../../components/Header";

test("Should render header correctly", () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();

  // Enzyme
  //               could be id, class, element tag etc.
  /* expect(wrapper.find("h1").length).toBe(1);
  expect(wrapper.find("h1").text()).toBe("Expensify"); */

  // React Test Renderer
  /* const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  expect(renderer.getRenderOutput()).toMatchSnapshot(); */
});
