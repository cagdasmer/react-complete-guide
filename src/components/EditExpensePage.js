import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

export const EditExpensePage = props => {
  const onSubmit = expense => {
    props.editExpense(props.expense, expense);
    props.history.push("/");
  };

  const onClick = () => {
    props.removeExpense(props.expense);
    props.history.push("/");
  };

  return (
    <div>
      <ExpenseForm
        expense={props.expense}
        onSubmit={expense => onSubmit(expense)}
      />
      <button onClick={onClick}>Remove</button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(
      expense => expense.id === props.match.params.id
    )
  };
};

const mapDispatchToProps = dispatch => ({
  editExpense: expense => dispatch(editExpense(expense.id, expense)),
  removeExpense: expense => dispatch(removeExpense(expense.id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
