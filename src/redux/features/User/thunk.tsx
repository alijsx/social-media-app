import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOtherUsers, getUserByUsername } from "./services";

export const getUserInfo = createAsyncThunk(
  "user/user-details",
  async (userId: string) => {
    try {
      return await getUserByUsername(userId);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUsers = createAsyncThunk(
  "user/other-users",
  async (uid: string) => {
    try {
      return await getOtherUsers(uid);
    } catch (error) {
      console.log(error);
    }
  }
);
