import React from "react";
import { Quantity } from "./Quantity";

function CartItem({ details }) {
  const { name, price, quantity, id, discount = 0 } = details;

  return (
    <li className="flex flex-col my-4">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="font-semibold">
          <span className="mr-2 text-gray-500">&#8364;</span>
          {price.toFixed(2)}
        </p>
        <div className="flex flex-col items-end">
          <div className="flex">
            <Quantity quantity={quantity} id={id} />
          </div>
          <p className="flex mt-2 text-gray-500 font-semibold">
            item price
            <span>
              &euro;{price} * {quantity} = &euro;{(quantity * price).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
      {discount !== 0 && (
        <div className="self-end mb-2 text-red-600 text-lg">savings &euro;{discount}</div>
      )}
      <div className="self-end mb-2 text-lg">
        item cost &euro;{(quantity * price - discount).toFixed(2)}
      </div>
    </li>
  );
}
export { CartItem };
