import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../../axios/axios";
import { getUser, setUser } from "../../localstorage manger/localstorage";
import { socket } from "../../socket.io/socket";

const initialState = {success : false, data : {}};
export const login = createAsyncThunk("LOGIN", async (credentials, thunkApi) => {
  const response = await backend.post("login", credentials);

  if (response.status == 200) {
    setUser(response.data.data)
    return response.data;
  } else return { success: false };
});
export const changeProfilePic = createAsyncThunk('CHANGE_PROFILE_PIC', async(fileDetails, thunkAPI)=>{
  
const formData = new FormData();
formData.append('file', fileDetails);
formData.append('id', getUser()._id);
const {data} = await backend.post('changeProfilePicture', formData)

return data
})

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfilesocketIO : (state, {payload})=>{
state.data = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, {payload})=>{
        return state = payload;
    });
    builder.addCase(changeProfilePic.fulfilled, (state, {payload})=>{
        
         socket.emit('PROFILE_PIC_CHANGE', state?.data?._id)
         socket.emit('GET_USER_DATA', state?.data?._id)
    });
  },
});

export const  {setUserProfilesocketIO} = user.actions
export default user.reducer