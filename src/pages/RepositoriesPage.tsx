import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Gitlab,
  Plus,
  Search,
  RefreshCw,
  Check,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGitIntegration } from "@/hooks/useGitIntegration";

// Types
interface Repository {
  id: number;
  name: string;
  organization: string;
  provider: "github" | "gitlab";
  isConnected: boolean;
  lastSynced: string | null;
  reviewsCount: number;
}

// Define form schema
const repositorySchema = z.object({
  repoUrl: z.string().url("Please enter a valid repository URL"),
  autoReview: z.boolean().default(true),
});

const RepositoriesPage = () => {
  const {
    gitHubStatus,
    handleInstallGitHubApp,
    fetchRepositories,
  } = useGitIntegration();

  // State
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProvider, setActiveProvider] = useState("all");

  // Forms
  const form = useForm<z.infer<typeof repositorySchema>>({
    resolver: zodResolver(repositorySchema),
    defaultValues: {
      repoUrl: "",
      autoReview: true,
    },
  });

  // Handler to connect a new repository
  const handleConnectRepository = async (
    values: z.infer<typeof repositorySchema>
  ) => {
    try {
      // Here you would make an API call to actually connect the repository
      const response = await fetch("/api/repositories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to connect repository");

      const newRepo = await response.json();
      setRepositories((prev) => [...prev, newRepo]);
      toast.success(`Repository "${newRepo.name}" connected successfully`);
      setIsDialogOpen(false);
      form.reset();

      // Refresh the repositories list
      fetchRepositories().then((repos) => {
        if (repos) setRepositories(repos);
      });
    } catch (error) {
      toast.error("Failed to connect repository");
      console.error(error);
    }
  };

  // Handler to toggle repository connection
  const handleToggleRepository = async (id: number) => {
    try {
      const repository = repositories.find((r) => r.id === id);
      if (!repository) return;

      const response = await fetch(`/api/repositories/${id}/toggle`, {
        method: "PUT",
      });

      if (!response.ok) throw new Error("Failed to update repository status");

      setRepositories(
        repositories.map((repo) => {
          if (repo.id === id) {
            return { ...repo, isConnected: !repo.isConnected };
          }
          return repo;
        })
      );

      toast.success(
        `${repository.isConnected ? "Disconnected" : "Connected"} repository: ${
          repository.name
        }`
      );
    } catch (error) {
      toast.error("Failed to update repository status");
      console.error(error);
    }
  };

  // Handler to synchronize repositories
  const handleSyncRepositories = async () => {
    setIsSyncing(true);

    try {
      const response = await fetch("/api/repositories/sync", {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to synchronize repositories");

      const updatedRepos = await response.json();
      setRepositories(updatedRepos);
      toast.success("Repositories synchronized successfully");
    } catch (error) {
      toast.error("Failed to synchronize repositories");
      console.error(error);
    } finally {
      setIsSyncing(false);
    }
  };

  // Filter repositories based on search and provider filter
  const filteredRepositories = repositories.filter(
    (repo) =>
      (repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.organization.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeProvider === "all" || repo.provider === activeProvider)
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

            {/* Connection Status Card - Only App Installation Option */}
            {!gitHubStatus.installed && (
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-yellow-800">
                        GitHub Integration Required
                      </h3>
                      <p className="text-sm text-yellow-700 mb-4">
                        To connect GitHub repositories, you need to install our GitHub App.
                      </p>
                      <div className="flex gap-2">
                        <Button onClick={handleInstallGitHubApp}>
                          <Github className="mr-2 h-4 w-4" />
                          Install GitHub App
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Repository Management Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div>
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                      Repositories
                    </h1>
                    <p className="text-muted-foreground">
                      Connect and manage repositories for AI code review
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={handleSyncRepositories}
                    disabled={isSyncing}
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
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Connect Repository
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Connect a Repository</DialogTitle>
                          <DialogDescription>
                            Enter the URL of the GitHub or GitLab repository you
                            want to connect.
                          </DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(
                              handleConnectRepository
                            )}
                            className="space-y-4"
                          >
                            <FormField
                              control={form.control}
                              name="repoUrl"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Repository URL</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="https://github.com/organization/repo"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="autoReview"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                      Automatic Code Review
                                    </FormLabel>
                                    <CardDescription>
                                      Automatically review new pull requests
                                    </CardDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <DialogFooter>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button type="submit">Connect</Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button onClick={() => setIsConnectDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Connect Repository
                    </Button>
                  )}

                  {/* Dialog to prompt GitHub App Installation Only */}
                  <Dialog
                    open={isConnectDialogOpen}
                    onOpenChange={setIsConnectDialogOpen}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>GitHub Integration Required</DialogTitle>
                        <DialogDescription>
                          To connect repositories, you need to install our GitHub App.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                          <Check className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium">
                              Install GitHub App
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Install our GitHub App to your repositories
                            </p>
                          </div>
                          <Button
                            size="sm"
                            className="ml-auto"
                            onClick={handleInstallGitHubApp}
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Install App
                          </Button>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsConnectDialogOpen(false)}
                        >
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Tabs
                    value={activeProvider}
                    onValueChange={setActiveProvider}
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
                    <div className="col-span-5">Repository</div>
                    <div className="col-span-2">Provider</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Last Synced</div>
                    <div className="col-span-1">Reviews</div>
                  </div>

                  {filteredRepositories.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      No repositories found
                    </div>
                  ) : (
                    filteredRepositories.map((repo) => (
                      <div
                        key={repo.id}
                        className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 hover:bg-muted/50 items-center"
                      >
                        <div className="col-span-5">
                          <div>
                            <div className="font-medium">{repo.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {repo.organization}
                            </div>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <div className="flex items-center gap-1.5">
                            {repo.provider === "github" ? (
                              <Github className="h-4 w-4" />
                            ) : (
                              <Gitlab className="h-4 w-4" />
                            )}
                            <span className="capitalize">{repo.provider}</span>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={repo.isConnected}
                              onCheckedChange={() =>
                                handleToggleRepository(repo.id)
                              }
                            />
                            {repo.isConnected ? (
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800 hover:bg-green-200"
                              >
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="outline">Inactive</Badge>
                            )}
                          </div>
                        </div>

                        <div className="col-span-2 text-muted-foreground text-sm">
                          {repo.lastSynced || "Never synced"}
                        </div>

                        <div className="col-span-1 text-center">
                          <Badge variant="outline" className="bg-primary/10">
                            {repo.reviewsCount}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Integration Status Card */}
            <Card>
              <CardHeader>
                <CardTitle>Integration Status</CardTitle>
                <CardDescription>
                  Status of your GitHub or GitLab integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md bg-muted p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Github className="h-6 w-6" />
                      <div>
                        <h3 className="font-medium">GitHub App</h3>
                        {gitHubStatus.installed ? (
                          <p className="text-sm text-muted-foreground">
                            Connected to {gitHubStatus.organizationName}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Not connected
                          </p>
                        )}
                      </div>
                    </div>
                    {gitHubStatus.installed ? (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 hover:bg-green-200"
                      >
                        Connected
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      >
                        Not Connected
                      </Badge>
                    )}
                  </div>

                  <div className="rounded-md bg-muted p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Gitlab className="h-6 w-6" />
                      <div>
                        <h3 className="font-medium">GitLab Integration</h3>
                        <p className="text-sm text-muted-foreground">
                          {gitHubStatus.gitlabConnected
                            ? "Connected to GitLab"
                            : "Not connected"}
                        </p>
                      </div>
                    </div>
                    {gitHubStatus.gitlabConnected ? (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 hover:bg-green-200"
                      >
                        Connected
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      >
                        Not Connected
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2 mt-4">
                    <h3 className="font-medium">Permissions</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-baseline gap-2">
                        <Check className="h-4 w-4 text-green-600 shrink-0" />
                        <span>Read access to code and metadata</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <Check className="h-4 w-4 text-green-600 shrink-0" />
                        <span>
                          Read and write access to pull requests and issues
                        </span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <Check className="h-4 w-4 text-green-600 shrink-0" />
                        <span>Read access to members and teams</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RepositoriesPage;