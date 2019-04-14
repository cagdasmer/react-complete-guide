import moment from "moment";

import selectExpenses from "../../selectors/expenses";

const expenseTestData = [
  {
    description: "lolololol",
    note: "lom",
    amount: 2000,
    createdAt: moment(1524973200000)
  },
  {
    description: "ababab",
    note: "jbk",
    amount: 1000,
    createdAt: moment(1554109200000)
  },
  {
    description: "ljlj",
    note: "k",
    amount: 1200,
    createdAt: moment(1575230384854)
  }
];

const filters = {
  text: "",
  sortBy: "",
  startDate: undefined,
  endDate: undefined
};

test("Should filter by text value", () => {
  expect(selectExpenses(expenseTestData, { ...filters, text: "lol" })).toEqual([
    expenseTestData[0]
  ]);
});

test("Should filter by starting date", () => {
  expect(
    selectExpenses(expenseTestData, {
      ...filters,
      startDate: moment(1555000000000)
    })
  ).toEqual([expenseTestData[2]]);
});

test("Should filter by end date", () => {
  expect(
    selectExpenses(expenseTestData, {
      ...filters,
      endDate: moment(1555000000000)
    })
  ).toEqual([expenseTestData[0], expenseTestData[1]]);
});

test("Should filter by start & end date", () => {
  expect(
    selectExpenses(expenseTestData, {
      ...filters,
      startDate: moment(1554000000000),
      endDate: moment(1555000000000)
    })
  ).toEqual([expenseTestData[1]]);
});

test("Should sort by amount", () => {
  expect(
    selectExpenses(expenseTestData, {
      ...filters,
      sortBy: "amount"
    })
  ).toEqual([expenseTestData[0], expenseTestData[2], expenseTestData[1]]);
});

test("Should sort by date", () => {
  expect(
    selectExpenses(expenseTestData, {
      ...filters,
      sortBy: "date"
    })
  ).toEqual(expenseTestData.reverse());
});
