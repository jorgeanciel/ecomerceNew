import { axiosInstance } from '../api/axiosInstance';

export const getCart = async (token) => {
  try {
    const res = await axiosInstance.get('cart', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.map((cartProduct) => ({
      ...cartProduct.product,
      cartId: cartProduct.id,
      quantity: cartProduct.quantity,
    }));
  } catch (error) {
    console.error(error);
  }
};
