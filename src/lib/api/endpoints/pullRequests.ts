import { apiRequest } from "../client";

export interface PullRequestAuthor {
  githubId: string;
  username: string;
  avatarUrl: string;
}

export interface PRReview {
  reviewId: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  summary?: string;
  feedback?: Array<{
    path: string;
    line: number;
    comment: string;
    type: "suggestion" | "issue" | "praise" | "question";
    severity: "low" | "medium" | "high";
  }>;
  metrics?: {
    codeQualityScore: number;
    complexity: number;
    readability: number;
    maintainability: number;
    securityScore: number;
  };
  createdAt: string;
  completedAt?: string;
  error?: string;
}

export interface PullRequestData {
  _id: string;
  userId: string;
  repositoryId: {
    _id: string;
    name: string;
    owner: string;
    fullName: string;
  };
  installationId: number;
  prNumber: number;
  githubPrId: number;
  title: string;
  description?: string;
  author: PullRequestAuthor;
  state: "open" | "closed" | "merged";
  url: string;
  lastCommitSha: string;
  baseBranch?: string;
  headBranch?: string;
  closedAt?: string;
  mergedAt?: string;
  labels: string[];
  additions: number;
  deletions: number;
  changedFiles: number;
  reviews: PRReview[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PullRequestQueryOptions {
  state?: "open" | "closed" | "merged";
}

export interface PullRequestsResponse {
  pullRequests: PullRequestData[];
}

export interface PullRequestSyncResponse {
  success: boolean;
  message: string;
  totalSynced?: number;
  count?: number;
}

export interface ReviewResponse {
  success: boolean;
  reviewId: string;
  message: string;
}

export const getUserPullRequests = async (
  options?: PullRequestQueryOptions
): Promise<PullRequestsResponse> => {
  const queryParams = new URLSearchParams();
  if (options?.state) {
    queryParams.append("state", options.state);
  }

  const url = `/pull-requests${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  return apiRequest<PullRequestsResponse>({
    url,
    method: "GET",
  });
};

export const fetchRepositoryPullRequests = async (
  repositoryId: string,
  options?: PullRequestQueryOptions
): Promise<PullRequestsResponse> => {
  const queryParams = new URLSearchParams();
  if (options?.state) {
    queryParams.append("state", options.state);
  }

  const url = `/pull-requests/repository/${repositoryId}${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  return apiRequest<PullRequestsResponse>({
    url,
    method: "GET",
  });
};

export const syncAllPullRequests =
  async (): Promise<PullRequestSyncResponse> => {
    return apiRequest<PullRequestSyncResponse>({
      url: "/pull-requests/sync",
      method: "POST",
    });
  };

export const syncRepositoryPullRequests = async (
  repositoryId: string
): Promise<PullRequestSyncResponse> => {
  return apiRequest<PullRequestSyncResponse>({
    url: `/pull-requests/sync/${repositoryId}`,
    method: "POST",
  });
};

export const triggerPullRequestReview = async (
  pullRequestId: string,
  isReReview: boolean = false
): Promise<ReviewResponse> => {
  return apiRequest<ReviewResponse>({
    url: `/pull-requests/${pullRequestId}/review`,
    method: "POST",
    data: {
      reReview: isReReview,
    },
  });
};

export const getPullRequestStatusColor = (state: PullRequestData["state"]) => {
  switch (state) {
    case "open":
      return "green";
    case "closed":
      return "red";
    case "merged":
      return "purple";
    default:
      return "gray";
  }
};

export const formatPullRequestStats = (pr: PullRequestData) => {
  return {
    changes: `+${pr.additions} -${pr.deletions}`,
    files: pr.changedFiles,
    hasReviews: pr.reviews.length > 0,
    latestReview: pr.reviews[pr.reviews.length - 1],
  };
};
