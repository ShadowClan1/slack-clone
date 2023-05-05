import { useSelector } from "react-redux";
import { addMessageToArray } from "../redux/slices/messages";
import { socket } from "./socket";


export const socketPrivateMessges = (screen, dispatch) => {
  socket.on("PRIVATE_MESSAGE_R", (data) => {
   

    if (screen.data._id == data.From._id) {
      dispatch(addMessageToArray(data));
    }
  });
};


export const socketFunctions = (state, dispatch) =>{
  socket.on('TYPING_R', (data)=>{
    // if(state.)
    
    console.log(state.chatScreen.single, 'current screen while typing')
  })
}
