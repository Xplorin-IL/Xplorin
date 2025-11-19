import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import axios from 'axios';
import LoginAuthSlider from '../components/LoginAuthSlider';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        identifier: data.identifier,
        password: data.password
      });

      if (response.data.success) {
        // Dispatch ke Redux store
        dispatch(loginSuccess({
          token: response.data.data.token,
          user: response.data.data.user
        }));
        
        alert('Login berhasil!');
        navigate('/'); // Redirect ke homepage
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Terjadi kesalahan saat login'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white flex-col lg:flex-row">
      {/* Slider Section */}
      <LoginAuthSlider />

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 py-6 lg:py-0 overflow-y-auto">
        {/* Form Container */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
          {/* Logo */}
          <div className="mb-3 text-left">
            <img src="/images/logo-component.png" alt="Xplorin Logo" className="h-10 sm:h-11 md:h-12" />
          </div>
          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-2xl font-bold text-red-900 mb-1">Login</h1>
          <p className="text-gray-700 mb-1 text-xs sm:text-xs md:text-xs font-semibold">
            Login to your account
          </p>
          <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-xs md:text-xs">
            Thank you for get back to Xplorin, lets access our the best recommendation for you
          </p>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-100 border border-red-300 text-red-900 px-4 py-2 rounded-lg mb-4 text-xs">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 sm:space-y-2.5 md:space-y-3">
            {/* Username Field */}
            <div className="flex flex-col">
              <label htmlFor="identifier" className="text-xs font-semibold text-gray-800 mb-1">
                Username
              </label>
              <input
                id="identifier"
                type="text"
                {...register('identifier', { 
                  required: 'Email atau Username wajib diisi'
                })}
                placeholder="Email or Phone Number"
                className={`px-3 py-2 border rounded-lg text-xs transition-all duration-300 focus:outline-none ${
                  errors.identifier 
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                    : 'border-gray-300 focus:border-red-900 focus:ring-2 focus:ring-red-100'
                }`}
              />
              {errors.identifier && (
                <span className="text-red-600 text-xs mt-0.5">{errors.identifier.message}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-xs font-semibold text-gray-800 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password', { 
                  required: 'Password wajib diisi'
                })}
                placeholder="Password"
                className={`px-3 py-2 border rounded-lg text-xs transition-all duration-300 focus:outline-none ${
                  errors.password 
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                    : 'border-gray-300 focus:border-red-900 focus:ring-2 focus:ring-red-100'
                }`}
              />
              {errors.password && (
                <span className="text-red-600 text-xs mt-0.5">{errors.password.message}</span>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-3 h-3 border-2 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember" className="text-xs text-gray-700 cursor-pointer">
                  Remember me
                </label>
              </div>
              <Link to="#" className="text-blue-600 text-xs font-semibold hover:underline">
                Reset Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-white border-2 border-gray-300 text-red-900 px-3 sm:px-4 md:px-4 py-1.5 sm:py-1.5 md:py-2 rounded-lg text-xs sm:text-xs md:text-xs font-semibold cursor-pointer transition-all duration-300 hover:border-red-900 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed mt-3 sm:mt-3.5 md:mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register and Social Links */}
          <div className="mt-3 sm:mt-3.5 md:mt-4 text-center">
            <div className="text-xs text-gray-600 mb-2 sm:mb-2.5 md:mb-3">
              <span>Don't have an account yet?</span>
              <br />
              <Link to="/register" className="text-red-900 font-semibold hover:text-red-700 hover:underline">
                Register Xplorin now!
              </Link>
            </div>

            {/* Social Login Icons */}
            <div className="flex justify-center gap-3 sm:gap-3.5 md:gap-4 mt-3 sm:mt-3.5 md:mt-4">
              <button className="w-9 h-9 sm:w-9.5 h-9.5 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:border-gray-400 transition-all duration-300">
                <img src="/images/iconGoogle.png" alt="Google Login" className="w-7 h-7 sm:w-7.5 h-7.5 md:w-8 md:h-8" />
              </button>
              <button className="w-9 h-9 sm:w-9.5 h-9.5 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:border-gray-400 transition-all duration-300">
                <img src="/images/iconApple.png" alt="Apple Login" className="w-7 h-7 sm:w-7.5 h-7.5 md:w-8 md:h-8" />
              </button>
              <button className="w-9 h-9 sm:w-9.5 h-9.5 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:border-gray-400 transition-all duration-300">
                <img src="/images/iconMicrosoft.png" alt="Microsoft Login" className="w-7 h-7 sm:w-7.5 h-7.5 md:w-8 md:h-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
