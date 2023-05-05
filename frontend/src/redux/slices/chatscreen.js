import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../../axios/axios";
import { socket } from "../../socket.io/socket";
const initialState = {
  array: [],
  single: {
    type: "",
    data: {},
  },
};
export const getAllUsers = createAsyncThunk("getAllUsers", async (thunkAPI) => {
  const res = await backend.get("/getAllUsers");

  if (res.status == 200) {
    return res.data;
  }
});

export const getUserData = createAsyncThunk("getUser", async (id, thunkAPI) => {
  const res = await backend.get(`/getUser/${id}`);
  if (res.status == 200) {
    return res.data;
  }
});
export const getGroupData = createAsyncThunk(
  "getGroupData",
  async (id, thunkAPI) => {
    const res = await backend.get(`/getGroup/${id}`);
    if (res.status == 200) {
      return res.data;
    }
  }
);

const chatscreen = createSlice({
  name: "chatscreen",
  initialState,
  reducers: {
    createGroup: (state, { payload }) => {
      state.single.type = "CREATE_GROUP";
      state.single.data = {};
    },
    addUnreadChat: (state, { payload }) => {
      state.array.forEach((e) => {
        if (e._id == payload.From._id) {
          if (e.unread) e.unread.push(payload);
          else {
            e.unread = [];
            e.unread.push(payload);
          }
        }
      });
    },
    setUnreadFalse: (state, { payload }) => {
      state.array.forEach((e) => {
        console.log(e._id, payload , "setUnreadFalse")
        if (e._id == payload) {
          e.unread = [];
        }
      });
    },
    getDetails: (state, { payload }) => {
      state.single.type = "DETAILS";
      state.single.data = payload;
      if (payload.CreatedBy) state.single.data.type = "GROUP";
      else state.single.data.type = "USER";
      console.log(payload);
    },
    setOnlineUsers: (state, { payload }) => {
      const set = new Set(payload);
      state.array.forEach((e) => {
        e.online = false;
        if (set.has(e._id)) e.online = true;
      });
    },


  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.array = payload.data;
    });
    builder.addCase(getUserData.fulfilled, (state, { payload }) => {
      console.log(payload.data, "user data");
      state.single.type = "CHAT";
      state.single.data = payload.data;
    });
    builder.addCase(getGroupData.fulfilled, (state, { payload }) => {
      console.log(payload.data, "group data");
      state.single.type = "GROUP";
      state.single.data = payload.data;
    });
  },
});

export const { createGroup, addUnreadChat, setUnreadFalse, getDetails , setOnlineUsers} =
  chatscreen.actions;
export default chatscreen.reducer;
