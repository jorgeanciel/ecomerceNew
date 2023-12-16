import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCart, loadCartProducts } from '../../store/slice/cartSlice';
import CartProduct from './CartProduct';

const Cart = ({ isVisible }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const cart = useSelector((state) => state.cart);
  const toggleTransform = isVisible ? 'translate-x-0' : 'translate-x-full';

  const total = cart.products.reduce(
    (sum, product) => sum + product.quantity * Number(product.price),
    0,
  );
  useEffect(() => {
    //ejecutar carga de los products del carrito cuando el carrito sea visible
    if (isVisible) dispatch(loadCartProducts(token));
  }, [isVisible]);

  return (
    <div
      className={
        'fixed top-20 inset-0 bg-[rgba(0,0,0,0.45)] transition-transform duration-500 backdrop-blur-sm ' +
        toggleTransform
      }
    >
      <section className="absolute right-0 h-full bg-white w-1/4 p-3 flex flex-col">
        <h2 className="text-center text-xl font-semibold text-red-500">Shopping Cart</h2>
        <div className="mt-5 flex-grow">
          {cart.loading && <p>Loading cart products...</p>}

          {!cart.loading && !cart.products.length && <p>your cart is empty</p>}

          {!cart.loading && cart.products.length && (
            <ul className="flex flex-col gap-5">
              {cart.products.map((product) => (
                <li key={product.id}>
                  <CartProduct product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <section className="text-center m-5">
          <p className="flex flex-row justify-between m-4">
            <span className="text-lg font-semibold text-red-500">Total</span>
            <span className="text-xl font-bold">$ {total}</span>
          </p>
          <button
            className="w-1/2 bg-orange-400 p-2 text-white font-bold rounded"
            disabled={!cart.products.length}
            onClick={() => dispatch(buyCart(token))}
          >
            Buy Product
          </button>
        </section>
      </section>
    </div>
  );
};
export default Cart;
