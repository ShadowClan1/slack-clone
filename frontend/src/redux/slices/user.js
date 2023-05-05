import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../../axios/axios";
import { setUser } from "../../localstorage manger/localstorage";

const initialState = {success : false};
export const login = createAsyncThunk("LOGIN", async (credentials, thunkApi) => {
  const response = await backend.post("login", credentials);

  if (response.status == 200) {
    setUser(response.data.data)
    return response.data;
  } else return { success: false };
});

const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, {payload})=>{
        return state = payload;
    });
  },
});

export const  {} = user.actions
export default user.reducer