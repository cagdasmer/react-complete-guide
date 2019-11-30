import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

import { Ingredient, IngredientArray } from '../../types/types';

const Ingredients: React.FC = () => {
  const [ingredients, setIngredients] = useState<IngredientArray>([]);
  const [visibleIngredients, setVisibleIngredients] = useState<IngredientArray>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('https://react-hooks-fbase.firebaseio.com/ingredients.json')
      .then(res => res.json())
      .then(data => {
        const receivedIngredients = data
          ? Object.keys(data).map(id => {
              return {
                id,
                title: data[id].title,
                amount: data[id].amount
              };
            })
          : [];
        setIngredients(receivedIngredients);
      })
      .catch(e => {
        alert('Something went wrong!');
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setVisibleIngredients(ingredients.filter(ig => ig.title.includes(filter)));
  }, [ingredients, filter]);

  const addIngredientHandler = (ingredient: Ingredient): void => {
    fetch('https://react-hooks-fbase.firebaseio.com/ingredients.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingredient)
    })
      .then(res => res.json())
      .then(data => {
        const { title, amount } = ingredient;
        setIngredients((prevIngredients: IngredientArray) => [
          ...prevIngredients,
          { id: data.name, title, amount }
        ]);
      })
      .catch(e => {
        alert('Something went wrong!');
        console.log(e);
      });
  };

  const onRemoveItem = (id: string): void => {
    if (id) {
      fetch(`https://react-hooks-fbase.firebaseio.com/ingredients/${id}.json`, {
        method: 'DELETE'
      })
        .then(res => {
          if (res.status === 200) {
            setIngredients((prevIngredients: IngredientArray) =>
              prevIngredients.filter(ig => ig.id !== id)
            );
          }
        })
        .catch(e => {
          alert('Something went wrong!');
          console.log(e);
        });
    }
  };

  /*useCallback memoizes the function. ( Cache )
   Therefore it won't change unless the filter changes. ( Function won't be re-created )
   Meaning no unnecessary re-render of the search component because of 
   its dependency to this function. 
   The parent component will use the cached function. */
  const filterInputHandler = useCallback((filter: string): void => {
    setFilter(filter);
  }, []);

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onFilterChange={filterInputHandler} />
        <IngredientList ingredients={visibleIngredients} onRemoveItem={onRemoveItem} />
      </section>
    </div>
  );
};

export default Ingredients;
