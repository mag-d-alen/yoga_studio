import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { UserType } from "../types";

type AuthState = {
  access_token: string | null;
  user: UserType | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { access_token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: token,
      }: PayloadAction<{ access_token: string; user: UserType }>
    ) => {
      state.access_token = token.access_token;
      state.user = token.user;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
