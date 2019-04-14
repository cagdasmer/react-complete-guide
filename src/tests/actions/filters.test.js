import moment from "moment";

import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../../actions/filters";

test("Should return the text filter", () => {
  expect(setTextFilter("filter")).toEqual({
    type: "SET_TEXT_FILTER",
    text: "filter"
  });
});

test("Should return an action type of sort by date", () => {
  expect(sortByDate(moment(0))).toEqual({
    type: "SORT_BY_DATE"
  });
});

test("Should return an action type of sort by amount", () => {
  expect(sortByAmount(moment(0))).toEqual({
    type: "SORT_BY_AMOUNT"
  });
});

test("Should return an action type of set start date and the argument passed", () => {
  expect(setStartDate(moment(0))).toEqual({
    type: "SET_START_DATE",
    startDate: moment(0)
  });
});

test("Should return an action type of set end date and the argument passed", () => {
  expect(setEndDate(moment(0))).toEqual({
    type: "SET_END_DATE",
    endDate: moment(0)
  });
});
