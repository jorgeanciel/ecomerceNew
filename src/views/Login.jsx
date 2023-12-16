import React from 'react';
import LoginForm from '../components/login/LoginForm';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const isUserLogged = useSelector((state) => state.user.isLogged);

  return (
    <div className="flex flex-col items-center mt-20 border border-black">
      <p className="text-3xl pb-6">Welcome!! Enter your password</p>
      <div className="bg-blue-400 w-1/6 p-4 border rounded">
        <h2 className="text-2xl text-center">Test Data</h2>
        <p className="text-xl pt-4">
          <span>
            <i class="bx bx-envelope"></i>
          </span>
          jorgeAnciel@gmail.com
        </p>
        <p className="text-xl">
          <span>
            <i class="bx bx-key"></i>
          </span>{' '}
          luis314434
        </p>
      </div>
      <LoginForm />
      {isUserLogged && <Navigate to="/" replace />}
    </div>
  );
};

export default Login;
