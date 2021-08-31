import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countTotal } from ".";
import { CartItem, ProductCard } from "../../components";
import "./cart.css";

function Cart() {
  const { products, cart, cartTotal, cartDiscount, finalAmount } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(countTotal());
  }, [cart]);

  return (
    <div className="box-border h-100 w-11/12 flex flex-col justify-center sm:h-5/6 sm:flex-row">
      <div className="bg-white px-4">
        <h2 className="text-2xl sm:text-4xl font-semibold my-4">Products</h2>
        <ul className="flex flex-col">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} details={product} />
            ))}
        </ul>
      </div>
      <div className="bg-white px-4 sm:ml-10 sm:w-3/5">
        <h2 className="text-2xl sm:text-4xl font-semibold mt-4 my-4">Basket</h2>
        {cart.length !== 0 ? (
          <>
            <ul className="flex flex-col">
              {cart.map((item) => {
                if (item.quantity !== 0)
                  return <CartItem details={item} key={item.id} />;
              })}
            </ul>
            <div>
              <p className="total">
                Sub total: <span>&euro;{cartTotal}</span>
              </p>
              <p className="total">
                Savings: <span>&euro;{cartDiscount}</span>
              </p>
              <p className="total">
                Total Amount: <span>&euro;{finalAmount.toFixed(2)}</span>
              </p>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-2xl">No Products</h3>
          </>
        )}
      </div>
    </div>
  );
}
export { Cart };
