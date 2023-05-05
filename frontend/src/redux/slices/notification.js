import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: { title: "", body: "", type: "" },
  visible: false,
};

const notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, { payload }) => {
        console.log(payload)
      state.visible = true;
      state.data.title = payload.title;
      state.data.type = payload.type;
      state.data.body = payload.body;
    },
    closeNotification: (state, { payload }) => {
      state.visible = false;
      state.data = {
        title: "",
        body: "",
        type: "",
      };
    },
  },
});

export const { addNotification, closeNotification } = notification.actions;
export default notification.reducer;
