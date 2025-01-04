import { expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

describe('Тест инициализации rootReducer', function () {
  test('Проверка инициализации', function () {
    const store = configureStore({
      reducer: rootReducer
    });

    const action = { type: 'new_action' };
    const testState = rootReducer(undefined, action);
    expect(testState).toEqual(store.getState());
  });
});
