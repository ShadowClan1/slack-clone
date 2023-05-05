import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendGroupMessageIO,
  sendMessage,
  sendMessageSocketIO,
  typing,
} from "../redux/slices/messages";
import { getUser } from "../localstorage manger/localstorage";

const FooterBox = () => {
  const dispatch = useDispatch();
  const to = useSelector((s) => s.chatScreen.single.data);
  const type = useSelector((s) => s.chatScreen.single.type);
  const textInsideTextBox = () => {
    if (type == "CHAT") dispatch(typing({...messageData, type : 'CHAT' }));
    if (type == "GROUP") dispatch(typing({...messageData, type : 'GROUP'}));
  };

  const [message, setMessage] = useState({ messageText: "" });
  const messageData = {
    From: getUser(),
    To: to,

    messageText: message.messageText,
    time: new Date().getTime(),
  };

  const handleSend = () => {
    if (type == "CHAT") dispatch(sendMessageSocketIO(messageData));
    if (type == "GROUP") dispatch(sendGroupMessageIO(messageData));
    setMessage({...message, messageText : ''})
  };

  return (
    <div className="fixed bottom-0 flex flex-row items-center    w-full">
      <div className="relative w-[100%] md:w-[83%]  ">
        <CKEditor
          onChange={(event, editor) => {
            setMessage({ ...message, messageText: editor.getData() });
            textInsideTextBox()
          }}
          data={message.messageText}
          editor={ClassicEditor}
        />{" "}
        <button
          className="bg-purple-900 text-white px-3 py-2 rounded justify-center absolute bottom-0 right-0"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default FooterBox;
