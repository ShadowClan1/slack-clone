import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tile from "../../components/Tile";
import { useEffect } from "react";
import axios from "axios";

import NavBar from "../../components/NavBar";
import LastChats from "../../components/LastChats";
import Groups from "../../components/Groups";
import ChatScreen from "../../components/ChatScreen";
import { socket, socketConnect } from "../../socket.io/socket";
import { socketFunctions } from "../../socket.io/functions";
import { setOnlineUsers } from "../../redux/slices/chatscreen";
import { getUser } from "../../localstorage manger/localstorage";
import Notificaton from "../../components/small components/notificaton";

const Home = () => {


  
  
  const visible = useSelector(s=>s.notification.visible)
  
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    if(getUser()) socketConnect();

    socket.on('ONLINE_USERS', (data)=>{
     
      dispatch(setOnlineUsers(data))
    } )
  }, [])

  

  return (
    <div className="flex flex-row   w-screen h-screen  relative">
      <NavBar />

{ visible &&<Notificaton/>}

      <div className="w-1/5 min-w-[180px] hidden md:flex bg-purple-900  h-screen flex-col pt-12 ">
        <div className="h-1/2">
          <Groups />
        </div>
        <div className="h-1/2">
          <LastChats />
        </div>
      </div>

      <div className="bg-white w-full   pt-12 ">
        <ChatScreen />
      </div>
    </div>
  );
};

export default Home;
