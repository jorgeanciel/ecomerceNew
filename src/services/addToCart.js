import { axiosInstance } from '../api/axiosInstance';

export const addToCart = async ({ token, quantity, productId }) => {
  try {
    const data = { quantity, productId };
    await axiosInstance.post('cart', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(error);
  }
};
