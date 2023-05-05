import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../../axios/axios";
import { socket } from "../../socket.io/socket";
const initialState = {
  array: [
    // {
    //   from: { name: "Radha" },
    //   to: { id: "644f8993f934c3c3a10f70a3", name: "krishna" },
    //   messageType: 0,
    //   messageText: "hare krishna",
    //   file: null,
    //   time: "1682945378523",
    // },
  ],
};

export const getChat = createAsyncThunk("getChat", async (data, thunkAPI) => {
  const res = await backend.post(`/getChat`, data);

  if (res.status == 200) {
    return res.data;
  }
});
export const getGroupChat = createAsyncThunk(
  "getGroupChat",
  async (data, thunkAPI) => {
    const res = await backend.post(`/getGroupChat`, data);
    if (res.status == 200) {
      return res.data;
    }
  }
);
export const sendMessage = createAsyncThunk(
  "sendMessage",
  async (data, thunkAPI) => {
    const res = await backend.post(`/sendMessage`, data);
    console.log(res);
    if (res.status == 200) {
      return res.data;
    }
  }
);

const messages = createSlice({
  name: "messages",
  initialState,
  reducers: {
    sendMessageSocketIO: (state, { payload }) => {
      socket.emit("PRIVATE_MESSAGE", payload);

      state.array.push(payload);
    },
    sendGroupMessageIO: (state, { payload }) => {
      socket.emit("GROUP_MESSAGE", payload);

      state.array.push(payload);
    },
    addMessageToArray: (state, { payload }) => {
      console.log("added");
      state.array.push(payload);
    },
    typing : (state , {payload}) =>{
    //  console.log(payload, "Typing")
      socket.emit("TYPING", payload);

    }
  },
  extraReducers: (builder) => {
    builder.addCase(getChat.fulfilled, (state, { payload }) => {
      state.array = payload.data;
    });
    builder.addCase(getGroupChat.fulfilled, (state, { payload }) => {
      state.array = payload.data;
    });
  },
});

export const { sendMessageSocketIO, addMessageToArray, sendGroupMessageIO , typing} =
  messages.actions;
export default messages.reducer;
