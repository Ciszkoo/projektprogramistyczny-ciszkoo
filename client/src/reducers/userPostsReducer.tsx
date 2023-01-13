import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface Post {
  userId: string;
  firstName: string;
  lastName: string;
  at: number;
  id: string;
  content: string;
}

interface PostsResponse {
  posts: Post[];
}

interface UserData {
  id: string;
  page: number;
}

export const fetchCurrUserPosts = createAsyncThunk(
  "userPosts/fetchCurrData",
  async (page: number, thunkApi) => {
    const res = await axios
      .get<PostsResponse>(`/api/user/me/status/${page}`)
      .then((res) => res.data.posts)
      .catch((err) => thunkApi.rejectWithValue(err));
    return res;
  }
);

export const fetchUserPosts = createAsyncThunk(
  "userPosts/fetchData",
  async (data: UserData, thunkApi) => {
    const res = await axios
      .get<PostsResponse>(`/api/user/${data.id}/status/${data.page}`)
      .then((res) => res.data.posts)
      .catch((err) => thunkApi.rejectWithValue(err));
    return res;
  }
);

interface UserPostsState {
  currentUserPosts: Post[];
  userPosts: Post[];
}

const initialState: UserPostsState = {
  currentUserPosts: [],
  userPosts: [],
};

export const userPostsSlice = createSlice({
  name: "userPosts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrUserPosts.fulfilled, (state, action) => {
      state.currentUserPosts.splice(0, state.currentUserPosts.length);
      action.payload.forEach((p) => state.currentUserPosts.push(p));
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.userPosts.splice(0, state.userPosts.length);
      action.payload.forEach((p) => state.userPosts.push(p));
    });
  },
});

export const selectUserPosts = (state: RootState) =>
  state.user.picked
    ? state.userPosts.currentUserPosts
    : state.userPosts.userPosts;

export default userPostsSlice.reducer;
