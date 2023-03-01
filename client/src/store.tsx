import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import postsReducer from "./reducers/postsReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userPosts: postsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
