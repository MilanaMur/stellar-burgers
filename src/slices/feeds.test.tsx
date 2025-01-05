import { describe, test, expect } from '@jest/globals';
import {
  TFeedsState,
  feedsSlice,
  initialState,
  getAllFeeds,
  getOrdersFeeds,
  getTotalFeeds,
  getTotalTodayFeeds
} from './feeds';
import { configureStore } from '@reduxjs/toolkit';
import { testFeedsData } from './testData';

describe('Тесты feedsSlice', () => {
  test('Тесты селекторов (getOrdersFeeds, getTotalFeeds, getTotalTodayFeeds)', () => {
    const store = configureStore({
      reducer: {
        feeds: feedsSlice.reducer
      },
      preloadedState: {
        feeds: testFeedsData
      }
    });

    const orders = getOrdersFeeds(store.getState());
    const total = getTotalFeeds(store.getState());
    const totalToday = getTotalTodayFeeds(store.getState());

    expect(orders).toEqual(testFeedsData.orders);
    expect(total).toEqual(testFeedsData.total);
    expect(totalToday).toEqual(testFeedsData.totalToday);
  });

  test('Тест редьюсера getAllFeeds, проверка состояния fulfilled', () => {
    const action = {
      type: getAllFeeds.fulfilled.type,
      payload: testFeedsData
    };
    const newState: TFeedsState = feedsSlice.reducer(initialState, action);

    expect(newState).toEqual(testFeedsData);
    expect(newState.isLoading).toEqual(false);
  });

  test('Тест редьюсера getAllFeeds, проверка состояния rejected', () => {
    const testError = new Error('Test Error');
    const newState: TFeedsState = feedsSlice.reducer(
      initialState,
      getAllFeeds.rejected(testError, '')
    );

    expect(newState.orders).toEqual([]);
    expect(newState.total).toEqual(0);
    expect(newState.totalToday).toEqual(0);
    expect(newState.isLoading).toEqual(false);
    expect(newState.error).toEqual('Test Error');
  });

  test('Тест редьюсера getAllFeeds, проверка состояния pending', () => {
    const newState: TFeedsState = feedsSlice.reducer(
      initialState,
      getAllFeeds.pending('')
    );

    expect(newState.isLoading).toEqual(true);
    expect(newState.error).toEqual(undefined);
  });
});
