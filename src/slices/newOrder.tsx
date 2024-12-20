import { orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const createNewOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

type TNewOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null | undefined;
};
const initialState: TNewOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state = initialState;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createNewOrder.pending, (state) => {
        state.orderRequest = true;
      });
  }
});
