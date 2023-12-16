import React from 'react';
import { useState } from 'react';
import { loginService } from '../../services/loginService';
import { useDispatch } from 'react-redux';
import { logIn, updateToken, updateUserData } from '../../store/slice/userSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [toggleType, setToggleType] = useState('password');
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const handleClickType = () => {
    if (toggleType === 'password') setToggleType('text');
    else if (toggleType === 'text') setToggleType('password');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const login = async () => {
    const loginData = await loginService(loginFormData);

    const userData = {
      id: loginData.user.id,
      firstName: loginData.user.firstName,
      lastName: loginData.user.lastName,
      email: loginData.user.email,
    };

    const token = loginData.token;

    dispatch(updateUserData(userData));
    dispatch(updateToken(token));
    dispatch(logIn());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <>
      <form onChange={handleChange} onSubmit={handleSubmit} className="m-4 w-1/6">
        <div className="flex flex-col mb-4">
          <label htmlFor="emailId" className="text-xl pb-2">
            Email :{' '}
          </label>
          <input
            type="email"
            id="emailId"
            placeholder="example@gmail.com"
            name="email"
            value={loginFormData.email}
            required
            className="border border-violet-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="passwrodId" className="text-xl pb-2">
            Password :{' '}
          </label>
          <div>
            <input
              type={toggleType}
              id="passwrodId"
              name="password"
              value={loginFormData.password}
              required
              className="border border-violet-300 rounded w-full"
            />
            <button type="button" onClick={handleClickType}>
              <i className="bx bxs-low-vision"></i>
            </button>
          </div>
        </div>
        <button type="submit" className="rounded-md bg-blue-600 p-2 hover:bg-blue-300">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
