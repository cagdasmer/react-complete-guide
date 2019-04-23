import React from "react";

import { shallow } from "enzyme";
import ExpenseListItem from "../../components/ExpenseListItem";
import expenses from "../fixtures/expenseTestData";

const expenseItemData = expenses[0];

test("Render an expense list item with given properties", () => {
  const wrapper = shallow(<ExpenseListItem {...expenseItemData} />);
  expect(wrapper).toMatchSnapshot();
});
