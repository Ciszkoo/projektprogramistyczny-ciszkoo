import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { fetchCurrUserPosts, fetchUserPosts } from "./userPostsReducer";

export interface MyData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  id: string;
  avatar: string;
}

export interface OtherUserData extends MyData {
  friendship: Friendship;
}

type Friendship = "none" | "invited" | "invitation" | "friends";

interface FriendshipData {
  friendship: Friendship;
}

export const fetchMyData = createAsyncThunk(
  "user/fetchMyData",
  async (_, thunkApi) => {
    const res = await axios
      .get<MyData>("/api/user")
      .then((res) => res.data)
      .catch((err) => thunkApi.rejectWithValue(err));
    await thunkApi.dispatch(fetchCurrUserPosts(0));
    return res;
  }
);

export const fetchOtherUserData = createAsyncThunk(
  "user/fetchOtherUserData",
  async (id: string, thunkApi) => {
    const res = await axios
      .get<OtherUserData>(`/api/user/${id}`)
      .then((res) => res.data)
      .catch((err) => thunkApi.rejectWithValue(err));
    await thunkApi.dispatch(fetchUserPosts({ id, page: 0 }));
    return res;
  }
);

export const fetchFriendshipStatus = createAsyncThunk(
  "user/fetchFrinedshipStatus",
  async (id: string, thunkApi) => {
    const res = await axios
      .get<FriendshipData>(`/api/friends/friendship/${id}`)
      .then((res) => res.data.friendship)
      .catch((err) => thunkApi.rejectWithValue(err));
    return res;
  }
);

interface UserState {
  me: MyData;
  otherUser: OtherUserData;
  isMe: boolean;
}

const initialState: UserState = {
  me: {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    id: "",
    avatar: "",
  },
  otherUser: {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    id: "",
    avatar: "",
    friendship: "none",
  },
  isMe: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMe(state) {
      state.isMe = true;
    },
    setOtherUser(state) {
      state.isMe = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyData.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(fetchOtherUserData.fulfilled, (state, action) => {
      state.otherUser = action.payload;
    });
    builder.addCase(fetchFriendshipStatus.fulfilled, (state, action) => {
      state.otherUser.friendship = action.payload;
    });
  },
});

export const selectUserRoot = (state: RootState) => state.user;

export const selectMe = (state: RootState) => state.user.me;

export const selectOtherUser = (state: RootState) => state.user.otherUser;

export const selectIsMe = (state: RootState) => state.user.isMe;

export const selectUser = (state: RootState): OtherUserData | MyData =>
  state.user.isMe ? state.user.me : state.user.otherUser;

export const { setMe, setOtherUser } = userSlice.actions;

export default userSlice.reducer;
