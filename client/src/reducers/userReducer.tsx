import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getAuthorized } from "../utils/utils";

interface UserData {
  name: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  iat: number;
  exp: number;
}

export const fetchUserData = createAsyncThunk(
  "user/fetchData",
  async (key: string, thunkApi) => {
    try {
      const res = await getAuthorized("http://localhost:5000/api/users/me", key);
      const data: UserData = await res.json();
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
