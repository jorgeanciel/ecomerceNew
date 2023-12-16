import { axiosInstance } from '../api/axiosInstance';

export const createPurchase = async (token) => {
  try {
    await axiosInstance.post('purchases', undefined, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(error);
  }
};
