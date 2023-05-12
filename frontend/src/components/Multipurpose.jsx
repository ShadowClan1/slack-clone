import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "../redux/slices/group";
import { getUser } from "../localstorage manger/localstorage";
import { FiEdit2 } from "react-icons/fi";
import { AiFillCheckCircle, AiFillDelete } from "react-icons/ai";
import { changeProfilePic } from "../redux/slices/user";

const Multipurpose = () => {
  const imageRef = useRef(null);
  const type = useSelector((state) => state.chatScreen.single.type);
  const data = useSelector((state) => state.chatScreen.single.data);
  const users = useSelector((state) => state.chatScreen.array);

  const [img, setImg] = useState(
    data?.profilePic
  );
  const dispath = useDispatch();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [group, setGroup] = useState("");
  const [profilePicture, setProfilePicture] = useState();
  const isInside = (arr1, element) => {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] == element) {
        return true;
      }
    }
    return false;
  };
  const nameReturn = (id) => {
    return users.filter((e) => e._id == id)[0].name;
  };

  const setName = (e) => {
    setGroup(e.target.value);
  };

  const addToGroup = (id) => {
    if (!isInside(selectedUsers, id)) setSelectedUsers([...selectedUsers, id]);
    else setSelectedUsers(selectedUsers.filter((e) => e != id));
    console.log(selectedUsers);
  };
  const handleCreate = () => {
    dispath(
      createGroup({
        name: group,
        Members: selectedUsers,
        CreatedBy: getUser()._id,
      })
    );
  };
  const handleChangeProfilePicture = () => {
    imageRef.current.click();
  };
  const profilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
    setImg(URL.createObjectURL(e.target.files[0]));
  };
  const changeProfilePicture = () => {
    dispath(changeProfilePic(profilePicture));
    setProfilePicture();
  };
  return (
    <>
      <div>
        {type == "CREATE_GROUP" && (
          <>
            <div className="name px-4 ">Create Group</div>
            <div className="ml-5">
              Enter name of Group :{" "}
              <input
                type="text"
                onChange={setName}
                value={group}
                className="bg-slate-100 outline-[0.5px] px-3 py-1 outline-purple-900 ml-5"
              />
            </div>

            <div className=" flex flex-col ml-2 ">
              <div className="mt-10 ml-5">
                {" "}
                <span className="bg-purple-900 text-white px-[6px] rounded-full">
                  +
                </span>{" "}
                Add Participants
              </div>
              <div className="flex flex-col gap-[1px]  mt-5  h-52 overflow-y-scroll ">
                {users?.map((e) => {
                  return (
                    <div
                      onClick={() => addToGroup(e._id)}
                      key={e._id}
                      className={`${
                        isInside(selectedUsers, e._id)
                          ? "   bg-purple-900 text-white"
                          : ""
                      } px-4 py-2 rounded-sm `}
                    >
                      {e.name}
                    </div>
                  );
                })}
              </div>
              Added participants
              <div className="flex flex-row gap-3 flex-wrap mb-5 text-purple-900  font-bold">
                {selectedUsers.map((e) => (
                  <div key={e}>{nameReturn(e)}</div>
                ))}
              </div>
              <div>
                <button
                  className="bg-purple-900 px-3 py-1 rounded text-white disabled:bg-slate-300 disabled:text-slate-500"
                  onClick={handleCreate}
                  disabled={selectedUsers.length < 1 || group.length < 1}
                >
                  {" "}
                  + Create Group{" "}
                </button>
              </div>
            </div>
          </>
        )}

        {type == "DETAILS" && data?.type == "GROUP" && (
          <div className="">
            <div className="flex flex-col gap-3 ">
              <h1 className="mt-5 px-5 text-xl">{data?.name}</h1>

              <div className="flex flex-col pl-5 gap-3 h-32 overflow-y-scroll max-w-screen overflow-x-hidden">
                {data?.Members?.map((e) => {
                  return (
                    <div
                      className="flex flex-row gap-4 items-center hover:bg-purple-700 hover:text-white "
                      style={{ transitionDuration: "0.5s" }}
                    >
                      <img
                        src={`${process.env.REACT_APP_IMAGES_URL}/${data?.profilePic}`}
                        alt=""
                        className="w-4 h-4 rounded-full "
                      />

                      <h1>{e?.name}</h1>
                    { data?.CreatedBy?._id == getUser()._id && <span className="hover:bg-red-400 rounded-xl p-1 absolute right-5 "><AiFillDelete/></span>}
                    </div>
                  );
                })}
              </div>

              <div className="pl-5 text-slate-500 text-xs">
                created by : {data?.CreatedBy?.name}{" "}
              </div>

              <div className="pl-5">media</div>
              <div className="pl-5 flex flex-row items-center gap-3">
                {data?.Members?.map((e) => {
                  return (
                    <div
                      className="w-24 h-24 bg-purple-300 rounded-xl hover:scale-105"
                      style={{ transitionDuration: "0.5s" }}
                    >
                      {" "}
                      {e.name}{" "}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {type == "DETAILS" && data?.type == "USER" && (
          <div className="flex flex-row">
            <div className="flex flex-col gap-3 w-3/4">
              <h1 className="mt-5 px-5 text-xl">{data?.name}</h1>
              <h1 className="mt-5 px-5 text-xl">{data?.email}</h1>
              <h1 className="mt-5 px-5 text-xl">{data?.mobile}</h1>
            </div>
            <div>
              <img
                src="https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg"
                alt=""
                className="w-32 rounded-xl mt-5"
              />
            </div>
          </div>
        )}
        {type == "PROFILE" && (
          <div className="flex flex-row" >
            <div className="flex flex-col gap-3 w-3/4 ">
              <h1 className="mt-5 px-5 text-xl">{data?.name}</h1>
              <h1 className="mt-5 px-5 text-xl">{data?.email}</h1>
              <h1 className="mt-5 px-5 text-xl">{data?.mobile}</h1>
            </div>
            <div className="relative">
              <img src={img == undefined ? `${process.env.REACT_APP_IMAGES_URL}/${data?.profilePic}` : img} alt="" className="w-32 h-32 rounded-xl mt-5" />
              <span
                className="absolute right-0 bottom-4 rounded-full text-purple-900 bg-white p-2 hover:text-white hover:bg-purple-900"
                onClick={handleChangeProfilePicture}
              >
                {" "}
                <FiEdit2 />{" "}
              </span>
              <input
                type="file"
                name="file"
                id="file"
                className=" hidden "
                onChange={profilePictureChange}
                ref={imageRef}
              />
              {profilePicture && (
                <button
                  onClick={changeProfilePicture}
                  className="bg-white p-[1px] rounded-full text-5xl absolute hover:text-white hover:bg-purple-900  text-purple-900 "
                >
                  <AiFillCheckCircle />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Multipurpose;
