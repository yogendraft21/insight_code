import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { setupInterceptors } from './interceptors';

// API Client configuration interface
export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

const defaultConfig: ApiClientConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

export const createApiClient = (
  config: ApiClientConfig = defaultConfig
): AxiosInstance => {
  const axiosInstance = axios.create({
    ...config,
  });

  setupInterceptors(axiosInstance);

  return axiosInstance;
};

export const apiClient = createApiClient();

export const apiRequest = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient(config);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};