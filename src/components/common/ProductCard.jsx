import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductToCart } from '../../store/slice/cartSlice';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged, token } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const isProductInCart = cart.products.some(
    (cartProduct) => cartProduct.id === product.id,
  );

  const handleAddProduct = (e) => {
    e.stopPropagation();
    if (isLogged)
      dispatch(addProductToCart({ token, quantity: 1, productId: product.id }));
    else navigate('/login');
  };

  return (
    <article
      key={product.id}
      onClick={() => navigate(`/products/${product.id}`)}
      className="cursor-pointer border-2 border-b p-4 min-w-[350px]"
    >
      <div className="min-w-[200px] max-h-[200px] flex justify-center items-center">
        <img className="w-40 h-full" src={product.images[0].url} alt={product.title} />
      </div>
      <section className="">
        <p className="font-bold text-gray-500">{product.brand}</p>
        <h2 className="font-semibold text-xl ">{product.title}</h2>
        <article className="flex justify-between pt-2">
          <div className="italic">
            <h3 className="text-orange-500 font-semibold">Price</h3>
            <p>{product.price}</p>
          </div>

          {!isProductInCart && (
            <button
              className="text-3xl flex flex-row justify-center items-center bg-orange-500 rounded-xl p-2"
              onClick={handleAddProduct}
              disabled={cart.loading}
            >
              <i className="bx bx-cart-add"></i>
            </button>
          )}
          {isProductInCart && <p>this product is</p>}
        </article>
      </section>
    </article>
  );
};

export default ProductCard;
