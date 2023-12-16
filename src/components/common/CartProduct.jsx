import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProductFromCart,
  updateQuantityProductCart,
} from '../../store/slice/cartSlice';

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const token = useSelector((state) => state.user.token);
  const loading = useSelector((state) => state.cart.loading);

  const deleteHandleClick = () => {
    dispatch(deleteProductFromCart({ token, cartProductId: product.cartId }));
  };

  const updateHandleClick = () => {
    dispatch(
      updateQuantityProductCart({ token, cartProductId: product.cartId, quantity }),
    );
  };

  const lessOne = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  return (
    <article className="">
      <div className="flex flex-row gap-10 relative">
        <div className="w-1/4">
          <img src={product.images[0].url} alt={product.title} />
        </div>

        <div>
          <h3>{product.title}</h3>

          <div className="flex flex-row text-xl">
            <button
              className="w-7 h-7 flex flex-row justify-center border border-gray-600"
              onClick={lessOne}
            >
              -
            </button>

            <span className="w-10 h-7 text-center border border-gray-600">
              {quantity}
            </span>

            <button
              className="w-7 h-7 flex flex-row justify-center border border-gray-600"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="absolute right-2 bottom-2 flex gap-2 ">
          <button
            className="bg-cyan-500 text-white rounded p-1"
            onClick={updateHandleClick}
          >
            <i className="bx bxs-cart-add"></i>
          </button>

          <button
            onClick={deleteHandleClick}
            disabled={loading}
            className=" bg-red-500 text-white rounded p-1"
          >
            <i className="bx bxs-trash"></i>
          </button>
        </div>
      </div>

      <p className="text-right mt-2">
        <span className="text-lg font-semibold">Total : </span>
        <span className="text-lg font-bold">
          $ {product.quantity * Number(product.price)}
        </span>
      </p>
    </article>
  );
};

export default CartProduct;
