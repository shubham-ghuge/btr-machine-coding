import React from "react";
import { useDispatch } from "react-redux";
import { Minus, Plus } from "react-feather";
import { updateQuantity } from "../features/Cart";

function Quantity({ quantity, id }) {
  const dispatch = useDispatch();
  return (
    <div className="flex jusfity-center items-center ml-5 text-sm">
      <button
        className="p-1 ring ring-indigo-600 rounded  font-light hover:bg-indigo-600 hover:text-white transition duration-300 hover:shadow-lg"
        onClick={() => dispatch(updateQuantity({ id, quantity: quantity + 1 }))}
      >
        <Plus />
      </button>
      <p className="mx-2 sm:mx-6 text-lg">{quantity}</p>
      <button
        className="p-1 ring ring-indigo-600 rounded font-NaNlight hover:bg-indigo-600 hover:text-white transition duration-300"
        onClick={() =>
          dispatch(updateQuantity({ id, quantity: quantity - 1, flag: false }))
        }
      >
        <Minus />
      </button>
    </div>
  );
}
export { Quantity };
