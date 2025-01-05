import { describe, test, expect } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  TUserState,
  userSlice,
  initialState,
  isAuthCheckedSelector,
  getUser,
  getName,
  getError,
  register,
  login,
  getUserApis,
  updateUser,
  logout
} from './user';
import {
  testUser,
  testUserData,
  testUserDataUpdated,
  testUserResponse,
  testUserResponseUpdated
} from './testData';
import { TUser } from '@utils-types';

describe('Тесты userSlice', () => {
  const userStateConstructor = (action: { type: string; payload?: {} }) =>
    userSlice.reducer(initialState, action);

  test('Тесты селекторов (isAuthCheckedSelector, getUser, getName, getError)', () => {
    const store = configureStore({
      reducer: {
        user: userSlice.reducer
      },
      preloadedState: {
        user: testUserData
      }
    });

    const isAuthChecked = isAuthCheckedSelector(store.getState());
    const user = getUser(store.getState());
    const name = getName(store.getState());
    const error = getError(store.getState());

    expect(isAuthChecked).toEqual(true);
    expect(user).toEqual(testUser);
    expect(name).toEqual(testUser.name);
    expect(error).toEqual(null);
  });

  test('Тест редьюсера register, проверка состояния fulfilled', () => {
    const action = {
      type: register.fulfilled.type,
      payload: testUserResponse
    };

    expect(userStateConstructor(action)).toEqual(testUserData);
  });

  test('Тест редьюсера register, проверка состояния rejected', () => {
    const testError = new Error('Test Error');
    const newState: TUserState = userSlice.reducer(
      initialState,
      register.rejected(testError, '', { ...testUser, password: '123' })
    );

    expect(newState.error).toEqual('Test Error');
  });

  test('Тест редьюсера register, проверка состояния pending', () => {
    const newState: TUserState = userSlice.reducer(
      initialState,
      register.pending('', { ...testUser, password: '123' })
    );

    expect(newState.error).toEqual(null);
  });

  test('Тест редьюсера login, проверка состояния fulfilled', () => {
    const action = {
      type: login.fulfilled.type,
      payload: testUserResponse
    };

    expect(userStateConstructor(action)).toEqual(testUserData);
  });

  test('Тест редьюсера login, проверка состояния rejected', () => {
    const testError = new Error('Test Error');
    const newState: TUserState = userSlice.reducer(
      initialState,
      login.rejected(testError, '', { ...testUser, password: '123' })
    );

    expect(newState.isAuthChecked).toEqual(false);
    expect(newState.error).toEqual('Test Error');
  });

  test('Тест редьюсера login, проверка состояния pending', () => {
    const newState: TUserState = userSlice.reducer(
      initialState,
      login.pending('', { ...testUser, password: '123' })
    );

    expect(newState.isAuthChecked).toEqual(false);
    expect(newState.error).toEqual(null);
  });

  test('Тест редьюсера getUserApis, проверка состояния fulfilled', () => {
    const action = {
      type: getUserApis.fulfilled.type,
      payload: testUserResponse
    };

    expect(userStateConstructor(action)).toEqual(testUserData);
  });

  test('Тест редьюсера getUserApis, проверка состояния rejected', () => {
    const testError = new Error('Test Error');
    const newState: TUserState = userSlice.reducer(
      initialState,
      getUserApis.rejected(testError, '')
    );

    expect(newState.isAuthChecked).toEqual(false);
    expect(newState.error).toEqual('Test Error');
  });

  test('Тест редьюсера updateUser, проверка состояния fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: testUserResponseUpdated
    };

    expect(userStateConstructor(action)).toEqual(testUserDataUpdated);
  });

  test('Тест редьюсера updateUser, проверка состояния rejected', () => {
    const testError = new Error('Test Error');
    const newState: TUserState = userSlice.reducer(
      initialState,
      updateUser.rejected(testError, '', {
        email: testUserResponseUpdated.user.email,
        name: testUserDataUpdated.user.name,
        password: '1234'
      })
    );

    expect(newState.isAuthChecked).toEqual(false);
    expect(newState.error).toEqual('Test Error');
  });

  test('Тест редьюсера updateUser, проверка состояния pending', () => {
    const newState: TUserState = userSlice.reducer(
      initialState,
      updateUser.pending('', {
        email: testUserResponseUpdated.user.email,
        name: testUserDataUpdated.user.name,
        password: '1234'
      })
    );

    expect(newState.error).toEqual(null);
  });

  test('Тест редьюсера logout, проверка состояния fulfilled', () => {
    const action = {
      type: logout.fulfilled.type,
      payload: testUserResponse
    };

    expect(userStateConstructor(action)).toEqual(initialState);
  });
});
