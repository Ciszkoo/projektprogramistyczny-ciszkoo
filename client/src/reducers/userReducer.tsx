import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { fetchUserPosts } from "./userPostsReducer";

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

export const fetchUserData = createAsyncThunk(
  "user/fetchData",
  async (_, thunkApi) => {
    const res = await axios
      .get<UserDataResponse>("http://localhost:5000/api/users/me")
      .then((res) => res.data)
      .catch((err) => thunkApi.rejectWithValue(err));
    await thunkApi.dispatch(fetchUserPosts(0));
    return res;
  }
);

interface UserState {
  data: Partial<UserData>;
}

const initialState: UserState = {
  data: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
