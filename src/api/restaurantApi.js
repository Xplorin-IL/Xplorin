// API Service untuk Restaurant
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

// Instance axios dengan konfigurasi default
const restaurantApi = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor untuk menambahkan JWT token (jika diperlukan)
restaurantApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Get all restaurants with pagination
 * @param {number} limit - Number of items per page (default: 20)
 * @param {number} offset - Starting index (default: 0)
 * @returns {Promise} - Restaurant list with pagination info
 */
export const getAllRestaurants = async (limit = 20, offset = 0) => {
    try {
        const response = await restaurantApi.get('/restaurants', {
            params: { limit, offset }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        throw error;
    }
};

/**
 * Get restaurant detail by slug
 * @param {string} slug - Restaurant slug (e.g., 'pempek-flamboyant')
 * @returns {Promise} - Restaurant detail data
 */
export const getRestaurantBySlug = async (slug) => {
    try {
        const response = await restaurantApi.get(`/restaurants/${slug}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching restaurant ${slug}:`, error);
        throw error;
    }
};

/**
 * Create new restaurant (requires JWT authentication)
 * @param {object} restaurantData - Restaurant data object
 * @returns {Promise} - Created restaurant info
 */
export const createRestaurant = async (restaurantData) => {
    try {
        const response = await restaurantApi.post('/restaurants', restaurantData);
        return response.data;
    } catch (error) {
        console.error('Error creating restaurant:', error);
        throw error;
    }
};

export default {
    getAllRestaurants,
    getRestaurantBySlug,
    createRestaurant
};
