import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../redux/slices/popup";
import { loadStripe } from "@stripe/stripe-js";

const PopUp = () => {
  const data = useSelector((state) => state.popup?.data);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(close());
  };
  const increment = () => {
    if (quantity < 10) setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };
  const handleBuy = async () => {
    const dat = await fetch("http://192.168.3.136:5000/buy", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: data.title, price: data.price, quantity }),
    });

    const dataJson = await dat.json();
    console.log(dataJson.data.id);
    const stripe = await loadStripe(
   process.env.REACT_APP_STRIPE_PK
    );

    const result = await stripe.redirectToCheckout({
      sessionId: dataJson.data.id,
    });
    

    if (result.err) console.log(result.err);
  };

  return (
    <div className="absolute flex flex-col bg-white bg-opacity-30 top-0 bottom-0 right-0 left-0 justify-center items-center ">
      <div className="w-64 h-64 bg-white shadow-2xl flex rounded-xl absolute  flex-col items-center justify-evenly">
        <div
          className="absolute top-0 right-0 px-4 py-1 text-white rounded-lg bg-red-500"
          onClick={handleClick}
        >
          x
        </div>

        <div className="px-2"> {data.title}</div>
        <div className="flex flex-row gap-4">
          <div>Rs {data.price}</div>
          <div className="flex flex-row gap-2 rounded-lg bg-slate-100">
            <button
              className="bg-slate-300 px-2 rounded-lg"
              onClick={decrement}
            >
              -
            </button>
            {quantity}
            <button
              className="bg-slate-300 px-2 rounded-lg"
              onClick={increment}
            >
              +
            </button>
          </div>
        </div>

        <div>
          <button className="bg-slate-200 px-3 py-1 rounded-full text-xs hover:scale-110 hover:bg-green-600" onClick={handleBuy}>
            buy for Rs {quantity * data.price}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
