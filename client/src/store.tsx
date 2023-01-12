import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import userPostsReducer from "./reducers/userPostsReducer";


export const store = configureStore({
  reducer: {
    user: userReducer,
    userPosts: userPostsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
