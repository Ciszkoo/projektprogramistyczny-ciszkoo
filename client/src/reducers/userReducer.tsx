import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { fetchCurrUserPosts, fetchUserPosts } from "./userPostsReducer";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  id: string;
  avatar: string;
}

type UserDataResponse = UserData;

export const fetchCurrUserData = createAsyncThunk(
  "user/fetchCurrData",
  async (_, thunkApi) => {
    // IDK WHICH VERSION IS BETTER
    // try {
    //   const { data } = await axios.get<UserDataResponse>("/api/user/me");
    //   await thunkApi.dispatch(fetchUserPosts(0));
    //   return data;
    // } catch (error) {
    //   thunkApi.rejectWithValue(error);
    // }
    const res = await axios
      .get<UserDataResponse>("/api/user/me")
      .then((res) => res.data)
      .catch((err) => thunkApi.rejectWithValue(err));
    await thunkApi.dispatch(fetchCurrUserPosts(0));
    return res;
  }
);

export const fetchTempUserData = createAsyncThunk(
  "user/fetchTempData",
  async (id: string, thunkApi) => {
    const res = await axios
      .get<UserDataResponse>(`/api/user/${id}`)
      .then((res) => res.data)
      .catch((err) => thunkApi.rejectWithValue(err));
    await thunkApi.dispatch(fetchUserPosts({ id, page: 0 }));
    return res;
  }
);

interface UserState {
  me: Partial<UserData>;
  otherUser: Partial<UserData>;
  isMe: boolean;
}

const initialState: UserState = {
  me: {},
  otherUser: {},
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
    builder.addCase(fetchCurrUserData.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(fetchTempUserData.fulfilled, (state, action) => {
      state.otherUser = action.payload;
    });
  },
});

export const selectUserRoot = (state: RootState) => state.user;

export const selectMe = (state: RootState) => state.user.me;

export const selectIsMe = (state: RootState) => state.user.isMe;

export const selectUser = (state: RootState) =>
  state.user.isMe ? state.user.me : state.user.otherUser;

export const { setMe, setOtherUser } = userSlice.actions;

export default userSlice.reducer;
