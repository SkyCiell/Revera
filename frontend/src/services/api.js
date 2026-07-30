import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('revera_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me')
};

export const iemAPI = {
  getAll: (params) => api.get('/iems', { params }),
  getById: (id) => api.get(`/iems/${id}`),
  getTargets: () => api.get('/iems/targets')
};

export const reviewAPI = {
  getAll: (iemId) => api.get('/reviews', { params: { iemId } }),
  create: (data) => api.post('/reviews', data)
};

export const collectionAPI = {
  getAll: (status) => api.get('/collections', { params: { status } }),
  toggle: (iemId, status) => api.post('/collections/toggle', { iemId, status })
};

export const recommendationAPI = {
  synthesize: (payload) => api.post('/recommendations/synthesize', payload)
};

export const statsAPI = {
  getStats: () => api.get('/stats')
};

export default api;
