import React from "react";

import { shallow } from "enzyme";
import moment from "moment";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenseTestData";

const expenseItemData = { expense: expenses[0] };

test("Should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("Should render ExpenseForm with expense data", () => {
  const wrapper = shallow(<ExpenseForm {...expenseItemData} />);
  expect(wrapper).toMatchSnapshot();
});

/*************** simulate ***************/
// Can add as may snapshots as we like
test("Should render error for invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("Should set description on input change", () => {
  const value = "New desc";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(0)
    .simulate("change", {
      target: {
        value
      }
    });
  expect(wrapper.state("description")).toBe(value);
});

test("Should set note on textarea change", () => {
  const value = "New note";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("textarea").simulate("change", {
    target: {
      value
    }
  });
  expect(wrapper.state("note")).toBe(value);
});

test("Should set description on input change", () => {
  const value = "New desc";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(0)
    .simulate("change", {
      target: {
        value
      }
    });
  expect(wrapper.state("description")).toBe(value);
});

test("Should set amount on input change", () => {
  const value = "5000";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: {
        value
      }
    });
  expect(wrapper.state("amount")).toBe(value);
});

test("Should not set amount on invalid input change", () => {
  const value = "50abc";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: {
        value
      }
    });
  expect(wrapper.state("amount")).toBe("");
});
/*********************************************/

/************* Spies **************/
test("Should call onSubmit prop for valid form submission", () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: "Gum",
    note: "",
    amount: 195,
    createdAt: 0
  });
});

test("Should set focus on calendar", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper.state("calendarFocused")).toBe(false);

  let focused = true;
  wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused });
  expect(wrapper.state("calendarFocused")).toEqual(focused);

  focused = false;
  wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused });
  expect(wrapper.state("calendarFocused")).toEqual(focused);
});

test("Should set new date on date change", () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("SingleDatePicker").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});
/************************************/
