import moment from "moment";
import expensesReducer from "../../reducers/expenses";

const expenseTestData = [
  {
    id: 1,
    description: "lolololol",
    note: "lom",
    amount: 2000,
    createdAt: moment(1524973200000)
  },
  {
    id: 2,
    description: "ababab",
    note: "jbk",
    amount: 1000,
    createdAt: moment(1554109200000)
  },
  {
    id: 3,
    description: "ljlj",
    note: "k",
    amount: 1200,
    createdAt: moment(1575230384854)
  }
];

test("Should initialize global state", () => {
  expect(
    expensesReducer(undefined, {
      type: "@@INIT"
    })
  ).toEqual([]);
});

test("Should add the passed expense to global state", () => {
  expect(
    expensesReducer([], {
      type: "ADD_EXPENSE",
      expense: expenseTestData[0]
    })
  ).toEqual([expenseTestData[0]]);
});

test("Should remove the passed expense from global state", () => {
  expect(
    expensesReducer(expenseTestData, {
      type: "REMOVE_EXPENSE",
      id: 1
    })
  ).toEqual([expenseTestData[1], expenseTestData[2]]);
});

test("Should edit the expense to according to the passed argument", () => {
  expect(
    expensesReducer(expenseTestData, {
      type: "EDIT_EXPENSE",
      id: 1,
      updates: {
        description: "edited",
        note: "edit",
        amount: 500,
        createdAt: moment(1500973200000)
      }
    })
  ).toEqual([
    {
      id: 1,
      description: "edited",
      note: "edit",
      amount: 500,
      createdAt: moment(1500973200000)
    },
    expenseTestData[1],
    expenseTestData[2]
  ]);
});

test("Should return the global state", () => {
  expect(
    expensesReducer(expenseTestData, {
      type: "NON_EXISTENT_TYPE",
      id: 1
    })
  ).toEqual(expenseTestData);
});
