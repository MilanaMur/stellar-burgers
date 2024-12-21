import { combineSlices } from '@reduxjs/toolkit';
import { feedsSlice } from '../slices/feeds';
import { ingredientsSlice } from '../slices/ingredients';
import { constructorSlice } from '../slices/constructor';
import { userSlice } from '../slices/user';
import { userOrdersSlice } from '../slices/userOrders';
import { newOrderSlice } from '../slices/newOrder';

export const rootReducer = combineSlices(
  feedsSlice,
  ingredientsSlice,
  constructorSlice,
  userSlice,
  userOrdersSlice,
  newOrderSlice
);
