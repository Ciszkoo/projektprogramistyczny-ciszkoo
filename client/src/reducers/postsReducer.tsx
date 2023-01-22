import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface Post {
  userId: string;
  firstName: string;
  lastName: string;
  avatar: string;
  postId: string;
  content: string;
  at: number;
  privacy: "public" | "friends" | "private";
  image: string; // TODO: display in Post component
  likes: number;
  liked: boolean;
  comments: Comment[];
}

export interface Comment {
  at: number;
  id: string;
  content: string;
  userId: string;
  avatar: string;
  firstName: string;
  lastName: string;
  likes: number;
  liked: boolean;
}

interface FetchPostsParams {
  id: string;
  page: number;
}

export const fetchUserPosts = createAsyncThunk(
  "userPosts/fetchUserPosts",
  async (params: FetchPostsParams, thunkApi) => {
    const res = await axios
      .get<Post[]>(`/api/posts/${params.id}/${params.page}`)
      .then((res) => res.data)
      .catch((err) => thunkApi.rejectWithValue(err));
    return res;
  }
);

export const fetchFriendsPosts = createAsyncThunk(
  "userPosts/fetchFriendsPosts",
  async (page: number, thunkApi) => {
    const res = await axios
      .get<Post[]>(`/api/posts/all/${page}`)
      .then((res) => res.data)
      .catch((err) => thunkApi.rejectWithValue(err));
    return res;
  }
);

interface UserPostsState {
  userPosts: Post[];
  friendsPosts: Post[];
}

const initialState: UserPostsState = {
  userPosts: [],
  friendsPosts: [],
};

export const userPostsSlice = createSlice({
  name: "userPosts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.userPosts.splice(0, state.userPosts.length);
      action.payload.forEach((p) => state.userPosts.push(p));
    });
    builder.addCase(fetchFriendsPosts.fulfilled, (state, action) => {
      state.friendsPosts.splice(0, state.friendsPosts.length);
      action.payload.forEach((p) => state.friendsPosts.push(p));
    });
  },
});

export const selectFriendsPosts = (state: RootState) =>
  state.userPosts.friendsPosts;

export const selectUserPosts = (state: RootState) => state.userPosts.userPosts;

export default userPostsSlice.reducer;
