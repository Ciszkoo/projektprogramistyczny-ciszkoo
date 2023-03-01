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

interface FriendsPostsResponse {
  posts: Post[];
  count: number;
}

export const fetchUserPosts = createAsyncThunk(
  "userPosts/fetchUserPosts",
  async (params: FetchPostsParams, thunkApi) => {
    const res = await axios
      .get<FriendsPostsResponse>(`/api/posts/${params.id}/${params.page}`)
      .then((res) => res.data)
      .catch((err) => thunkApi.rejectWithValue(err));
    return res;
  }
);

export const fetchMoreUserPosts = createAsyncThunk(
  "userPosts/fetchMoreUserPosts",
  async (params: FetchPostsParams, thunkApi) => {
    const res = await axios
      .get<FriendsPostsResponse>(`/api/posts/${params.id}/${params.page}`)
      .then((res) => res.data)
      .catch((err) => thunkApi.rejectWithValue(err));
    return res;
  }
);

export const fetchFriendsPosts = createAsyncThunk(
  "userPosts/fetchFriendsPosts",
  async (page: number, thunkApi) => {
    const res = await axios
      .get<FriendsPostsResponse>(`/api/posts/all/${page}`)
      .then((res) => res.data)
      .catch((err) => thunkApi.rejectWithValue(err));
    return res;
  }
);

export const fetchMoreFriendsPosts = createAsyncThunk(
  "userPosts/fetchMoreFriendsPosts",
  async (page: number, thunkApi) => {
    const res = await axios
      .get<FriendsPostsResponse>(`/api/posts/all/${page}`)
      .then((res) => res.data)
      .catch((err) => thunkApi.rejectWithValue(err));
    return res;
  }
);

export const refreshFriendPost = createAsyncThunk(
  "userPosts/refreshFriendPost",
  async (postId: string, thunkApi) => {
    const res = await axios
      .get<Post>(`/api/posts/single/${postId}`)
      .then((res) => res.data)
      .catch((err) => thunkApi.rejectWithValue(err));
    return res;
  }
);

export const refreshUserPost = createAsyncThunk(
  "userPosts/refreshUserPost",
  async (postId: string, thunkApi) => {
    const res = await axios
      .get<Post>(`/api/posts/single/${postId}`)
      .then((res) => res.data)
      .catch((err) => thunkApi.rejectWithValue(err));
    return res;
  }
);

interface UserPostsState {
  userPosts: Post[];
  userPostsCount: number;
  friendsPosts: Post[];
  friendsPostsCount: number;
}

const initialState: UserPostsState = {
  userPosts: [],
  userPostsCount: 0,
  friendsPosts: [],
  friendsPostsCount: 0,
};

export const userPostsSlice = createSlice({
  name: "userPosts",
  initialState: initialState,
  reducers: {
    deletePost: (state, action) => {
      const index = state.userPosts.findIndex(
        (p) => p.postId === action.payload.postId
      );
      if (index !== -1) {
        state.userPosts.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.userPosts.splice(0, state.userPosts.length);
      action.payload.posts.forEach((p) => state.userPosts.push(p));
      state.userPostsCount = action.payload.count;
    });
    builder.addCase(fetchFriendsPosts.fulfilled, (state, action) => {
      state.friendsPosts.splice(0, state.friendsPosts.length);
      action.payload.posts.forEach((p) => state.friendsPosts.push(p));
      state.friendsPostsCount = action.payload.count;
    });
    builder.addCase(fetchMoreUserPosts.fulfilled, (state, action) => {
      state.userPosts = state.userPosts.concat(action.payload.posts);
    });
    builder.addCase(fetchMoreFriendsPosts.fulfilled, (state, action) => {
      state.friendsPosts = state.friendsPosts.concat(action.payload.posts);
    });
    builder.addCase(refreshFriendPost.fulfilled, (state, action) => {
      const index = state.friendsPosts.findIndex(
        (p) => p.postId === action.payload.postId
      );
      if (index !== -1) {
        state.friendsPosts[index] = action.payload;
      }
    });
    builder.addCase(refreshUserPost.fulfilled, (state, action) => {
      const index = state.userPosts.findIndex(
        (p) => p.postId === action.payload.postId
      );
      if (index !== -1) {
        state.userPosts[index] = action.payload;
      }
    });
  },
});

export const selectFriendsPosts = (state: RootState) =>
  state.userPosts.friendsPosts;

export const selectUserPosts = (state: RootState) => state.userPosts.userPosts;

export const selectFriendsPostsCount = (state: RootState) =>
  state.userPosts.friendsPostsCount;

export const selectUserPostsCount = (state: RootState) =>
  state.userPosts.userPostsCount;

export const { deletePost } = userPostsSlice.actions;

export default userPostsSlice.reducer;
