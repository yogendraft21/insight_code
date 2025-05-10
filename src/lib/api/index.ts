// Export all API endpoints and client
export * from './endpoints';
export { apiClient, createApiClient, apiRequest } from './client';
export type { ApiClientConfig } from './client';

// Create a default API object with all endpoints grouped by domain
import * as authApi from './endpoints/auth';
import * as codeReviewsApi from './endpoints/codeReviews';
import * as repositoriesApi from './endpoints/repositories';
export * from './endpoints/github'

/**
 * API client organized by domains
 */
const api = {
  auth: authApi,
  codeReviews: codeReviewsApi,
  repositories: repositoriesApi,
};

export default api;