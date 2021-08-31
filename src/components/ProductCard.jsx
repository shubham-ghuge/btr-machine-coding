import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/Cart";

function ProductCard({ details }) {
  const { name, price, isInCart } = details;
  const dispatch = useDispatch();

  return (
    <li className="flex justify-between items-center sm:w-64 my-2 border-b border-gray-300 pb-4 font-semibold">
      <h3>{name}</h3>
      <div>
        <span className="mr-2 text-gray-400">&#8364;</span>
        <span>{price.toFixed(2)}</span>
        <button
          className="px-4 py-1 ml-4 ring ring-indigo-600 rounded text-lg font-light hover:bg-indigo-600 hover:text-white transition duration-300 hover:shadow-lg"
          style={
            isInCart
              ? {
                  "--tw-ring-opacity": 0,
                  backgroundColor: "rgba(209, 213, 219,1)",
                  pointerEvents: "none",
                }
              : {}
          }
          onClick={() => dispatch(addToCart({ id: details.id }))}
        >
          {isInCart ? "Added" : "Add"}
        </button>
      </div>
    </li>
  );
}
export { ProductCard };
