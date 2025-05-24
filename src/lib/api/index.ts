// Export all API endpoints and client
export * from './endpoints';
export { apiClient, createApiClient, apiRequest } from './client';
export type { ApiClientConfig } from './client';

// Create a default API object with all endpoints grouped by domain
import * as authApi from './endpoints/auth';
import * as codeReviewsApi from './endpoints/codeReviews';
import * as repositoriesApi from './endpoints/repositories';
import * as pullRequestsApi from './endpoints/pullRequests';
export * from './endpoints/github';
import * as billingApi from './endpoints/billing';
import * as creditsApi from './endpoints/credits';  
import * as subscriptionApi from './endpoints/subscription';

/**
 * API client organized by domains
 */
const api = {
  auth: authApi,
  codeReviews: codeReviewsApi,
  repositories: repositoriesApi,
  pullRequests: pullRequestsApi,
  subscription: subscriptionApi,
  credits: creditsApi,
  billing: billingApi,
};

export default api;