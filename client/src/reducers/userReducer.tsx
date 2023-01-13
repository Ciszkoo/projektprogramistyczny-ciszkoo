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
      .post<UserDataResponse>(`/api/user/${id}`)
      .then((res) => res.data)
      .catch((err) => thunkApi.rejectWithValue(err));
    await thunkApi.dispatch(fetchUserPosts({ id, page: 0 }));
    return res;
  }
);

interface UserState {
  current: Partial<UserData>;
  temp: Partial<UserData>;
  picked: boolean;
}

const initialState: UserState = {
  current: {},
  temp: {},
  picked: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurr(state) {
      state.picked = true;
    },
    setOther(state) {
      state.picked = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrUserData.fulfilled, (state, action) => {
      state.current = action.payload;
    });
    builder.addCase(fetchTempUserData.fulfilled, (state, action) => {
      state.temp = action.payload;
    });
  },
});

export const selectUser = (state: RootState) => state.user;

export const selectCurrUser = (state: RootState) => state.user.current;

export const selectIsCurrentUser = (state: RootState) => state.user.picked;

export const selectVisibleUser = (state: RootState) =>
  state.user.picked ? state.user.current : state.user.temp;

export const { setCurr, setOther } = userSlice.actions;

export default userSlice.reducer;
