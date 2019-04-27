import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

export const EditExpensePage = props => {
  const onSubmit = expense => {
    props.editExpense(props.expense.id, expense);
    props.history.push("/");
  };

  const onClick = () => {
    props.removeExpense(props.expense.id);
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
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: id => dispatch(removeExpense(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
