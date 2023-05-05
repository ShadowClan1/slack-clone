import React from "react";
import { htmlParser } from "../../common/htmlparser";

const Message = ({ data }) => {
  const timeConverter = (time) => {
    const date = new Date(time);
    return `${
      date.getHours().toString().length < 2
        ? "0" + date.getHours().toString()
        : date.getHours()
    }:${
      date.getMinutes().toString().length < 2
        ? "0" + date.getMinutes().toString()
        : date.getMinutes()
    } -- ${date.getFullYear()}-${
      (date.getMonth() + 1).toString().length < 2
        ? "0" + (date.getMonth() + 1).toString()
        : date.getMonth() + 1
    }-${
      date.getDate().toString().length < 2
        ? "0" + date.getDate().toString()
        : date.getDate()
    }`;
  };

const agoReturn = (time) => {
const date = new Date().getTime()
const dateOld = new Date(time).getTime()
let agoTiming =  (date - dateOld)/(24 * 60 * 60 * 1000)
if(agoTiming < 1) {
  agoTiming  = agoTiming *24
  if(agoTiming >= 1){return `${Math.floor(agoTiming) } hours ago`}

  agoTiming = agoTiming * 60 
  
  if(agoTiming >= 1 ) {return `${Math.floor(agoTiming) } minutes ago`}
  agoTiming = agoTiming * 60 

  if(agoTiming >= 1 ) {return `${Math.floor(agoTiming) } seconds ago`}
} 
if(agoTiming > 1) return `${Math.floor(agoTiming)} days ago`

}


  return (
    <div className="flex flex-col px-5 py-3">
      <h1 className="text-bold text-purple-900 font-bold text-lg">
        {data?.From?.name}
      </h1>
      <div>{htmlParser(data?.messageText)}</div>
      <p className="text-xs text-slate-400">  {agoReturn(data?.time)} </p>
    </div>
  );
};

export default Message;
