import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  id: number;
  name: string;
  profile_picture: string;
}

const initialState: UserState = {
  id: -1,
  name: "",
  profile_picture: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.profile_picture = action.payload.profile_picture;
    },
    setLoggedOutUser: (state) => {
      state.id = -1;
      state.name = "";
      state.profile_picture = "";
    },
    setUserProfilePicture: (state, action) => {
      state.profile_picture = action.payload;
    },
  },
});

export const { setUserDetails, setLoggedOutUser, setUserProfilePicture } = userSlice.actions;

export default userSlice.reducer;
