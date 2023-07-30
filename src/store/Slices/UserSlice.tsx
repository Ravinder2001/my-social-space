import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PageState {
  id: string;
  name: string;
  image: string;
  user: boolean;
  theme: string;
}

const initialState: PageState = {
  id: "",
  name: "",
  image: "",
  user: false,
  theme: "light",
};

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    LoginUser: (
      state: PageState,
      action: PayloadAction<{ id: string; name: string; image?: string }>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.image = action.payload.image ?? "";
      state.user = true;
    },
    Logout: (state: PageState) => {
      state.id = "";
      state.name = "";
      state.image = "";
      state.user = false;
    },
    ToogleTheme: (state: PageState) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { LoginUser, Logout,ToogleTheme } = UserSlice.actions;

export default UserSlice.reducer;
