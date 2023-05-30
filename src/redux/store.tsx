import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import userReducer from "./features/User/usersSlice";
import postsReducer from "./features/Posts/postsSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
