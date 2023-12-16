import { createSlice } from '@reduxjs/toolkit';
import { getCart } from '../../services/getCart';
import { addToCart } from '../../services/addToCart';
import { deleteFromCart } from '../../services/deleteFromCart';
import { updateQuantityCart } from '../../services/updateQuantityCard';
import { createPurchase } from '../../services/createPurchases';

const initialState = {
  products: [],
  loading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartProducts(state, action) {
      state.products = action.payload;
    },

    setCartLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

const { setCartLoading, setCartProducts } = cartSlice.actions;

export const loadCartProducts = (token) => async (dispatch) => {
  //Establecer el locading a true
  dispatch(setCartLoading(true));

  const cart = await getCart(token);
  dispatch(setCartProducts(cart));
  dispatch(setCartLoading(false));
};

export const addProductToCart =
  ({ token, quantity, productId }) =>
  async (dispatch) => {
    dispatch(setCartLoading(true));
    await addToCart({ token, quantity, productId });

    dispatch(loadCartProducts(token));
  };

export const deleteProductFromCart =
  ({ token, cartProductId }) =>
  async (dispatch) => {
    dispatch(setCartLoading(true));
    await deleteFromCart({ token, cartProductId });

    dispatch(loadCartProducts(token));
  };

export const updateQuantityProductCart =
  ({ token, cartProductId, quantity }) =>
  async (dispatch) => {
    dispatch(setCartLoading(true));
    await updateQuantityCart({ token, cartProductId, quantity });

    dispatch(loadCartProducts(token));
  };

export const buyCart = (token) => async (dispatch) => {
  dispatch(setCartLoading(true));
  await createPurchase(token);

  dispatch(loadCartProducts(token));
};
export default cartSlice.reducer;
