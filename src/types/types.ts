export type Ingredient = { id: string | undefined; title: string; amount: string };
export type IngredientArray = Ingredient[];

export const actions = {
  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE',
  FILTER: 'FILTER',
  SET_FILTER: 'SET_FILTER'
};
