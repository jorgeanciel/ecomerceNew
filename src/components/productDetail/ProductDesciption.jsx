import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductToCart, updateQuantityProductCart } from '../../store/slice/cartSlice';

const ProductDesciption = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged, token } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [counter, setCounter] = useState(1);

  const cartProduct = cart.products.find((x) => x.id === product.id);

  const lessOne = () => {
    const newCounter = counter - 1;
    if (newCounter >= 1) setCounter(newCounter);
  };

  const handleAddCart = () => {
    if (!isLogged) navigate('/login');
    else if (cartProduct) {
      dispatch(
        updateQuantityProductCart({
          token,
          cartProductId: cartProduct.cartId,
          quantity: cartProduct.quantity + counter,
        }),
      );
      setCounter(1);
    } else {
      dispatch(addProductToCart({ token, productId: product.id, quantity: counter }));
      setCounter(1);
    }
  };

  return (
    <section className="flex flex-row justify-center">
      <div>
        {product.images.map((img) => (
          <img className="w-40" src={img.url} key={img.id} alt="" />
        ))}
      </div>
      <div className="max-w-xl p-10">
        <section className="pb-10">
          <p className="font-semibold text-gray-400">{product.brand}</p>
          <h1 className="text-3xl text-black font-semibold">{product.title}</h1>

          <p className="mt-5">{product.description}</p>
        </section>
        <section className="flex flex-row gap-32">
          <div>
            <h2 className="font-semibold text-gray-400">Price</h2>
            <p className="text-2xl text-black font-semibold">$ {product.price}</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-400 text-center pb-1">Quantity</h2>
            <div className="flex flex-row">
              <button
                className="w-7 h-7 flex flex-row justify-center border border-gray-600 hover:bg-orange-400"
                onClick={lessOne}
              >
                -
              </button>
              <span className="w-10 text-center border border-gray-600">{counter}</span>
              <button
                className="w-7 h-7 flex flex-row justify-center border border-gray-600 hover:bg-orange-400"
                onClick={() => setCounter(counter + 1)}
              >
                +
              </button>
            </div>
          </div>
        </section>

        <button className="w-full mt-5 p-3 bg-orange-400" onClick={handleAddCart}>
          Add to cart<i className="bx bx-cart-add"></i>
        </button>
      </div>
    </section>
  );
};

export default ProductDesciption;
