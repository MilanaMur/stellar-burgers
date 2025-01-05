import { describe, test, expect } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  TUserOrdersState,
  userOrdersSlice,
  initialState,
  listOfOrders,
  getUserOrders
} from './userOrders';
import { testOrdersData } from './testData';

describe('Тесты userOrdersSlice', () => {
  test('Тест селектора (listOfOrders)', () => {
    const store = configureStore({
      reducer: {
        userOrders: userOrdersSlice.reducer
      },
      preloadedState: {
        userOrders: testOrdersData
      }
    });
    const orderRequest = listOfOrders(store.getState());

    expect(orderRequest).toEqual(testOrdersData.orders);
  });

  test('Тест редьюсера getUserOrders, проверка состояния fulfilled', () => {
    const newState: TUserOrdersState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.fulfilled(testOrdersData.orders, '')
    );

    expect(newState.orders).toEqual(testOrdersData.orders);
    expect(newState.isLoading).toEqual(false);
  });

  test('Тест редьюсера getUserOrders, проверка состояния rejected', () => {
    const testError = new Error('Test Error');
    const newState: TUserOrdersState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.rejected(testError, '')
    );

    expect(newState.isLoading).toEqual(false);
  });

  test('Тест редьюсера getUserOrders, проверка состояния pending', () => {
    const newState: TUserOrdersState = userOrdersSlice.reducer(
      initialState,
      getUserOrders.pending('')
    );

    expect(newState.isLoading).toEqual(true);
  });
});
