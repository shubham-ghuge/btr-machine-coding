import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from ".";
import { Minus, Plus } from "react-feather";

function Cart() {
  const { products, cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col sm:flex-row h-100 sm:h-5/6 box-border w-11/12 justify-center">
      <div className="bg-white px-4 ">
        <h2 className="text-2xl sm:text-4xl font-semibold my-4">Products</h2>
        <ul className="flex flex-col">
          {products &&
            products.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center sm:w-64 my-2 border-b border-gray-300 pb-4 font-semibold"
              >
                <h3>{product.name}</h3>
                <div>
                  <span className="mr-2 text-gray-400">&#8364;</span>
                  <span>{product.price.toFixed(2)}</span>
                  <button
                    className="px-4 py-1 ml-4 ring ring-indigo-600 rounded text-lg font-light hover:bg-indigo-600 hover:text-white transition duration-300 hover:shadow-lg"
                    style={
                      product.isInCart
                        ? {
                            "--tw-ring-opacity": 0,
                            backgroundColor: "rgba(209, 213, 219,1)",
                          }
                        : {}
                    }
                    onClick={() => dispatch(addToCart({ id: product.id }))}
                    disabled={product.isInCart ? true : false}
                  >
                    {product.isInCart ? "Added" : "Add"}
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="bg-white px-4 mt-4 sm:ml-10">
        <h2 className="text-2xl sm:text-4xl font-semibold my-4">Basket</h2>
        <ul className="flex flex-col">
          {cart.length !== 0 &&
            products.map((product) => {
              if (product.isInCart && product.quantity !== 0)
                return (
                  <li key={product.id} className="flex justify-around my-4">
                    <h3>{product.name}</h3>
                    <div className="flex">
                      <span className="mr-2 text-gray-400">&#8364;</span>
                      <span>{product.price.toFixed(2)}</span>
                      <div className="flex jusfity-center items-center ml-5 text-sm">
                        <button
                          className="p-1 ring ring-indigo-600 rounded  font-light hover:bg-indigo-600 hover:text-white transition duration-300 hover:shadow-lg"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: product.id,
                                quantity: product.quantity + 1,
                              })
                            )
                          }
                        >
                          <Plus />
                        </button>
                        <span className="mx-2">{product.quantity}</span>
                        <button
                          className="p-1 ring ring-indigo-600 rounded  font-light hover:bg-indigo-600 hover:text-white transition duration-300 hover:shadow-lg"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: product.id,
                                quantity: product.quantity - 1,
                              })
                            )
                          }
                        >
                          <Minus />
                        </button>
                      </div>
                    </div>
                  </li>
                );
            })}
        </ul>
      </div>
    </div>
  );
}
export { Cart };
