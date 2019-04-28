import React from "react";

import { shallow } from "enzyme";
import { wait } from "react-testing-library";
import axios from "axios";

import FactGenerator from "../components/factGenerator";

beforeEach(() => {
  jest.clearAllMocks();
  // setup
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        value: {
          joke: "Awesome fact!"
        }
      }
    })
  );
});

test("Should correctly render the FactGenerator component", () => {
  const component = shallow(<FactGenerator />);
  const fragment = component.instance().render();
  let wrapper = shallow(<div>{fragment}</div>);
  expect(wrapper.getElement()).toMatchSnapshot();
});

test("Message should change when the button is clicked", () => {
  const component = shallow(<FactGenerator />);
  component.find("button").simulate("click");
  expect(component.state("message")).toBe("Loading fact...");
  expect(component.state("loading")).toBe(true);
  const fragment = component.instance().render();
  let wrapper = shallow(<div>{fragment}</div>);
  expect(wrapper.getElement()).toMatchSnapshot();
});

test("Should correctly render the FactGenerator when the button is clicked", async () => {
  const component = shallow(<FactGenerator />);

  component.find("button").simulate("click");
  await wait(() => expect(component.state("loading")).not.toBe(true));
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith("https://api.icndb.com/jokes/random");

  const fragment = component.instance().render();
  let wrapper = shallow(<div>{fragment}</div>);
  expect(wrapper.getElement()).toMatchSnapshot();
});
