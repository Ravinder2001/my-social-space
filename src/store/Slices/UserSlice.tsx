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
  image:
    "https://scontent.fpgh1-1.fna.fbcdn.net/v/t39.30808-6/328131189_1123663518301123_8970126291371955891_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=itz5bnt_c3QAX_Zil-G&_nc_ht=scontent.fpgh1-1.fna&oh=00_AfBOgQq7z6mw65YinyHSiCANeaJ3getUiFhW5Q8DBJA4Gw&oe=64CAA6D0",
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
      state.user = false;
    },
    ToogleTheme: (state: PageState) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    AddPicture: (state: PageState, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
  },
});

export const { LoginUser, Logout, ToogleTheme, AddPicture } = UserSlice.actions;

export default UserSlice.reducer;
