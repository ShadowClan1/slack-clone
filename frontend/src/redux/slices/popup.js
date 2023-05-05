const { createSlice } = require("@reduxjs/toolkit");

const initialState = { visible: false, data: {} };
const popup = createSlice({
  name: "popup",
  initialState,
  reducers: {
    addData: (state, { payload }) => {
      state.visible = true;
      state.data = payload;
    },
    close: (state) => {
      state.visible = false;
      state.date = {};
    },
  },
});


export const {addData, close} = popup.actions;
export default popup.reducer
