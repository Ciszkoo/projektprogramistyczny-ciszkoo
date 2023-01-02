import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const fetchUserData = createAsyncThunk(
  "user/fetchData",
  async (key: string, thunkApi) => {
    const res = await fetch("http://localhost:5000/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    const data = await res.json();
    return await JSON.parse(JSON.stringify(data));
  }
);

interface UserState {
  data: Object;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState = {
  data: Object,
  status: "idle",
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
