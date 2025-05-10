import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { toast } from "sonner";
import { useGitIntegration } from "@/hooks/useGitIntegration";
import { RepositoryStatusCard } from "@/components/repositories/RepositoryStatusCard";
import { RepositoryManagementCard } from "@/components/repositories/RepositoryManagementCard";
import { IntegrationStatusCard } from "@/components/repositories/IntegrationStatusCard";

interface Repository {
  id: string;
  _id: string;
  name: string;
  owner: string;
  fullName: string;
  url: string;
  provider: "github" | "gitlab";
  isActive: boolean;
  configuration: {
    autoReview: boolean;
  };
  stats: {
    totalReviews: number;
    lastActivity: string;
  };
}

const RepositoriesPage = () => {
  const {
    gitHubStatus,
    handleInstallGitHubApp,
    fetchRepositories,
    isInstalling,
  } = useGitIntegration();

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProvider, setActiveProvider] = useState("all");

  console.log("GitHub Status:", gitHubStatus);
  console.log("Repositories:", repositories);
  console.log("fjdlfjldskfjlsdkfjl");

  useEffect(() => {
    if (gitHubStatus.installed) {
      loadRepositories();
    }
  }, [gitHubStatus.installed]);

  const loadRepositories = async () => {
    const response = await fetchRepositories();
    if (response) {
      const repos = (response as any).repositories || response;
      if (Array.isArray(repos)) {
        setRepositories(repos);
      }
    }
  };

  const handleConnectRepository = async (values: { repoUrl: string; autoReview: boolean }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/repositories", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to connect repository");

      const newRepo = await response.json();
      setRepositories((prev) => [...prev, newRepo]);
      toast.success(`Repository "${newRepo.name}" connected successfully`);
    } catch (error) {
      toast.error("Failed to connect repository");
      console.error(error);
    }
  };

  const handleToggleRepository = async (id: string) => {
    try {
      const repository = repositories.find((r) => r.id === id || r._id === id);
      if (!repository) return;

      const token = localStorage.getItem("authToken");
      const response = await fetch(`/api/repositories/${id}/toggle`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to update repository status");

      setRepositories(
        repositories.map((repo) => {
          if (repo.id === id || repo._id === id) {
            return { ...repo, isActive: !repo.isActive };
          }
          return repo;
        })
      );

      toast.success(
        `${repository.isActive ? "Disconnected" : "Connected"} repository: ${repository.name}`
      );
    } catch (error) {
      toast.error("Failed to update repository status");
      console.error(error);
    }
  };

  const handleSyncRepositories = async () => {
    setIsSyncing(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/repositories/sync", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      
      if (!response.ok) throw new Error("Failed to synchronize repositories");

      const data = await response.json();
      const repos = (data as any).repositories || data;
      if (Array.isArray(repos)) {
        setRepositories(repos);
      }
      toast.success("Repositories synchronized successfully");
    } catch (error) {
      toast.error("Failed to synchronize repositories");
      console.error(error);
    } finally {
      setIsSyncing(false);
    }
  };

  const filteredRepositories = repositories.filter(
    (repo) =>
      (repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.owner.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeProvider === "all" || activeProvider === "github")
  );

  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Repositories
              </h1>
              <p className="text-muted-foreground">
                Connect and manage repositories for AI code review
              </p>
            </div>



            <RepositoryStatusCard
              gitHubStatus={gitHubStatus}
              isInstalling={isInstalling}
              onInstallGitHub={handleInstallGitHubApp}
            />

            <RepositoryManagementCard
              repositories={filteredRepositories}
              gitHubStatus={gitHubStatus}
              isInstalling={isInstalling}
              isSyncing={isSyncing}
              searchQuery={searchQuery}
              activeProvider={activeProvider}
              onSearchChange={setSearchQuery}
              onProviderChange={setActiveProvider}
              onSync={handleSyncRepositories}
              onConnectRepository={handleConnectRepository}
              onToggleRepository={handleToggleRepository}
              onInstallGitHub={handleInstallGitHubApp}
            />

            <IntegrationStatusCard
              gitHubStatus={gitHubStatus}
              isInstalling={isInstalling}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RepositoriesPage;