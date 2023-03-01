import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { fetchUserPosts } from "./postsReducer";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  id: string;
  avatar: string;
  friendship: Friendship;
}

type Friendship = "none" | "invited" | "invitation" | "friends" | "me";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (id: string, thunkApi) => {
    const res = await axios
      .get<UserData>(`/api/user/${id}`)
      .then((res) => res.data)
      .catch((err) => thunkApi.rejectWithValue(err));
    await thunkApi.dispatch(fetchUserPosts({ id, page: 0 }));
    return res;
  }
);

interface UserState {
  user: UserData;
  myId: string;
  status: "idle" | "loading";
}

const initialState: UserState = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    id: "",
    avatar: "",
    friendship: "none",
  },
  myId: "",
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMyId(state, action) {
      state.myId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state, action) => {
      action.meta.arg !== state.user.id && (state.status = "loading");
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "idle";
    });
  },
});

export const selectUserFetchStatus = (state: RootState) => state.user.status;

export const selectUser = (state: RootState) => state.user.user;

export const selectMyId = (state: RootState) => state.user.myId;

export const { setMyId } = userSlice.actions;

export default userSlice.reducer;
