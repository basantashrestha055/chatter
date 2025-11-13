import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login(loginData);
  };

  return (
    <div className='h-screen flex items-center justify-center px-3'>
      <div className='lg:max-w-3xl md:max-w-2xl max-w-xl w-full h-[450px] flex items-center border rounded-xl'>
        <div className='w-1/2 py-2 px-3 border-r border-info hidden lg:block md:block'>
          <img
            src='/login.png'
            alt='login-img'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='lg:w-1/2 md:w-1/2 w-full py-2 px-8'>
          <h3 className='text-center text-xl font-medium text-info mb-6 tracking-wide'>
            WELCOME BACK
          </h3>
          <form onSubmit={handleLogin}>
            <div className='grid gap-3'>
              <div className='form-control'>
                <label htmlFor='email' className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='email'
                  className='input input-bordered'
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>
              <div className='form-control'>
                <label htmlFor='password' className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  type='password'
                  className='input input-bordered'
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </div>
              <div className='form-control my-3'>
                <button className='btn btn-outline btn-accent' type='submit'>
                  {isLoggingIn ? (
                    <>
                      <span className='loading loading-spinner loading-sm'></span>
                      <span>Loading...</span>
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </div>
          </form>

          <p className='text-center mt-4'>
            Don't have an account?{' '}
            <a href='/signup' className='text-info'>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
