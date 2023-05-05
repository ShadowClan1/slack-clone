import React from "react";
import { useDispatch } from "react-redux";
import { addData } from "../redux/slices/popup";

const Tile = ({ data }) => {
  const dispatch =  useDispatch();
  const handleClick = () =>{
dispatch(addData(data))
  }





  return (
    <div
      className="hover:scale-105 bg-white pt-2 pb-3 rounded-xl px-2 flex flex-col gap-3 "
      style={{ transitionDuration: "0.5s" }} key={data.id}
    >
      <div className=" w-32 h-32 overflow-hidden  bg-slate-200 rounded-xl "><img src={data.image} /></div>

      <div className="">
        <h1 className="text-center text-sm overflow-hidden h-16 w-32">{data.title}</h1>
        <div className="flex flex-row justify-center items-center mt-2">
          <button className="bg-slate-200 px-3 py-1 rounded-full text-xs hover:scale-110 hover:bg-green-600 " style={{transitionDuration: '0.5s'}} onClick={handleClick}>
            buy for  Rs {data.price}
          </button>
      
        </div>
      </div>
    </div>
  );
};

export default Tile;
