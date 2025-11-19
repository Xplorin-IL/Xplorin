import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-card">
          {/* Header dengan Avatar */}
          <div className="profile-header">
            <div className="profile-avatar">
              {getInitials(user?.full_name || user?.username)}
            </div>
            <h1 className="profile-name">
              {user?.full_name || 'User'}
            </h1>
            <p className="profile-username">@{user?.username}</p>
          </div>

          {/* Body dengan Informasi */}
          <div className="profile-body">
            <h2 className="profile-section-title">Informasi Akun</h2>
            
            <div className="profile-info-grid">
              <div className="profile-info-item">
                <div className="profile-info-label">Email</div>
                <div className="profile-info-value">{user?.email}</div>
              </div>
              
              <div className="profile-info-item">
                <div className="profile-info-label">Username</div>
                <div className="profile-info-value">{user?.username}</div>
              </div>
              
              <div className="profile-info-item">
                <div className="profile-info-label">Nama Lengkap</div>
                <div className="profile-info-value">
                  {user?.full_name || '-'}
                </div>
              </div>
              
              <div className="profile-info-item">
                <div className="profile-info-label">User ID</div>
                <div className="profile-info-value">#{user?.id}</div>
              </div>
            </div>

            {/* Statistik Pengguna */}
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="profile-stat-value">0</span>
                <span className="profile-stat-label">Review</span>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-value">0</span>
                <span className="profile-stat-label">Favorit</span>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-value">0</span>
                <span className="profile-stat-label">Kunjungan</span>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="profile-actions">
              <button className="btn-primary">
                ✏️ Edit Profile
              </button>
              <button className="btn-secondary" onClick={handleLogout}>
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

        {/* Section Aktivitas Terakhir */}
        <div className="profile-card" style={{ marginTop: '2rem' }}>
          <div className="profile-body">
            <h2 className="profile-section-title">Aktivitas Terakhir</h2>
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <p className="empty-state-text">
                Belum ada aktivitas. Mulai jelajahi makanan khas Palembang!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}