import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserState {
  id: number;
  name: string;
  profile_picture: string;
  token: string;
}

const initialState: UserState = {
  id: -1,
  name: "",
  profile_picture: "",
  token: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.profile_picture = action.payload.profile_picture;
      state.token = action.payload.authToken;
    },
    setLoggedOutUser: (state) => {
      state.id = -1;
      state.name = "";
      state.profile_picture = "";
      state.token = "";
    },
    setUserProfilePicture: (state, action) => {
      state.profile_picture = action.payload;
    },
  },
});

export const { setUserDetails, setLoggedOutUser, setUserProfilePicture } = userSlice.actions;
export const selectCurrentToken = (state:RootState) => state.user.token;

export default userSlice.reducer;
