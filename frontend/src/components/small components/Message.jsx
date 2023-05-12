import React from "react";
import { htmlParser } from "../../common/htmlparser";
import { agoReturn } from "../../common/time";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../../redux/slices/messages";
import { getUser } from "../../localstorage manger/localstorage";

const Message = ({ data }) => {
  const dispatch = useDispatch();
 const handleDeleteMessage = () =>{
  dispatch(deleteMessage({messageId : data._id, senderId : getUser()._id, toId : data.To, toGroup : data.ToGroup}))
 }




  return (
    <div className="flex flex-col px-5 py-3">
      <div className="flex flex-row justify-between">

      <h1 className="text-bold text-purple-900 font-bold text-lg">
        {data?.From?.name} 
      </h1>
      <div className="group relative cursor-context-menu">... 
     {data?.From?._id == getUser()._id && <div className="absolute -left-10 group-hover:flex -bottom-5 bg-slate-100 px-3 text-red-400 hidden cursor-pointer" onClick={handleDeleteMessage} >Delete</div>}
      </div>
      </div>
      <div>{htmlParser(data?.messageText)}</div>
      <p className="text-xs text-slate-400">  {agoReturn(data?.time)} </p>
    </div>
  );
};

export default Message;
