import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PageState {
  isMobile: boolean;
}

const initialState: PageState = {
  isMobile: false,
};

export const TempSlice = createSlice({
  name: "TempSlice",
  initialState,
  reducers: {
    toogleIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export const { toogleIsMobile } = TempSlice.actions;

export default TempSlice.reducer;
