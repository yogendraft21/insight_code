import { clearUser } from '../redux/slices/userSlice';
import { store } from '../redux/store';
import api from '../api';

export const logout = async (redirectPath = '/login'): Promise<void> => {
  try {
    await api.auth.logout();
  } catch (error) {
    console.error('Logout API call failed:', error);
  }
  
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  
  store.dispatch(clearUser());
  
  if (redirectPath) {
    window.location.href = redirectPath;
  }
};