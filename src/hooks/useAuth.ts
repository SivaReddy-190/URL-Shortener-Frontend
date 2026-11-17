import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import * as authApi from '../api/auth';
import type { LoginRequest, RegisterRequest } from '../types/auth';

export function useAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, username, isAuthenticated, login: storeLogin, logout: storeLogout } =
    useAuthStore();

  const handlePostAuthRedirect = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const redirectUrl = params.get('redirect');

    if (redirectUrl) {
      navigate(redirectUrl, { replace: true });
    } else if (sessionStorage.getItem('pendingShorten')) {
      navigate('/', { replace: true });
    } else {
      navigate('/dashboard', { replace: true });
    }
  }, [location.search, navigate]);

  const login = useCallback(
    async (data: LoginRequest) => {
      const response = await authApi.login(data);
      storeLogin(response.token, response.username);
      handlePostAuthRedirect();
    },
    [storeLogin, handlePostAuthRedirect],
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      const response = await authApi.register(data);
      storeLogin(response.token, response.username);
      handlePostAuthRedirect();
    },
    [storeLogin, handlePostAuthRedirect],
  );

  const logout = useCallback(() => {
    storeLogout();
    navigate('/login', { replace: true });
  }, [storeLogout, navigate]);

  return {
    token,
    username,
    isAuthenticated,
    login,
    register,
    logout,
  };
}
