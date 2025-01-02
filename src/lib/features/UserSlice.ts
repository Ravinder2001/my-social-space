import { createSlice } from "@reduxjs/toolkit";

export interface SectionState {
  id: string;
  name: string;
  token: string | null;
}

const initialState: SectionState = {
  id: "",
  name: "",
  token: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
