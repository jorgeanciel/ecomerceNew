import React, { useState } from 'react';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import Cart from './Cart';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../store/slice/userSlice';

const Layout = () => {
  const navigate = useNavigate();
  const [isCartVisible, setIsCartVisible] = useState(false);
  const isLogged = useSelector((state) => state.user.isLogged);
  const dispatch = useDispatch();

  const cartHandleClick = () => {
    if (isLogged) setIsCartVisible(!isCartVisible);
    else navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 h-20 p-5 flex flex-row justify-between border border-b-4 border-stone-300 items-center z-10 backdrop-blur">
        <Link to="/">
          <h1 className="flex-1 font-mono font-bold text-rose-500 text-3xl">
            e-commercee
          </h1>
        </Link>

        <div className="flex flex-row justify-center items-center gap-8">
          <div className="flex flex-row items-center">
            <i class="bx bxs-store-alt text-3xl text-orange-500 p-2"></i>
            <Link
              to="/purchases"
              className="flex-1 font-bold text-2xl text-cyan-500 hover:text-rose-500"
            >
              purchases
            </Link>
          </div>
          <div>
            <button
              className="flex-1  font-bold text-2xl text-cyan-500 hover:text-rose-500 text-end pr-5"
              onClick={() => cartHandleClick()}
            >
              <i className="bx bxs-cart p-2  text-3xl text-orange-500"></i>
              Cart
            </button>
          </div>
          {isLogged && (
            <button
              onClick={() => dispatch(reset())}
              className="bg-red-400 px-2 py-1 rounded-lg hover:bg-red-500 text-white text-base font-medium"
            >
              Cerrar Sesion
            </button>
          )}
        </div>
      </header>
      <main className="">
        <Outlet />
      </main>
      <Cart isVisible={isCartVisible} />
    </>
  );
};

export default Layout;
