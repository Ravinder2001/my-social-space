import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PageState {
  index: number;
}

const initialState: PageState = {
  index: 0,
};

export const DrawerSlice = createSlice({
  name: "DrawerSlice",
  initialState,
  reducers: {
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
  },
});

export const { setIndex } = DrawerSlice.actions;

export default DrawerSlice.reducer;
