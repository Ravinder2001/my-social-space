import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PageState {
  id: string;
  name: string;
  image: string;
  user: boolean;
}

const initialState: PageState = {
  id: "",
  name: "",
  image: "",
  user: false,
};

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    LoginUser: (
      state,
      action: PayloadAction<{ id: string; name: string; image?: string }>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.image = action.payload.image ?? "";
      state.user = true;
    },
    Logout: (state) => {
      state.id = "";
      state.name = "";
      state.image = "";
      state.user = false;
    },
  },
});

export const { LoginUser, Logout } = UserSlice.actions;

export default UserSlice.reducer;
