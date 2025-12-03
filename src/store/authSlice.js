import { createSlice } from '@reduxjs/toolkit';

// Fungsi untuk load user dari localStorage
const loadUserFromStorage = () => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      return {
        isAuthenticated: true,
        user: JSON.parse(user),
        token: token
      };
    }
  } catch (error) {
    console.error('Error loading user from storage:', error);
  }
  
  return {
    isAuthenticated: false,
    user: null,
    token: null
  };
};

const initialState = loadUserFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      
      // Simpan ke localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      
      // Hapus dari localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    updateUser: (state, action) => {
      console.log('🔄 Redux updateUser called with:', action.payload);
      console.log('📦 Current user:', state.user);
      
      // Create new user object with updated fields
      const updatedUser = { ...state.user, ...action.payload };
      state.user = updatedUser;
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('✅ Redux user updated:', updatedUser);
    }
  }
});

export const { loginSuccess, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
