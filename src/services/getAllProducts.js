import { axiosInstance } from '../api/axiosInstance';

export const getAllProducts = async (params) => {
  try {
    const res = await axiosInstance.get('products', { params });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
