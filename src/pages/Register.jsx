import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import RegisterAuthSlider from '../components/RegisterAuthSlider';

export const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Gabungkan firstName dan lastName untuk full_name
      const fullName = `${data.firstName} ${data.lastName}`.trim();
      
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        username: data.username,
        email: data.email,
        password: data.password,
        full_name: fullName
      });

      if (response.data.success) {
        alert('Registrasi berhasil! Silakan login.');
        navigate('/login');
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Terjadi kesalahan saat registrasi'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white flex-col lg:flex-row">
      {/* Slider Section */}
      <RegisterAuthSlider />

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 py-4 lg:py-0 overflow-y-auto">
        {/* Form Container */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
          {/* Logo */}
          <div className="mb-3 text-left">
            <img src="/images/logo-component.png" alt="Xplorin Logo" className="h-10 sm:h-11 md:h-12" />
          </div>
          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-2xl font-bold text-red-900 mb-1">Register</h1>
          <p className="text-gray-700 mb-1 sm:mb-2 md:mb-2 text-xs sm:text-xs md:text-xs">
            Manage all your Explorin efficiently
          </p>
          <p className="text-gray-600 mb-3 sm:mb-3.5 md:mb-4 text-xs sm:text-xs md:text-xs">
            Let's get you all set up you can verify your personal account and begin setting up your profile
          </p>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-100 border border-red-300 text-red-900 px-4 py-2 rounded-lg mb-4 text-xs">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-1.5 sm:space-y-2 md:space-y-2">
            {/* Username Field (At the top) */}
            <div className="flex flex-col">
              <label htmlFor="username" className="text-xs font-semibold text-gray-800 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                {...register('username', { 
                  required: 'Username wajib diisi',
                  minLength: { value: 3, message: 'Minimal 3 karakter' },
                  pattern: { 
                    value: /^[a-zA-Z0-9_]+$/, 
                    message: 'Hanya huruf, angka, dan underscore' 
                  }
                })}
                placeholder="Username"
                className={`px-3 py-1.5 border rounded-lg text-xs transition-all duration-300 focus:outline-none ${
                  errors.username 
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                    : 'border-gray-300 focus:border-red-900 focus:ring-2 focus:ring-red-100'
                }`}
              />
              {errors.username && (
                <span className="text-red-600 text-xs mt-0.5">{errors.username.message}</span>
              )}
            </div>

            {/* First Name and Last Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-1.5 sm:gap-2 md:gap-2">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-xs font-semibold text-gray-800 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register('firstName', { 
                    required: 'First name wajib diisi',
                    minLength: { value: 2, message: 'Minimal 2 karakter' }
                  })}
                  placeholder="First Name"
                  className={`px-2.5 sm:px-3 md:px-3 py-1 sm:py-1.5 md:py-1.5 border rounded-lg text-xs transition-all duration-300 focus:outline-none ${
                    errors.firstName 
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                      : 'border-gray-300 focus:border-red-900 focus:ring-2 focus:ring-red-100'
                  }`}
                />
                {errors.firstName && (
                  <span className="text-red-600 text-xs mt-0.5">{errors.firstName.message}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-xs font-semibold text-gray-800 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register('lastName', { 
                    required: 'Last name wajib diisi',
                    minLength: { value: 2, message: 'Minimal 2 karakter' }
                  })}
                  placeholder="Last Name"
                  className={`px-2.5 sm:px-3 md:px-3 py-1 sm:py-1.5 md:py-1.5 border rounded-lg text-xs transition-all duration-300 focus:outline-none ${
                    errors.lastName 
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                      : 'border-gray-300 focus:border-red-900 focus:ring-2 focus:ring-red-100'
                  }`}
                />
                {errors.lastName && (
                  <span className="text-red-600 text-xs mt-0.5">{errors.lastName.message}</span>
                )}
              </div>
            </div>

            {/* Phone Number and Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-1.5 sm:gap-2 md:gap-2">
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-xs font-semibold text-gray-800 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="Phone Number"
                  className="px-2.5 sm:px-3 md:px-3 py-1 sm:py-1.5 md:py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-red-900 focus:ring-2 focus:ring-red-100 transition-all duration-300"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-xs font-semibold text-gray-800 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Email wajib diisi',
                    pattern: { 
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                      message: 'Format email tidak valid' 
                    }
                  })}
                  placeholder="Email"
                  className={`px-2.5 sm:px-3 md:px-3 py-1 sm:py-1.5 md:py-1.5 border rounded-lg text-xs transition-all duration-300 focus:outline-none ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                      : 'border-gray-300 focus:border-red-900 focus:ring-2 focus:ring-red-100'
                  }`}
                />
                {errors.email && (
                  <span className="text-red-600 text-xs mt-0.5">{errors.email.message}</span>
                )}
              </div>
            </div>

            {/* Password and Confirm Password Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-1.5 sm:gap-2 md:gap-2">
              <div className="flex flex-col">
                <label htmlFor="password" className="text-xs font-semibold text-gray-800 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password', { 
                    required: 'Password wajib diisi',
                    minLength: { value: 6, message: 'Minimal 6 karakter' }
                  })}
                  placeholder="Password"
                  className={`px-2.5 sm:px-3 md:px-3 py-1 sm:py-1.5 md:py-1.5 border rounded-lg text-xs transition-all duration-300 focus:outline-none ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                      : 'border-gray-300 focus:border-red-900 focus:ring-2 focus:ring-red-100'
                  }`}
                />
                {errors.password && (
                  <span className="text-red-600 text-xs mt-0.5">{errors.password.message}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-xs font-semibold text-gray-800 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', { 
                    required: 'Konfirmasi password wajib diisi',
                    validate: (val) => {
                      if (watch('password') !== val) {
                        return "Password tidak cocok";
                      }
                    }
                  })}
                  placeholder="Confirm Password"
                  className={`px-2.5 sm:px-3 md:px-3 py-1 sm:py-1.5 md:py-1.5 border rounded-lg text-xs transition-all duration-300 focus:outline-none ${
                    errors.confirmPassword 
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                      : 'border-gray-300 focus:border-red-900 focus:ring-2 focus:ring-red-100'
                  }`}
                />
                {errors.confirmPassword && (
                  <span className="text-red-600 text-xs mt-0.5">{errors.confirmPassword.message}</span>
                )}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-1.5 sm:space-y-2 md:space-y-2 my-2 sm:my-3 md:my-4">
              <div className="flex items-center gap-2">
                <input
                  id="newsletter"
                  type="checkbox"
                  className="w-4 h-4 border-2 border-red-900 rounded cursor-pointer"
                />
                <label htmlFor="newsletter" className="text-xs text-gray-700 cursor-pointer">
                  Yes, I want to receive Xplorin emails
                </label>
              </div>

              <div className="flex items-start gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border-2 border-red-900 rounded cursor-pointer mt-0.5"
                  required
                />
                <label htmlFor="terms" className="text-xs text-gray-700 cursor-pointer">
                  I agree to all The{' '}
                  <span className="text-blue-600 font-semibold">
                    <Link to="#" className="hover:underline">Term</Link>, <Link to="#" className="hover:underline">Privacy policy</Link> and <Link to="#" className="hover:underline">Fees</Link>
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-white border-2 border-red-900 text-red-900 px-3 sm:px-4 md:px-4 py-1.5 sm:py-1.5 md:py-2 rounded-lg text-xs sm:text-xs md:text-xs font-semibold cursor-pointer transition-all duration-300 hover:bg-red-900 hover:text-white disabled:opacity-60 disabled:cursor-not-allowed mt-1.5 sm:mt-2 md:mt-2"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-2 sm:mt-2.5 md:mt-3 text-center text-xs text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-red-900 font-semibold hover:text-red-700 hover:underline">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
