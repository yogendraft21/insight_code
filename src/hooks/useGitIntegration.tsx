import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

// Types
interface GitHubStatus {
  installed: boolean;
  organizationName: string | null;
  installationId: number | null;
  accountType: string | null;
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

interface PrepareInstallationResponse {
  success: boolean;
  oauthUrl: string;
}

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const useGitIntegration = () => {
  const [gitHubStatus, setGitHubStatus] = useState<GitHubStatus>({
    installed: false,
    organizationName: null,
    installationId: null,
    accountType: null,
  });
  
  const [isInstalling, setIsInstalling] = useState(false);
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  const prepareInstallation = async (): Promise<PrepareInstallationResponse | null> => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login first");
        return null;
      }

      const response = await fetch(`${BASE_URL}/github/prepare-installation`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to prepare GitHub installation");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error preparing GitHub installation:", error);
      toast.error(error instanceof Error ? error.message : "Failed to prepare GitHub installation");
      return null;
    }
  };

  const checkGitHubInstallation = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return false;

      const response = await fetch(`${BASE_URL}/github/installation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get GitHub installation status");
      }

      const data = await response.json();
      setGitHubStatus({
        installed: data.installed,
        organizationName: data.organizationName,
        installationId: data.installationId,
        accountType: data.accountType,
      });

      return data.installed;
    } catch (error) {
      console.error("Error checking GitHub installation:", error);
      return false;
    }
  };

  const startPolling = () => {
    setIsInstalling(true);
    let checkCount = 0;
    const maxChecks = 60;
  
    pollingInterval.current = setInterval(async () => {
      checkCount++;
      
      const isInstalled = await checkGitHubInstallation();
      
      if (isInstalled) {
        stopPolling();
        toast.success('GitHub App installed successfully!');
        setIsInstalling(false);
        localStorage.removeItem('github_installing');
      }
      
      if (checkCount >= maxChecks) {
        stopPolling();
        toast.error('Installation timeout. Please try again.');
        setIsInstalling(false);
        localStorage.removeItem('github_installing');
      }
    }, 5000);
  };

  const stopPolling = () => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
      pollingInterval.current = null;
    }
  };

  const handleInstallGitHubApp = async () => {
    try {
      const prepareResult = await prepareInstallation();
  
      if (!prepareResult || !prepareResult.success) {
        return;
      }
  
      startPolling();
  
      if (prepareResult.oauthUrl) {
        // Change this line to open in new window:
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        
        window.open(
          prepareResult.oauthUrl,
          'github-oauth',
          `width=${width},height=${height},left=${left},top=${top}`
        );
      } else {
        toast.error("Failed to get GitHub OAuth URL");
        stopPolling();
      }
    } catch (error) {
      console.error("Error installing GitHub app:", error);
      toast.error("Failed to install GitHub app");
      stopPolling();
    }
  };

  const fetchRepositories = async (): Promise<Repository[] | null> => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return null;

      const response = await fetch(`${BASE_URL}/github/repositories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch repositories");

      return await response.json();
    } catch (error) {
      console.error("Error fetching repositories:", error);
      toast.error("Failed to fetch repositories");
      return null;
    }
  };

useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const installation = urlParams.get('installation');
  const error = urlParams.get('error');

  if (installation === 'success') {
    toast.success('GitHub App installed successfully!');
    checkGitHubInstallation();
    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname);
  } else if (error) {
    toast.error(`Installation failed: ${decodeURIComponent(error)}`);
    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}, []);

  useEffect(() => {
    if (isInstalling) {
      localStorage.setItem('github_installing', 'true');
    }
  }, [isInstalling]);

  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, []);

  useEffect(() => {
    checkGitHubInstallation();
  }, []);

  return {
    gitHubStatus,
    handleInstallGitHubApp,
    checkGitHubInstallation,
    fetchRepositories,
    isInstalling,
  };
};

export default useGitIntegration;