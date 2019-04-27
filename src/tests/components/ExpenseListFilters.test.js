import React from "react";

import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/expenseTestFilters";

let setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount, wrapper;

beforeEach(() => {
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      filters={filters}
    />
  );
});

test("Should render EditExpenseFilters page correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("Should render EditExpenseFilters with alt date correctly", () => {
  expect(wrapper.setProps({ filters: altFilters })).toMatchSnapshot();
});

test("Should handle text change", () => {
  wrapper.find("input").prop("onChange")({ target: { value: "new text" } });
  expect(setTextFilter).toHaveBeenLastCalledWith("new text");
});

test("Should sort by date", () => {
  wrapper.find("select").prop("onChange")({ target: { value: "date" } });
  expect(sortByDate).toHaveBeenCalled();
});

test("Should sort by amount", () => {
  wrapper.find("select").prop("onChange")({ target: { value: "amount" } });
  expect(sortByAmount).toHaveBeenCalled();
});

test("Should handle date change", () => {
  wrapper.find("DateRangePicker").prop("onDatesChange")({
    startDate: altFilters.startDate,
    endDate: altFilters.endDate
  });
  expect(setStartDate).toHaveBeenLastCalledWith(altFilters.startDate);
  expect(setEndDate).toHaveBeenCalledWith(altFilters.endDate);
});

test("Should handle focus change", () => {
  wrapper.find("DateRangePicker").prop("onFocusChange")("startDate");
  expect(wrapper.state().calendarFocused).toBe("startDate");

  wrapper.find("DateRangePicker").prop("onFocusChange")("endDate");
  expect(wrapper.state().calendarFocused).toBe("endDate");
});
