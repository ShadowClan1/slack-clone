import React, { useEffect } from "react";
import { getUser } from "../localstorage manger/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/slices/chatscreen";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user.data);
  const handleGetProfile = (e) => {
    console.log(user._id);
    dispatch(getProfile(user._id));
  };

  return (
    <div className="flex flex-row bg-purple-900 fixed top-0 w-screen items-center px-5 h-10 justify-end shadow-xl">
      {user && (
        <div
          onClick={handleGetProfile}
          className="flex flex-row gap-2 items-center"
        >
          {" "}
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${user?.profilePic}`}
            alt=""
            className="w-6 h-6 rounded-full outline-double   cursor-pointer"
          />
          <span className="text-white">{user.name}</span>
        </div>
      )}
    </div>
  );
};

export default NavBar;
