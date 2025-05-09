import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { MessageType } from "@/components/utils/CommanTypes";

export interface UserState {
  channel_id: number | null;
  newMsg: MessageType | null;
}

const initialState: UserState = {
  channel_id: null,
  newMsg: null,
};

export const msgSlice = createSlice({
  name: "msgSlice",
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.channel_id = action.payload;
    },
    setNewMessage: (state, action) => {
      state.newMsg = action.payload;
    },
  },
});

export const { setActiveChannel, setNewMessage } = msgSlice.actions;
export const selectCurrentToken = (state: RootState) => state.user.token;

export default msgSlice.reducer;
