import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FooterBox from "./FooterBox";
import Messages from "./Messages";
import {
  addMessageToArray,
  getChat,
  getGroupChat,
} from "../redux/slices/messages";
import { getUser } from "../localstorage manger/localstorage";
import { socket } from "../socket.io/socket";
import Multipurpose from "./Multipurpose";
import { htmlParser } from "../common/htmlparser";
import { socketPrivateMessges } from "../socket.io/functions";
import { useLocation, useNavigate } from "react-router-dom";
import { addUnreadChat, getDetails } from "../redux/slices/chatscreen";
import { addUnreadChatG } from "../redux/slices/group";
import sendNotification from "../common/notifications";
import { addNotification, closeNotification } from "../redux/slices/notification";

const ChatScreen = () => {
  const navigate = useNavigate();
  const screen = useSelector((state) => state.chatScreen.single);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.array);
  const [metaData, setMetaData] = useState({ typing: "" });
  const { pathname } = useLocation();
  const [variable, setVariable] = useState(screen);
  const [typing, setTyping] = useState({ data: "", name: "" });

  const handleGetDetails = () => {
    if (screen.type == "GROUP")
      socket.emit("GET_GROUP_DETAILS", screen.data._id);
    if (screen.type == "CHAT")
      socket.emit("GET_USER_DETAILS", screen.data._id);

 if(screen.type == 'GROUP')   socket.on("GET_GROUP_DETAILS_R", (data) => {
  console.log(data)
  dispatch(getDetails(data));  socket.off("GET_GROUP_DETAILS_R")
 }); 
 if(screen.type == 'CHAT')   socket.on("GET_USER_DETAILS_R", (data) => {
  console.log(data)
  dispatch(getDetails(data));  socket.off("GET_USER_DETAILS_R")
 }); 
  };

  useEffect(() => {
    if (screen.type == "CHAT") {
      dispatch(getChat({ From: screen.data._id, To: getUser()._id }));
    }
    if (screen.type == "GROUP") {
      dispatch(getGroupChat({ ToGroup: screen.data._id }));
    }

    socket.off("GROUP_MESSAGE_R").on("GROUP_MESSAGE_R", (data) => {
      // sendNotification(data.messageText, data.ToGroup.name)
    dispatch(addNotification({title : data.ToGroup.name, body : data.messageText, type : 'GROUP'}))
setTimeout(()=>{dispatch(closeNotification())}, 4000);

      if (screen.data._id == data.ToGroup._id) {
        dispatch(addMessageToArray(data));
      } else dispatch(addUnreadChatG(data));
    });

    socket.off("PRIVATE_MESSAGE_R").on("PRIVATE_MESSAGE_R", (data) => {
      // sendNotification(data.messageText, data.From.name)
    console.log(data, screen);
      dispatch(addNotification({title : data?.From?.name, body : data.messageText, type : 'USER'}))
      setTimeout(()=>{dispatch(closeNotification())}, 4000);

      if (screen.data._id == data.From._id) {
        dispatch(addMessageToArray(data));
      } else {
        dispatch(addUnreadChat(data));
      }
    });

    socket.off("TYPING_R").on("TYPING_R", (data) => {
      if (screen.type == "CHAT" && screen.data._id == data.From._id)
        setTyping({ data: data.messageText, name: data.From.name });

      setTimeout(() => setTyping({ name: "", data: "" }), 2000);
    });
  }, [screen.data._id, screen.type]);

  return (
    <div className="flex flex-col relative">
      {(screen.type == "CHAT" || screen.type == "GROUP") && (
        <>
          <div className=" px-4  flex flex-row gap-3 items-baseline ">
            {" "}
            <span className="text-xl" onClick={handleGetDetails}>
              {" "}
              {screen.data.name.toUpperCase()}{" "}
            </span>{" "}
            <div className="text-xs text-purple-900  ">
              {typing.name.length > 1 && `is Typing something `}{" "}
            </div>
          </div>
          <Messages messages={messages} />
          <FooterBox />{" "}
        </>
      )}
      {(screen.type == "CREATE_GROUP" || screen.type == 'DETAILS') && (
        <>
          

          <Multipurpose />
          {/* <Messages messages={messages} />
          <FooterBox />{" "} */}
        </>
      )}
    </div>
  );
};

export default ChatScreen;
