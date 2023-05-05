import popupReducer from "./slices/popup";
import userReducer from "./slices/user";
import chatScreenReducer from "./slices/chatscreen";
import messagesReducer from "./slices/messages";
import groupReducer from "./slices/group";
import notificationReducer from "./slices/notification"




const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer : {
popup : popupReducer,
user : userReducer,
chatScreen : chatScreenReducer,
messages : messagesReducer,
group : groupReducer,
notification : notificationReducer
    }
    
})

export default store;