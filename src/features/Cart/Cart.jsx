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
  }, [products]);

  return (
    <div className="box-border h-full w-11/12 flex flex-col pt-4 sm:pt-0 justify-center sm:flex-row">
      <div className="bg-white self-start rounded-lg shadow px-4">
        <h2 className="heading">Products</h2>
        <ul className="flex flex-col">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} details={product} />
            ))}
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow px-4 mt-4 sm:mt-0 sm:ml-10 sm:w-3/5">
        <h2 className="heading my-4">Basket</h2>
        {cart.length !== 0 ? (
          <>
            <ul className="flex flex-col">
              {products.map((item) => {
                if (item.quantity !== 0 && item.isInCart)
                  return <CartItem details={item} key={item.id} />;
              })}
            </ul>
            <div>
              <p className="total">
                Sub total: <span>&euro;{cartTotal.toFixed(2)}</span>
              </p>
              <p className="total">
                Savings: <span>&euro;{cartDiscount.toFixed(2)}</span>
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
