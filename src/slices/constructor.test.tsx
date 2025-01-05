import { describe, test, expect } from '@jest/globals';
import {
  TConstructorState,
  constructorSlice,
  addItem,
  deleteItem,
  swapIngredient,
  clearAll
} from './constructor';
import { testMainIngredient1, testMainIngredient2, testBun } from './testData';

describe('Тесты constructorSlice', () => {
  const testInitialState: TConstructorState = {
    bun: null,
    ingredients: []
  };

  test('Добавление main ингредиента', () => {
    const newState = constructorSlice.reducer(
        testInitialState,
      addItem(testMainIngredient1)
    );

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...testMainIngredient1,
      id: expect.any(String)
    });
  });

  test('Добавление bun', () => {
    const newState = constructorSlice.reducer(testInitialState, addItem(testBun));

    expect(newState.bun).toEqual({
      ...testBun,
      id: expect.any(String)
    });
  });

  test('Удаление ингредиента', () => {
    const newState = constructorSlice.reducer(
        testInitialState,
      deleteItem(testMainIngredient1)
    );

    expect(newState.ingredients).toHaveLength(0);
  });

  test('Перемещение ингредиента вверх', () => {
    const initialState: TConstructorState = {
      bun: null,
      ingredients: [testMainIngredient1, testMainIngredient2]
    };

    const newState = constructorSlice.reducer(
      initialState,
      swapIngredient({ index: 1, step: -1 })
    );

    expect(newState.ingredients).toHaveLength(2);
    expect(newState.ingredients[0]).toEqual(
      expect.objectContaining(testMainIngredient2)
    );
    expect(newState.ingredients[1]).toEqual(
      expect.objectContaining(testMainIngredient1)
    );
  });

  test('Перемещение ингредиента вниз', () => {
    const initialState: TConstructorState = {
      bun: null,
      ingredients: [testMainIngredient1, testMainIngredient2]
    };

    const newState = constructorSlice.reducer(
      initialState,
      swapIngredient({ index: 0, step: 1 })
    );

    expect(newState.ingredients).toHaveLength(2);
    expect(newState.ingredients[0]).toEqual(
      expect.objectContaining(testMainIngredient2)
    );
    expect(newState.ingredients[1]).toEqual(
      expect.objectContaining(testMainIngredient1)
    );
  });

  test('Очистка конструктора', () => {
    const initialState: TConstructorState = {
        bun: testBun,
        ingredients: [testMainIngredient1, testMainIngredient2]
      };

     const newState = constructorSlice.reducer(initialState, clearAll());

     expect(newState).toEqual(testInitialState);
  })
});
