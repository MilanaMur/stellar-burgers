import { TConstructorIngredient, TOrder, TUser } from '../utils/types';

export const testMainIngredient1: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  id: 'id-2',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

export const testMainIngredient2: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: 'id-3',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
};

export const testBun: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  id: 'id-1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

export const testUser: TUser = {
  email: 'test@yandex.ru',
  name: 'Test'
};

export const testUserData = {
  isAuthChecked: true,
  user: testUser,
  error: null
};

export const testUserResponse = {
  success: true,
  user: testUser
};

export const testUserResponseUpdated = {
  success: true,
  user: {
    email: testUser.email,
    name: 'Testt'
  }
};

export const testUserDataUpdated = {
  isAuthChecked: true,
  user: testUserResponseUpdated.user,
  error: null
};

export const testOrder: TOrder = {
  _id: '643d69a5c3f7b9001cfa093a',
  status: 'done',
  name: 'Краторный минеральный люминесцентный бургер',
  createdAt: '2025-01-03T13:37:20.730Z',
  updatedAt: '2024-01-03T13:37:21.166Z',
  number: 64888,
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa093c'
  ]
};

export const testNewOrder = {
  orderRequest: false,
  orderModalData: testOrder,
  error: undefined
};

export const testFeedsData = {
  orders: [
    {
      _id: '643d69a5c3f7b9001cfa093a',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный минеральный люминесцентный бургер',
      createdAt: '2025-01-03T12:37:20.730Z',
      updatedAt: '2024-01-03T12:37:21.166Z',
      number: 64887
    },
    {
      _id: '643d69a5c3f7b9001cfa093a',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный минеральный люминесцентный бургер',
      createdAt: '2025-01-03T13:37:20.730Z',
      updatedAt: '2024-01-03T13:37:21.166Z',
      number: 64888
    },
    {
      _id: '643d69a5c3f7b9001cfa093a',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный минеральный люминесцентный бургер',
      createdAt: '2025-01-03T14:37:20.730Z',
      updatedAt: '2024-01-03T14:37:21.166Z',
      number: 64889
    }
  ],
  total: 3,
  totalToday: 0,
  isLoading: false,
  error: undefined
};

export const testIngredientsData = {
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ],
  loading: false,
  error: null
};

export const testOrdersData = {
  orders: [
    {
      _id: '643d69a5c3f7b9001cfa093a',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный минеральный люминесцентный бургер',
      createdAt: '2025-01-03T12:37:20.730Z',
      updatedAt: '2024-01-03T12:37:21.166Z',
      number: 64887
    },
    {
      _id: '643d69a5c3f7b9001cfa093a',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный минеральный люминесцентный бургер',
      createdAt: '2025-01-03T13:37:20.730Z',
      updatedAt: '2024-01-03T13:37:21.166Z',
      number: 64888
    },
    {
      _id: '643d69a5c3f7b9001cfa093a',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный минеральный люминесцентный бургер',
      createdAt: '2025-01-03T14:37:20.730Z',
      updatedAt: '2024-01-03T14:37:21.166Z',
      number: 64889
    }
  ],
  isLoading: true
};
