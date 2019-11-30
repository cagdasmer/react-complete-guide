import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../UI/Card';
import './IngredientForm.css';
import { Ingredient } from '../../types/types';

interface IngredientFormProps {
  onAddIngredient(ingredient: Ingredient): void;
}

const IngredientForm: React.FC<IngredientFormProps> = React.memo(props => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const submitHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    props.onAddIngredient({ id: undefined, title, amount });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              onChange={(e): void => {
                setTitle(e.target.value);
              }}
              value={title}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              onChange={(e): void => {
                setAmount(e.target.value);
              }}
              value={amount}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

IngredientForm.propTypes = {
  onAddIngredient: PropTypes.func.isRequired
};

export default IngredientForm;
