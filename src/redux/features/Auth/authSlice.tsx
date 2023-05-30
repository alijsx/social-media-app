import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";
import {
  googleSignInHandler,
  googleSignUpHandler,
  signOutHandler,
  signInHandler,
  signUpHandler,
  loggedInUserInfo,
  updateUserDetails,
  followUserHandler,
  unfollowUserHandler,
  profilePicChangeHandler,
} from "./thunk";

type AuthType = {
  currentUser: DocumentData | undefined;
  loading: boolean;
};

const initialState: AuthType = {
  currentUser: undefined,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.currentUser = action.payload;
    },
    signOut: (state) => {
      state.currentUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleSignInHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleSignInHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(googleSignInHandler.rejected, (state) => {
        state.loading = false;
        state.currentUser = undefined;
      })
      .addCase(signUpHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(signUpHandler.rejected, (state) => {
        state.loading = false;
        state.currentUser = undefined;
      })
      .addCase(signOutHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOutHandler.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = undefined;
      })
      .addCase(signOutHandler.rejected, (state) => {
        state.loading = false;
        state.currentUser = undefined;
      })
      .addCase(googleSignUpHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleSignUpHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(googleSignUpHandler.rejected, (state) => {
        state.loading = false;
        state.currentUser = undefined;
      })
      .addCase(loggedInUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(loggedInUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loggedInUserInfo.rejected, (state) => {
        state.loading = false;
        state.currentUser = undefined;
      })
      .addCase(signInHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(signInHandler.rejected, (state) => {
        state.loading = false;
        state.currentUser = undefined;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(updateUserDetails.rejected, (state) => {
        state.loading = false;
        state.currentUser = undefined;
      })
      .addCase(followUserHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(followUserHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(followUserHandler.rejected, (state) => {
        state.loading = false;
        state.currentUser = undefined;
      })
      .addCase(unfollowUserHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(unfollowUserHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(unfollowUserHandler.rejected, (state) => {
        state.loading = false;
        state.currentUser = undefined;
      })
      .addCase(profilePicChangeHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(profilePicChangeHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(profilePicChangeHandler.rejected, (state) => {
        state.loading = false;
        state.currentUser = undefined;
      });
  },
});

export const { signUp } = authSlice.actions;
export default authSlice.reducer;
