import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PageState {
  index: number;
  flag: boolean;
}

const initialState: PageState = {
  index: 0,
  flag: false,
};

export const DrawerSlice = createSlice({
  name: "DrawerSlice",
  initialState,
  reducers: {
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    toogleFlag: (state) => {
      state.flag = !state.flag;
    },
  },
});

export const { setIndex, toogleFlag } = DrawerSlice.actions;

export default DrawerSlice.reducer;
