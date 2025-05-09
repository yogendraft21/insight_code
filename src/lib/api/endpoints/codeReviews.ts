import { apiRequest } from '../client';

// Types for code review
export interface CodeReview {
  id: string;
  title: string;
  description: string;
  repositoryId: string;
  repositoryName: string;
  pullRequestId: number;
  pullRequestNumber: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  aiSuggestions?: string;
  codeQualityScore?: number;
  comments?: CodeReviewComment[];
}

export interface CodeReviewComment {
  id: string;
  content: string;
  filePath: string;
  lineNumber: number;
  createdAt: string;
  userId: string;
  userName: string;
}

export interface CodeReviewFilters {
  status?: 'pending' | 'in_progress' | 'completed' | 'failed';
  repositoryId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

/**
 * Get all code reviews with optional filtering
 */
export const getCodeReviews = async (filters?: CodeReviewFilters): Promise<{ data: CodeReview[]; total: number; page: number; limit: number }> => {
  return apiRequest({
    url: '/code-reviews',
    method: 'GET',
    params: filters,
  });
};

/**
 * Get a specific code review by ID
 */
export const getCodeReviewById = async (id: string): Promise<CodeReview> => {
  return apiRequest({
    url: `/code-reviews/${id}`,
    method: 'GET',
  });
};

/**
 * Request a new code review for a pull request
 */
export const requestCodeReview = async (data: { repositoryId: string; pullRequestNumber: number }): Promise<CodeReview> => {
  return apiRequest({
    url: '/code-reviews',
    method: 'POST',
    data,
  });
};

/**
 * Add a comment to a code review
 */
export const addCodeReviewComment = async (
  reviewId: string,
  data: {
    content: string;
    filePath: string;
    lineNumber: number;
  }
): Promise<CodeReviewComment> => {
  return apiRequest({
    url: `/code-reviews/${reviewId}/comments`,
    method: 'POST',
    data,
  });
};

/**
 * Get code review statistics
 */
export const getCodeReviewStats = async (timeframe: 'week' | 'month' | 'year' = 'month'): Promise<any> => {
  return apiRequest({
    url: '/code-reviews/stats',
    method: 'GET',
    params: { timeframe },
  });
};