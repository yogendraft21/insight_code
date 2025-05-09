import { apiRequest } from '../client';

// Types for repositories
export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  url: string;
  provider: 'github' | 'gitlab' | 'bitbucket';
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  lastSyncedAt?: string;
}

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  description: string;
  status: 'open' | 'closed' | 'merged';
  createdAt: string;
  updatedAt: string;
  mergedAt?: string;
  closedAt?: string;
  author: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  repositoryId: string;
}

/**
 * Get all connected repositories
 */
export const getRepositories = async (): Promise<Repository[]> => {
  return apiRequest({
    url: '/repositories',
    method: 'GET',
  });
};

/**
 * Get a specific repository by ID
 */
export const getRepositoryById = async (id: string): Promise<Repository> => {
  return apiRequest({
    url: `/repositories/${id}`,
    method: 'GET',
  });
};

/**
 * Connect a new repository
 */
export const connectRepository = async (
  data: {
    provider: 'github' | 'gitlab' | 'bitbucket';
    fullName: string;
  }
): Promise<Repository> => {
  return apiRequest({
    url: '/repositories/connect',
    method: 'POST',
    data,
  });
};

/**
 * Disconnect a repository
 */
export const disconnectRepository = async (id: string): Promise<void> => {
  return apiRequest({
    url: `/repositories/${id}`,
    method: 'DELETE',
  });
};

/**
 * Sync a repository
 */
export const syncRepository = async (id: string): Promise<Repository> => {
  return apiRequest({
    url: `/repositories/${id}/sync`,
    method: 'POST',
  });
};

/**
 * Get pull requests for a repository
 */
export const getRepositoryPullRequests = async (
  repositoryId: string,
  filters?: {
    status?: 'open' | 'closed' | 'merged';
    page?: number;
    limit?: number;
  }
): Promise<{ data: PullRequest[]; total: number; page: number; limit: number }> => {
  return apiRequest({
    url: `/repositories/${repositoryId}/pull-requests`,
    method: 'GET',
    params: filters,
  });
};

/**
 * Get a specific pull request
 */
export const getPullRequestById = async (
  repositoryId: string,
  pullRequestNumber: number
): Promise<PullRequest> => {
  return apiRequest({
    url: `/repositories/${repositoryId}/pull-requests/${pullRequestNumber}`,
    method: 'GET',
  });
};