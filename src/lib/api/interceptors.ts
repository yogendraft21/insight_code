import { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';

export const setupInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
    
      return config;
    },
    (error: AxiosError) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          
          if (refreshToken) {
            const response = await instance.post('/auth/refresh', {
              refreshToken,
            });
            
            // Save the new tokens
            const { accessToken, refreshToken: newRefreshToken } = response.data;
            localStorage.setItem('authToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            
            originalRequest.headers.set('Authorization', `Bearer ${accessToken}`);
            
            return instance(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          console.error('Token refresh failed');
        }
      }
      
      if (error.response) {
        console.error('Response error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('Request error (no response):', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      
      return Promise.reject(error);
    }
  );
};