import { axiosInstance } from '../api/axiosInstance';

export const getCategories = async () => {
  try {
    const res = await axiosInstance.get('categories');
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
