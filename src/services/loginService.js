import { axiosInstance } from '../api/axiosInstance';

export const loginService = async (data) => {
  try {
    const res = await axiosInstance.post('users/login', data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
