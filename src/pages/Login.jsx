import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import axios from 'axios';
import './Auth.css';

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
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Selamat Datang</h1>
        <p className="auth-subtitle">Masuk ke akun Anda untuk melanjutkan</p>

        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label htmlFor="identifier">Email atau Username</label>
            <input
              id="identifier"
              type="text"
              {...register('identifier', { 
                required: 'Email atau Username wajib diisi'
              })}
              placeholder="Masukkan email atau username"
              className={errors.identifier ? 'input-error' : ''}
            />
            {errors.identifier && (
              <span className="error-text">{errors.identifier.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { 
                required: 'Password wajib diisi'
              })}
              placeholder="Masukkan password"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>

        <div className="auth-footer">
          Belum punya akun? <Link to="/register" className="auth-link">Daftar di sini</Link>
        </div>
      </div>
    </div>
  );
}
