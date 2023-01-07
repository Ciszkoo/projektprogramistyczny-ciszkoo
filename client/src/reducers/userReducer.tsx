import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  id: string;
}

export const fetchUserData = createAsyncThunk(
  "user/fetchData",
  async (_, thunkApi) => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/me");
      const data: UserData = await res.data;
      console.log(data);
      return await JSON.parse(JSON.stringify(data));
    } catch {
      thunkApi.rejectWithValue("Błąd autoryzacji");
    }
  }
);

interface UserState {
  data: Partial<UserData>;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  data: {},
  status: "idle",
};

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
