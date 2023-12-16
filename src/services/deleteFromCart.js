import { axiosInstance } from '../api/axiosInstance';

export const deleteFromCart = async ({ token, cartProductId }) => {
  try {
    await axiosInstance.delete(`cart/${cartProductId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
