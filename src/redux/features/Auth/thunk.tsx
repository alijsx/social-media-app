import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInType, SignUpType, EditUserType } from "../../../types";
import {
  getUserById,
  googleSignIn,
  googleSignUp,
  emailPasswordSignUp,
  emailPasswordSignIn,
  userLogout,
  updateUser,
  followUser,
  unfollowUser,
  updatePhotoURL,
} from "./services";

export const signInHandler = createAsyncThunk(
  "auth/user-signin",
  async (signinData: SignInType) => await emailPasswordSignIn(signinData)
);

export const signUpHandler = createAsyncThunk(
  "auth/user-signup",
  async (signupData: SignUpType) => await emailPasswordSignUp(signupData)
);

export const googleSignUpHandler = createAsyncThunk(
  "auth/user-google-signup",
  async () => await googleSignUp()
);

export const googleSignInHandler = createAsyncThunk(
  "auth/user-google-signin",
  async () => await googleSignIn()
);

export const signOutHandler = createAsyncThunk(
  "auth/user-logout",
  async () => await userLogout()
);

export const loggedInUserInfo = createAsyncThunk(
  "auth/user-info",
  async (userId: string) => {
    try {
      return await getUserById(userId);
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "auth/user-update",
  async (editUserData: EditUserType) => await updateUser(editUserData)
);

export const followUserHandler = createAsyncThunk(
  "auth/follow-user",
  async (otherUserId: string) => await followUser(otherUserId)
);

export const unfollowUserHandler = createAsyncThunk(
  "auth/unfollow-user",
  async (otherUserId: string) => await unfollowUser(otherUserId)
);

export const profilePicChangeHandler = createAsyncThunk(
  "auth/user-profilepic",
  async (file: any) => updatePhotoURL(file)
);
