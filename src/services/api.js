import axios from 'axios';

// const API_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // config.headers.Authorization = `Bearer ${token}`;
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;

  }
  return config;
});

// Auth API endpoints
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (username, email, password) => api.post('/auth/signup', { username, email, password }),
  getMe: () => api.get('/auth/me'),
};

// Articles API endpoints
export const articlesAPI = {
  getAll: () => api.get('/articles'),
  getAllAdmin: () => api.get('/articles/admin'),
  getById: (id) => api.get(`/articles/${id}`),
  create: (data) => api.post('/articles', data),
  update: (id, data) => api.put(`/articles/${id}`, data),
  delete: (id) => api.delete(`/articles/${id}`),
};

// Comments API endpoints
export const commentsAPI = {
  getByArticle: (articleId) => api.get(`/comments/${articleId}`),
  create: (articleId, content) => api.post(`/comments/${articleId}`, { content }),
  delete: (commentId) => api.delete(`/comments/${commentId}`),
};

export default api;