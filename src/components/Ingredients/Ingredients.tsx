import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

import { Ingredient, IngredientArray } from '../../types/types';

const Ingredients: React.FC = () => {
  const [ingredients, setIngredients] = useState<IngredientArray>([]);

  const addIngredientHandler = (ingredient: Ingredient): void => {
    setIngredients((prevIngredients: IngredientArray) => [...prevIngredients, ingredient]);
  };

  const onRemoveItem = (id: string): void => {
    setIngredients((prevIngredients: IngredientArray) =>
      prevIngredients.filter(ig => ig.id !== id)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={onRemoveItem} />
      </section>
    </div>
  );
};

export default Ingredients;
