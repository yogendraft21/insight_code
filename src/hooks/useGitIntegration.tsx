import { useState, useEffect } from "react";
import { toast } from "sonner";

// Types
interface GitHubStatus {
  installed: boolean;
  organizationName: string | null;
  installationId: number | null;
  gitlabConnected: boolean;
}

interface Repository {
  id: number;
  name: string;
  organization: string;
  provider: "github" | "gitlab";
  isConnected: boolean;
  lastSynced: string | null;
  reviewsCount: number;
}

export const useGitIntegration = () => {
  // State
  const [gitHubStatus, setGitHubStatus] = useState<GitHubStatus>({
    installed: false,
    organizationName: null,
    installationId: null,
    gitlabConnected: false
  });

  // GitHub OAuth URL constructor
  const getGitHubOAuthUrl = () => {
    const clientId = import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI || 
      `${window.location.origin}/api/auth/github/callback`;

    const scope = encodeURIComponent('repo user:email');
    return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  // GitHub App installation URL constructor
  const getGitHubAppInstallUrl = () => {
    const appName = import.meta.env.VITE_GITHUB_APP_NAME;
    return `https://github.com/apps/${appName}/installations/new`;
  };

  useEffect(() => {
    // Check if we have GitHub tokens in local storage or in the URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      // Clear URL without refreshing page
      window.history.replaceState({}, document.title, window.location.pathname);
      localStorage.setItem('authToken', token);
      
      // Get GitHub app installation status after authentication
      checkGitHubInstallation();
    }
    
    // Check for existing token
    const existingToken = localStorage.getItem('authToken');
    if (existingToken) {
      // Validate token and get installation status
      checkGitHubInstallation();
    }
  }, []);

  // Check GitHub App installation status
  const checkGitHubInstallation = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await fetch('/api/github/installation', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to get GitHub installation status');
      
      const data = await response.json();
      setGitHubStatus({
        installed: data.installed,
        organizationName: data.organizationName,
        installationId: data.installationId,
        gitlabConnected: data.gitlabConnected || false
      });
      
      if (data.installed) {
        toast.success("GitHub App is installed");
      }
    } catch (error) {
      console.error('Error checking GitHub installation:', error);
      toast.error('Failed to check GitHub installation status');
    }
  };

  // Handler to install GitHub App
  const handleInstallGitHubApp = () => {
    const installUrl = getGitHubAppInstallUrl();
    if (installUrl && !installUrl.includes('undefined')) {
      window.open(installUrl, '_blank', 'noopener,noreferrer');
    } else {
      toast.error('GitHub App installation URL is not properly configured');
    }
  };

  // Handler to authenticate with GitHub OAuth
  const handleGitHubAuth = () => {
    const oauthUrl = getGitHubOAuthUrl();
    if (!oauthUrl.includes('undefined')) {
      window.location.href = oauthUrl;
    } else {
      toast.error('GitHub OAuth URL is not properly configured');
    }
  };

  // Fetch repositories
  const fetchRepositories = async (): Promise<Repository[] | null> => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return null;

      const response = await fetch('/api/repositories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch repositories');
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching repositories:', error);
      toast.error('Failed to fetch repositories');
      return null;
    }
  };

  return {
    gitHubStatus,
    handleGitHubAuth,
    handleInstallGitHubApp,
    checkGitHubInstallation,
    fetchRepositories
  };
};

export default useGitIntegration;