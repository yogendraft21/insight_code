import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, RefreshCw, Search, Loader2 } from "lucide-react";
import { RepositoryList } from "./RepositoryList";
import { ConnectRepositoryDialog } from "./ConnectRepositoryDialog";

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

interface RepositoryManagementCardProps {
  repositories: Repository[];
  gitHubStatus: {
    installed: boolean;
  };
  isInstalling: boolean;
  isSyncing: boolean;
  searchQuery: string;
  activeProvider: string;
  onSearchChange: (value: string) => void;
  onProviderChange: (value: string) => void;
  onSync: () => void;
  onConnectRepository: (values: any) => void;
  onToggleRepository: (id: string) => void;
  onInstallGitHub: () => void;
}

export const RepositoryManagementCard = ({
  repositories,
  gitHubStatus,
  isInstalling,
  isSyncing,
  searchQuery,
  activeProvider,
  onSearchChange,
  onProviderChange,
  onSync,
  onConnectRepository,
  onToggleRepository,
  onInstallGitHub,
}: RepositoryManagementCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Repositories
          </h1>
          <p className="text-muted-foreground">
            Connect and manage repositories for AI code review
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onSync}
            disabled={isSyncing || !gitHubStatus.installed}
          >
            {isSyncing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync
              </>
            )}
          </Button>

          {gitHubStatus.installed ? (
            <ConnectRepositoryDialog onSubmit={onConnectRepository} />
          ) : (
            <Button onClick={onInstallGitHub} disabled={isInstalling}>
              {isInstalling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Installing...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Connect Repository
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search repositories..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <Tabs
            value={activeProvider}
            onValueChange={onProviderChange}
            className="w-full sm:w-auto"
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="github">GitHub</TabsTrigger>
              <TabsTrigger value="gitlab">GitLab</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="border rounded-md">
          <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 text-sm font-medium">
            <div className="col-span-3">Repository</div>
            <div className="col-span-2">Provider</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Last Synced</div>
            <div className="col-span-1">Reviews</div>
            <div className="col-span-1 text-center">Link</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          <RepositoryList
            repositories={repositories}
            onToggleRepository={onToggleRepository}
            onDeleteRepository={() => {}}
          />
        </div>
      </CardContent>
    </Card>
  );
};
