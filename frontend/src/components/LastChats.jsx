import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUsers, getUserData, setUnreadFalse } from "../redux/slices/chatscreen";
import { useDispatch } from "react-redux";

const LastChats = () => {
  const dispath = useDispatch();
  const lastChats = useSelector((state) => state.chatScreen.array);

  const setChat = (data) => {
    dispath(getUserData(data._id));
    if(data?.unread?.length > 0 ) dispath(setUnreadFalse(data._id))
  };

  useEffect(() => {
    dispath(getAllUsers());
    
   

  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="pl-5 text-lg text-white">Users</div>
        {lastChats?.map((e) => {
          return (
            <div
              key={e._id}
              className="px-5 text-white flex flex-row gap-2 hover:bg-white hover:text-purple-900 py-1"
              onClick={() => setChat(e)}
            >
              <img src="https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg" alt="alt" className="w-5 h-5 rounded" />
              <h1 className="relative w-full">{e.name}  {e?.online == true && <span className="  bg-green-400  rounded-full absolute  -left-4 w-2 h-2 bottom-0"></span>}
              
             

              
               {e?.unread?.length > 0  && ( <span className="text-xs px-2 py-[2pxs] rounded-full text-purple-900 bg-white absolute bottom-0 right-0" > {e?.unread?.length}</span>  )}
              
               
               
               
               </h1>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LastChats;
