import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PageState {
  index: string;
}

const initialState: PageState = {
  index: "0",
};

export const LoginPageSlice = createSlice({
  name: "LoginPageSlice",
  initialState,
  reducers: {
    setIndex: (state, action: PayloadAction<string>) => {
      state.index = action.payload;
    },
  },
});

export const { setIndex } = LoginPageSlice.actions;

export default LoginPageSlice.reducer;
