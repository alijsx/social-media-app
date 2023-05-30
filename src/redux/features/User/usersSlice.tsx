import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import { getUserInfo, getUsers } from "./thunk";

type UsersType = {
  user: DocumentData | undefined;
  loading: boolean;
  otherUsers: DocumentData[] | undefined;
};

const initialState: UsersType = {
  user: undefined,
  loading: false,
  otherUsers: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.loading = false;
        state.user = undefined;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.otherUsers = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
        state.otherUsers = [];
      });
  },
});

export default usersSlice.reducer;
