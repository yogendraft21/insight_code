import { apiRequest } from '../client';

// Types for authentication requests and responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}

/**
 * User login
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>({
    url: '/auth/login',
    method: 'POST',
    data,
  });
};

/**
 * User registration
 */
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>({
    url: '/auth/register',
    method: 'POST',
    data,
  });
};

/**
 * Refresh authentication token
 */
export const refreshToken = async (refreshToken: string): Promise<Pick<AuthResponse, 'accessToken' | 'refreshToken'>> => {
  return apiRequest<Pick<AuthResponse, 'accessToken' | 'refreshToken'>>({
    url: '/auth/refresh',
    method: 'POST',
    data: { refreshToken },
  });
};

/**
 * Log out user
 */
export const logout = async (): Promise<void> => {
  return apiRequest<void>({
    url: '/auth/logout',
    method: 'POST',
  });
};

/**
 * Get current user information
 */
export const getCurrentUser = async (): Promise<any> => {
  return apiRequest({
    url: '/auth/me',
    method: 'GET',
  });
};