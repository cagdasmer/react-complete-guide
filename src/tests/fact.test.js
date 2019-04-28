import React from "react";

import { shallow } from "enzyme";
import Fact from "../components/fact";

test("Should correctly render the Fact component", () => {
  const text = "This is a fact";
  let wrapper = shallow(<Fact text={text} />);
  expect(wrapper).toMatchSnapshot();
});
