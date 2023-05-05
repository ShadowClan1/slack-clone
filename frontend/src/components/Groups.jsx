import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroup, getGroupData } from "../redux/slices/chatscreen";
import { getGroupByUserId, setUnreadFalseG } from "../redux/slices/group";
import { getUser } from "../localstorage manger/localstorage";

const Groups = () => {
  const groups = useSelector((state) => state.group.array);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroupByUserId(getUser()._id));
  }, []);
  const handleSelectGroup = (id) => {
    dispatch(getGroupData(id));
    dispatch(setUnreadFalseG(id));
  };

  const handleCreateGroup = () => {
    dispatch(createGroup());
  };

  return (
    <div className=" ">
      <div className="text-white pl-5 text-lg">Groups</div>

      <div
        className="text-white hover:text-purple-900 group text-xl  hover:bg-white pl-5 py-2 mt-3"
        onClick={handleCreateGroup}
      >
        <span className="px-[8px] group-hover:bg-purple-900 group-hover:text-white text  text-center bg-white rounded-full text-purple-900">
          +
        </span>{" "}
        Create Group{" "}
      </div>
      <div>
        {groups?.map((e) => {
          return (
            <div
              className="px-5 text-slate-300 hover:text-purple-900 hover:bg-white"
              key={e._id}
              onClick={() => handleSelectGroup(e._id)}
            >
              {" "}
              # {e.name}{" "}
              {e?.unread?.length > 0 && (
                <span className="text-xs p-1 rounded-full bg-red-700">
                  {" "}
                  {e?.unread?.length}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Groups;
