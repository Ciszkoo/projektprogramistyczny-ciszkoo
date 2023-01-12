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

export const fetchUserPosts = createAsyncThunk(
  "userPosts/fetchData",
  async (page: number, thunkApi) => {
    const res = await axios
      .get<PostsResponse>(`/api/users/me/status/${page}`)
      .then((res) => res.data.posts)
      .catch((err) => thunkApi.rejectWithValue(err));
    return res;
  }
);

const initialState: Post[] = [];

export const userPostsSlice = createSlice({
  name: "userPosts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.splice(0, state.length);
      action.payload.forEach((p) => state.push(p));
    });
  },
});

export const selectUserPosts = (state: RootState) => state.userPosts;

export default userPostsSlice.reducer;
