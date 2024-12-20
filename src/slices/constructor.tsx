import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorIngredient',
  initialState,
  reducers: {
    addItem(
      state: TConstructorState,
      action: PayloadAction<TConstructorIngredient>
    ) {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    deleteItem(
      state: TConstructorState,
      action: PayloadAction<TConstructorIngredient>
    ) {
      state.ingredients.filter((item) => item.id !== action.payload.id);
    },
    clearAll(state: TConstructorState) {
      state = initialState;
    }
  },
  selectors: { selectItems: (state: TConstructorState) => state }
});

export const { addItem, deleteItem, clearAll } = constructorSlice.actions;
export const constructorSelector = constructorSlice.selectors;
