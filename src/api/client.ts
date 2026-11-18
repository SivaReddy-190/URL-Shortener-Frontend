import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach JWT token from zustand persisted auth store
client.interceptors.request.use(
  (config) => {
    try {
      const raw = localStorage.getItem('auth-storage');
      if (raw) {
        const parsed = JSON.parse(raw);
        const token: string | null = parsed?.state?.token ?? null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {
      // Ignore malformed localStorage data
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: on 401 clear auth and redirect to /login
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      try {
        localStorage.removeItem('auth-storage');
      } catch {
        // Ignore
      }
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default client;
