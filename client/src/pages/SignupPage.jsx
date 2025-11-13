import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const SignupPage = () => {
  const { signup, isSigningUp } = useAuthStore();

  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleSignup = (e) => {
    e.preventDefault();
    signup(signupData);
  };

  return (
    <div className='h-screen flex items-center justify-center px-3'>
      <div className='lg:max-w-3xl md:max-w-2xl max-w-xl w-full h-[490px] flex items-center border rounded-xl'>
        <div className='w-1/2 py-2 px-3 border-r border-info hidden lg:block md:block'>
          <img
            src='/signup.png'
            alt='signup-img'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='lg:w-1/2 md:w-1/2 w-full py-2 px-8'>
          <h3 className='text-center text-xl font-medium text-info mb-6 tracking-wide'>
            WELCOME TO CHATTER
          </h3>
          <form onSubmit={handleSignup}>
            <div className='grid gap-3'>
              <div className='form-control'>
                <label htmlFor='fullname' className='label'>
                  <span className='label-text'>Fullname</span>
                </label>
                <input
                  type='text'
                  className='input input-bordered'
                  value={signupData.fullName}
                  onChange={(e) =>
                    setSignupData({ ...signupData, fullName: e.target.value })
                  }
                />
              </div>
              <div className='form-control'>
                <label htmlFor='email' className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='email'
                  className='input input-bordered'
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
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
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                />
              </div>
              <div className='form-control my-3'>
                <button className='btn btn-outline btn-accent' type='submit'>
                  {isSigningUp ? (
                    <>
                      <span className='loading loading-spinner loading-sm'></span>
                      <span>Loading...</span>
                    </>
                  ) : (
                    'Signup'
                  )}
                </button>
              </div>
            </div>
          </form>

          <p className='text-center mt-4'>
            Already have an account?{' '}
            <a href='/login' className='text-info'>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
