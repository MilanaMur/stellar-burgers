import { describe, test, expect } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { testIngredientsData } from './testData';
import {
  TIngredientsState,
  ingredientsSlice,
  initialState,
  getIngredients,
  getIngredientsList,
  getIngredientsLoadingState,
  getIngredientsState
} from './ingredients';

describe('Тесты ingredientsSlice', () => {
  test('Тесты селекторов (getIngredientsState, getIngredientsLoadingState, getIngredients)', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsSlice.reducer
      },
      preloadedState: {
        ingredients: testIngredientsData
      }
    });

    const ingredientsState = getIngredientsState(store.getState());
    const loading = getIngredientsLoadingState(store.getState());
    const ingredients = getIngredients(store.getState());

    expect(ingredientsState).toEqual(testIngredientsData);
    expect(ingredients).toEqual(testIngredientsData.ingredients);
    expect(loading).toEqual(testIngredientsData.loading);
  });

  test('Тест редьюсера getIngredientsList, проверка состояния fulfilled', () => {
    const action = {
      type: getIngredientsList.fulfilled.type,
      payload: testIngredientsData.ingredients
    };
    const newState: TIngredientsState = ingredientsSlice.reducer(
      initialState,
      action
    );

    expect(newState).toEqual(testIngredientsData);
    expect(newState.loading).toEqual(false);
  });

  test('Тест редьюсера getIngredientsList, проверка состояния rejected', () => {
    const testError = new Error('Test Error');
    const newState: TIngredientsState = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.rejected(testError, '')
    );

    expect(newState.ingredients).toEqual([]);
    expect(newState.loading).toEqual(false);
    expect(newState.error).toEqual('Test Error');
  });

  test('Тест редьюсера getIngredientsList, проверка состояния pending', () => {
    const newState: TIngredientsState = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.pending('')
    );

    expect(newState.loading).toEqual(true);
    expect(newState.error).toEqual(null);
  });
});
