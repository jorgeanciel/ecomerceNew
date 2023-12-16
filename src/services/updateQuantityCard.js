import { axiosInstance } from '../api/axiosInstance';

export const updateQuantityCart = async ({ token, cartProductId, quantity }) => {
  try {
    const data = { quantity };
    await axiosInstance.put(`cart/${cartProductId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(error);
  }
};
