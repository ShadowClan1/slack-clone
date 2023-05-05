import { io } from "socket.io-client";
import { getUser } from "../localstorage manger/localstorage";

export const socket = io("http://192.168.3.136:5000", { autoConnect: false });

export const socketConnect = () => {
  if (getUser()) {
    socket.auth = {
      userId: getUser()._id,
      groups : getUser().Groups
    };
    socket.connect();
  }
};
