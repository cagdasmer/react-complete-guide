import moment from "moment";

import filtersReducer from "../../reducers/expenses";

const defaultTestState = {
  text: "",
  sortBy: "date",
  startDate: moment().startOf("month"),
  endDate: moment().endOf("month")
};

test("Should initialize global state", () => {
  expect(
    filtersReducer(undefined, {
      type: "@@INIT"
    })
  ).toEqual([]);
});

test("Should set the text filter", () => {
  expect(
    filtersReducer(
      { ...defaultTestState, text: "text" },
      { type: "SET_TEXT_FILTER" }
    )
  ).toEqual({ ...defaultTestState, text: "text" });
});

test("Should set the sort type to amount", () => {
  expect(
    filtersReducer(
      { ...defaultTestState, sortBy: "amount" },
      { type: "SORT_BY_AMOUNT" }
    )
  ).toEqual({ ...defaultTestState, sortBy: "amount" });
});

test("Should set the sort type to date", () => {
  expect(
    filtersReducer(
      { ...defaultTestState, sortBy: "date" },
      { type: "SORT_BY_DATE" }
    )
  ).toEqual({ ...defaultTestState, sortBy: "date" });
});

test("Should set the start date", () => {
  expect(
    filtersReducer(
      { ...defaultTestState, startDate: moment(1554000000000) },
      { type: "SET_START_DATE" }
    )
  ).toEqual({ ...defaultTestState, startDate: moment(1554000000000) });
});

test("Should set the text filter", () => {
  expect(
    filtersReducer(
      { ...defaultTestState, endDate: moment(1555000000000) },
      { type: "SET_END_DATE" }
    )
  ).toEqual({ ...defaultTestState, endDate: moment(1555000000000) });
});

test("Should return the global state", () => {
  expect(
    filtersReducer(
      { ...defaultTestState, endDate: moment(1555000000000) },
      { type: "NON_EXISTENT_TYPE" }
    )
  ).toEqual({ ...defaultTestState, endDate: moment(1555000000000) });
});
