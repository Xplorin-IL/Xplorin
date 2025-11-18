import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

export const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username: data.username,
        email: data.email,
        password: data.password,
        full_name: data.full_name
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
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Buat Akun</h1>
        <p className="auth-subtitle">Daftar untuk memulai petualangan kuliner Anda</p>

        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label htmlFor="full_name">Nama Lengkap</label>
            <input
              id="full_name"
              type="text"
              {...register('full_name', { 
                required: 'Nama lengkap wajib diisi',
                minLength: { value: 3, message: 'Minimal 3 karakter' }
              })}
              placeholder="Masukkan nama lengkap"
              className={errors.full_name ? 'input-error' : ''}
            />
            {errors.full_name && (
              <span className="error-text">{errors.full_name.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
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
              placeholder="Masukkan username"
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && (
              <span className="error-text">{errors.username.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
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
              placeholder="contoh@email.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { 
                required: 'Password wajib diisi',
                minLength: { value: 6, message: 'Minimal 6 karakter' }
              })}
              placeholder="Minimal 6 karakter"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Konfirmasi Password</label>
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
              placeholder="Masukkan ulang password"
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Mendaftar...' : 'Daftar'}
          </button>
        </form>

        <div className="auth-footer">
          Sudah punya akun? <Link to="/login" className="auth-link">Login di sini</Link>
        </div>
      </div>
    </div>
  );
}
