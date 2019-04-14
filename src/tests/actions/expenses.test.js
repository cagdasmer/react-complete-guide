import * as actions from "../../actions/expenses";

test("Add expense with no data", () => {
  expect(actions.addExpense()).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  });
});
