import React, { useReducer, useState, useEffect, useCallback, useMemo, Reducer } from 'react';
import ErrorModal from '../UI/ErrorModal';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import useHttp from '../../hooks/http';

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
      console.log(action.ingredient);
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
  const { isLoading, error, data, identifier, sendRequest, extra } = useHttp();

  const { ingredients, visibleIngredients } = ingredientsState;
  // const [isLoading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('https://react-hooks-fbase.firebaseio.com/ingredients.json')
      .then(res => res.json())
      // Single state update from this block | one render cycle
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
        dispatch({ type: 'SET', ingredients: receivedIngredients });
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    dispatch({ type: 'FILTER', filter });
  }, [ingredients, filter]);

  useEffect(() => {
    if (!isLoading && !error && extra) {
      if (identifier === 'REMOVE_INGREDIENT' && typeof extra === 'string') {
        dispatch({ type: 'DELETE', id: extra });
      } else if (data && typeof extra !== 'string') {
        extra.id = data.name;
        dispatch({
          type: 'ADD',
          ingredient: { ...extra }
        });
      }
    }
  }, [data, extra, identifier, isLoading]);

  const addIngredientHandler = useCallback(
    (ingredient: Ingredient): void => {
      sendRequest(
        `https://react-hooks-fbase.firebaseio.com/ingredients.json`,
        'POST',
        JSON.stringify(ingredient),
        'ADD_INGREDIENT',
        ingredient
      );
    },
    [sendRequest]
  );

  const onRemoveItem = useCallback(
    (id: string): void => {
      if (id) {
        sendRequest(
          `https://react-hooks-fbase.firebaseio.com/ingredients/${id}.json`,
          'DELETE',
          null,
          'REMOVE_INGREDIENT',
          id
        );
      }
    },
    [sendRequest]
  );

  const clearError = useCallback(() => {
    // setError(null);
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
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} isLoading={isLoading} />

      <section>
        <Search onFilterChange={filterInputHandler} />
        {memoIngredientList}
      </section>
    </div>
  );
};

export default Ingredients;
