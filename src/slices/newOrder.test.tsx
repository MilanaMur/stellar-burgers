import { describe, test, expect } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  TNewOrderState,
  newOrderSlice,
  initialState,
  getOrderModalData,
  getOrderRequest,
  resetOrder,
  createNewOrder
} from './newOrder';
import { testNewOrder, testOrder } from './testData';

describe('Тесты newOrderSlice', () => {
  test('Тесты селекторов (getOrderRequest, getOrderModalData)', () => {
    const store = configureStore({
      reducer: {
        newOrder: newOrderSlice.reducer
      },
      preloadedState: {
        newOrder: testNewOrder
      }
    });
    const orderRequest = getOrderRequest(store.getState());
    const modal = getOrderModalData(store.getState());

    expect(orderRequest).toEqual(testNewOrder.orderRequest);
    expect(modal).toEqual(testNewOrder.orderModalData);
  });

  test('Тест редьюсера resetOrder', () => {
    const state = {
      orderRequest: true,
      orderModalData: testOrder,
      error: undefined
    };
    const newState = newOrderSlice.reducer(state, resetOrder());

    expect(newState).toEqual(initialState);
  });

  test('Тест редьюсера createNewOrder, проверка состояния fulfilled', () => {
    const newState: TNewOrderState = newOrderSlice.reducer(
      initialState,
      createNewOrder.fulfilled(
        {
          success: true,
          name: 'Краторный минеральный люминесцентный бургер',
          order: testOrder
        },
        '',
        ['']
      )
    );

    expect(newState.orderRequest).toEqual(false);
    expect(newState.orderModalData).toEqual(testOrder);
  });

  test('Тест редьюсера createNewOrder, проверка состояния rejected', () => {
    const testError = new Error('Test Error');
    const newState: TNewOrderState = newOrderSlice.reducer(
      initialState,
      createNewOrder.rejected(testError, '', [''])
    );

    expect(newState.error).toEqual('Test Error');
  });

  test('Тест редьюсера createNewOrder, проверка состояния pending', () => {
    const newState: TNewOrderState = newOrderSlice.reducer(
      initialState,
      createNewOrder.pending('', [])
    );

    expect(newState.orderRequest).toEqual(true);
  });
});
