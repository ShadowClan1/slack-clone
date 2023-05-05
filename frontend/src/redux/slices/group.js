import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../../axios/axios";
const initialState = { array: [], single: {} };

export const getGroupByUserId = createAsyncThunk(
  "getGroupByUserId",
  async (id, thunkAPI) => {
    const res = await backend.get(`/getGroupsByUserId/${id}`);
   
    if(res.status == 200) {
      return res.data.data.Groups
    }
  }
);
export const createGroup = createAsyncThunk(
  "createGroup",
  async (data, thunkAPI) => {
    const res = await backend.post(`/createGroup`, data);

    if(res.status == 200) {
        return res.data
    }
  }
);

const group = createSlice({
  name: "group",
  initialState,
  reducers: {
    selectGroup: (state, { payload }) => {
      state.single = payload;
    },
    addUnreadChatG: (state, { payload }) => {
      state.array.forEach((e) => {
        if (e._id == payload.ToGroup._id) {
           
          if(e.unread) e.unread.push(payload)
          else {e.unread = []; e.unread.push(payload)}
        }
      });
    },
    setUnreadFalseG: (state, { payload }) => {
      state.array.forEach((e) => {
        if (e._id == payload) {
          e.unread = [];
        }
      });
    },

    
  },
  extraReducers: (builder) => {
    builder.addCase(getGroupByUserId.fulfilled, (state, { payload }) => {
      state.array = payload
    });
    builder.addCase(createGroup.fulfilled, (state, { payload }) => {
      state.single = payload;
    });
  },
});

export const {addUnreadChatG, setUnreadFalseG} = group.actions
export default group.reducer
