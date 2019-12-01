import React, { useReducer, useState, useEffect, useCallback, useMemo, Reducer } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

import { Ingredient, IngredientArray } from '../../types/types';

/* COL: 
Is it better to use constants for action types, 
 or to explicitly state which action receives what parameters with the 
  compromise of defining types manually each time ? */
// TODO: Research & try to use Type Guards for opt. 1
type IngredientAction =
  | { type: 'SET'; ingredients: IngredientArray }
  | { type: 'ADD'; ingredient: Ingredient }
  | { type: 'DELETE'; id: string }
  | { type: 'FILTER'; filter: string };

interface IngredientsState {
  ingredients: IngredientArray;
  visibleIngredients: IngredientArray;
}
type IngredientsReducer = Reducer<IngredientsState, IngredientAction>;

const ingredientReducer = (
  prevState: IngredientsState,
  action: IngredientAction
): IngredientsState => {
  switch (action.type) {
    // COL: why actions.SET did not work?
    case 'SET':
      return {
        ...prevState,
        ingredients: action.ingredients
      };
    case 'ADD':
      return {
        ...prevState,
        ingredients: [...prevState.ingredients, action.ingredient]
      };
    case 'DELETE':
      return {
        ...prevState,
        ingredients: prevState.ingredients.filter(ig => ig.id !== action.id)
      };
    case 'FILTER':
      return {
        ...prevState,
        visibleIngredients: prevState.ingredients.filter(ig => ig.title.includes(action.filter))
      };
    default:
      throw new Error('Something went wrong!');
  }
};

const Ingredients: React.FC = () => {
  const initialArg: IngredientsState = {
    ingredients: [],
    visibleIngredients: []
  };
  const [ingredientsState, dispatch] = useReducer<IngredientsReducer>(
    ingredientReducer,
    initialArg
  );

  const { ingredients, visibleIngredients } = ingredientsState;
  const [isLoading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://react-hooks-fbase.firebaseio.com/ingredients.json')
      .then(res => res.json())
      // Single state update from this block | one render cycle
      .then(data => {
        setLoading(false);
        const receivedIngredients = data
          ? Object.keys(data).map(id => {
              return {
                id,
                title: data[id].title,
                amount: data[id].amount
              };
            })
          : [];
        dispatch({ type: 'SET', ingredients: receivedIngredients });
      })
      .catch(e => {
        alert('Something went wrong!');
        setLoading(false);
        console.log(e);
      });
  }, []);

  useEffect(() => {
    dispatch({ type: 'FILTER', filter });
  }, [ingredients, filter]);

  const addIngredientHandler = useCallback((ingredient: Ingredient): void => {
    setLoading(true);
    fetch('https://react-hooks-fbase.firebaseio.com/ingredients.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingredient)
    })
      .then(res => res.json())
      // Single state update from this block
      .then(data => {
        const { title, amount } = ingredient;
        setLoading(false);
        dispatch({ type: 'ADD', ingredient: { id: data.name, title, amount } });
      })
      .catch(e => {
        alert('Something went wrong!');
        setLoading(false);
        console.log(e);
      });
  }, []);

  const onRemoveItem = useCallback((id: string): void => {
    if (id) {
      setLoading(true);
      fetch(`https://react-hooks-fbase.firebaseio.com/ingredients/${id}.json`, {
        method: 'DELETE'
      })
        // Single state update from this block
        .then(res => {
          setLoading(false);
          if (res.status === 200) {
            dispatch({ type: 'DELETE', id });
          } else {
            alert('Something went wrong!');
          }
        })
        .catch(e => {
          alert('Something went wrong!');
          setLoading(false);
          console.log(e);
        });
    }
  }, []);

  // Alternative to React.memo
  const memoIngredientList = useMemo(
    () => <IngredientList ingredients={visibleIngredients} onRemoveItem={onRemoveItem} />,
    [visibleIngredients, onRemoveItem]
  );

  /* useCallback memoizes the function. ( Cache )
   Therefore it won't change unless the filter changes. ( Function won't be re-created )
   Meaning no unnecessary re-render of the search component because of 
   its dependency to this function. 
   The parent component will use the cached function. */
  const filterInputHandler = useCallback((filter: string): void => {
    setFilter(filter);
  }, []);

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} isLoading={isLoading} />

      <section>
        <Search onFilterChange={filterInputHandler} />
        {memoIngredientList}
      </section>
    </div>
  );
};

export default Ingredients;
