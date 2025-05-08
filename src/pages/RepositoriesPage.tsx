import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Github, Gitlab, Plus, Search, RefreshCw, Check, AlertCircle, Terminal } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

interface GitHubAppStatus {
  installed: boolean;
  organizationName: string | null;
  installationId: number | null;
}

// Define form schema
const repositorySchema = z.object({
  repoUrl: z.string().url("Please enter a valid repository URL"),
  autoReview: z.boolean().default(true)
});

// GitHub OAuth URL constructor
const getGitHubOAuthUrl = () => {
  const clientId = import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI || "http://localhost:3000/api/auth/github/callback";

  const scope = encodeURIComponent('repo user:email');
  return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
};

// GitHub App installation URL constructor
const getGitHubAppInstallUrl = () => {
  const clientId = import.meta.env.VITE_GITHUB_APP_CLIENT_ID;
  return `https://github.com/apps/your-app-name/installations/new?client_id=${clientId}`;
};

const RepositoriesPage = () => {
  // State
  const [repositories, setRepositories] = useState<Repository[]>([
    { 
      id: 1, 
      name: "frontend-app", 
      organization: "acme", 
      provider: "github", 
      isConnected: true, 
      lastSynced: "2 hours ago",
      reviewsCount: 24
    },
    { 
      id: 2, 
      name: "api-service", 
      organization: "acme", 
      provider: "github", 
      isConnected: true, 
      lastSynced: "3 hours ago",
      reviewsCount: 18
    },
    { 
      id: 3, 
      name: "design-system", 
      organization: "acme", 
      provider: "github", 
      isConnected: false, 
      lastSynced: null,
      reviewsCount: 0
    },
    { 
      id: 4, 
      name: "mobile-app", 
      organization: "acme", 
      provider: "github", 
      isConnected: true, 
      lastSynced: "5 hours ago",
      reviewsCount: 12
    },
    { 
      id: 5, 
      name: "docs-site", 
      organization: "acme", 
      provider: "gitlab", 
      isConnected: true, 
      lastSynced: "1 day ago",
      reviewsCount: 7
    },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [isDebugConsoleOpen, setIsDebugConsoleOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProvider, setActiveProvider] = useState("all");
  const [gitHubStatus, setGitHubStatus] = useState<GitHubAppStatus>({
    installed: false,
    organizationName: null,
    installationId: null
  });
  const [debugLogs, setDebugLogs] = useState<string[]>([
    "[INFO] Application initialized",
    "[INFO] Checking GitHub integration status"
  ]);
  
  // Forms
  const form = useForm<z.infer<typeof repositorySchema>>({
    resolver: zodResolver(repositorySchema),
    defaultValues: {
      repoUrl: "",
      autoReview: true,
    },
  });
  
  // Effects
  useEffect(() => {
    // Check if we have GitHub tokens in local storage or in the URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      // Clear URL without refreshing page
      window.history.replaceState({}, document.title, window.location.pathname);
      localStorage.setItem('authToken', token);
      addDebugLog("[INFO] Received authentication token from callback");
      
      // Simulate API call to get GitHub app installation status
      setTimeout(() => {
        setGitHubStatus({
          installed: true,
          organizationName: "acme",
          installationId: 12345678
        });
        addDebugLog("[SUCCESS] GitHub authentication successful");
        toast.success("GitHub authentication successful");
      }, 500);
    }
    
    // Check for existing token
    const existingToken = localStorage.getItem('authToken');
    if (existingToken) {
      addDebugLog("[INFO] Found existing authentication token");
      // Simulate API call to validate token and get installation status
      checkGitHubInstallation();
    }
  }, []);
  
  // Log management function
  const addDebugLog = (log: string) => {
    setDebugLogs(prev => [...prev, `${log} [${new Date().toLocaleTimeString()}]`]);
  };
  
  // Check GitHub App installation status
  const checkGitHubInstallation = () => {
    addDebugLog("[INFO] Checking GitHub App installation status");
    
    // Simulate API call
    setTimeout(() => {
      // Randomly set status for demo purposes
      // In production, this would be an actual API call to your backend
      const isInstalled = Math.random() > 0.5;
      
      if (isInstalled) {
        setGitHubStatus({
          installed: true,
          organizationName: "acme",
          installationId: 12345678
        });
        addDebugLog("[SUCCESS] GitHub App is installed");
      } else {
        setGitHubStatus({
          installed: false,
          organizationName: null,
          installationId: null
        });
        addDebugLog("[WARN] GitHub App is not installed");
      }
    }, 1000);
  };
  
  // Handler to install GitHub App
  const handleInstallGitHubApp = () => {
    addDebugLog("[INFO] Redirecting to GitHub App installation page");
    window.location.href = getGitHubAppInstallUrl();
  };
  
  // Handler to authenticate with GitHub OAuth
  const handleGitHubAuth = () => {
    addDebugLog("[INFO] Initiating GitHub OAuth flow");
    window.location.href = getGitHubOAuthUrl();
  };
  
  // Handler to connect a new repository
  const handleConnectRepository = (values: z.infer<typeof repositorySchema>) => {
    addDebugLog(`[INFO] Connecting repository: ${values.repoUrl}`);
    
    // Simulate adding a new repository
    const newId = repositories.length + 1;
    const isGithub = values.repoUrl.includes("github");
    
    // Extract repo name from URL
    const urlParts = values.repoUrl.split("/");
    const repoName = urlParts[urlParts.length - 1] || "new-repository";
    const orgName = urlParts[urlParts.length - 2] || "organization";
    
    const newRepo: Repository = {
      id: newId,
      name: repoName,
      organization: orgName,
      provider: isGithub ? "github" : "gitlab",
      isConnected: true,
      lastSynced: "Just now",
      reviewsCount: 0
    };
    
    setRepositories([...repositories, newRepo]);
    addDebugLog(`[SUCCESS] Repository "${repoName}" connected successfully`);
    toast.success(`Repository "${repoName}" connected successfully`);
    setIsDialogOpen(false);
    form.reset();
  };
  
  // Handler to toggle repository connection
  const handleToggleRepository = (id: number) => {
    setRepositories(repositories.map(repo => {
      if (repo.id === id) {
        addDebugLog(`[INFO] ${repo.isConnected ? "Disconnecting" : "Connecting"} repository: ${repo.name}`);
        return { ...repo, isConnected: !repo.isConnected };
      }
      return repo;
    }));
    
    const repo = repositories.find(r => r.id === id);
    if (repo) {
      toast.success(`${repo.isConnected ? "Disconnected" : "Connected"} repository: ${repo.name}`);
    }
  };
  
  // Handler to synchronize repositories
  const handleSyncRepositories = () => {
    setIsSyncing(true);
    addDebugLog("[INFO] Starting repository synchronization");
    
    // Simulate sync with delay
    setTimeout(() => {
      setIsSyncing(false);
      addDebugLog("[SUCCESS] Repositories synchronized successfully");
      toast.success("Repositories synchronized successfully");
      
      // Update last synced time for connected repos
      setRepositories(repositories.map(repo => 
        repo.isConnected ? { ...repo, lastSynced: "Just now" } : repo
      ));
    }, 2000);
  };
  
  // Filter repositories based on search and provider filter
  const filteredRepositories = repositories.filter(repo => 
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
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Repositories</h1>
                <p className="text-muted-foreground">
                  Connect and manage repositories for AI code review
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsDebugConsoleOpen(!isDebugConsoleOpen)}
              >
                <Terminal className="mr-2 h-4 w-4" />
                {isDebugConsoleOpen ? "Hide Console" : "Show Console"}
              </Button>
            </div>
            
            {/* Debug Console */}
            {isDebugConsoleOpen && (
              <Card className="mb-4 bg-black text-white overflow-hidden">
                <CardHeader className="bg-black text-white py-2 border-b border-gray-800">
                  <CardTitle className="text-sm">Debug Console</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="font-mono text-xs p-4 max-h-40 overflow-y-auto">
                    {debugLogs.map((log, index) => (
                      <div key={index} className="py-1">
                        {log.includes("[SUCCESS]") ? (
                          <span className="text-green-400">{log}</span>
                        ) : log.includes("[ERROR]") ? (
                          <span className="text-red-400">{log}</span>
                        ) : log.includes("[WARN]") ? (
                          <span className="text-yellow-400">{log}</span>
                        ) : (
                          <span className="text-gray-300">{log}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Connection Status Card */}
            {!gitHubStatus.installed && (
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-yellow-800">GitHub Integration Required</h3>
                      <p className="text-sm text-yellow-700 mb-4">
                        To connect GitHub repositories, you need to authenticate with GitHub and install our GitHub App.
                      </p>
                      <div className="flex gap-2">
                        <Button onClick={handleGitHubAuth}>
                          <Github className="mr-2 h-4 w-4" />
                          Authenticate with GitHub
                        </Button>
                        <Button variant="outline" onClick={handleInstallGitHubApp}>
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
                  <CardTitle>Repository Management</CardTitle>
                  <CardDescription>
                    Connect GitHub or GitLab repositories for automated code reviews
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={handleSyncRepositories} disabled={isSyncing}>
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
                            Enter the URL of the GitHub or GitLab repository you want to connect.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(handleConnectRepository)} className="space-y-4">
                            <FormField
                              control={form.control}
                              name="repoUrl"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Repository URL</FormLabel>
                                  <FormControl>
                                    <Input placeholder="https://github.com/organization/repo" {...field} />
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
                                    <FormLabel className="text-base">Automatic Code Review</FormLabel>
                                    <CardDescription>
                                      Automatically review new pull requests
                                    </CardDescription>
                                  </div>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <DialogFooter>
                              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
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
                  
                  {/* Dialog to prompt GitHub connection */}
                  <Dialog open={isConnectDialogOpen} onOpenChange={setIsConnectDialogOpen}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>GitHub Connection Required</DialogTitle>
                        <DialogDescription>
                          To connect repositories, you need to authenticate with GitHub and install our GitHub App.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                          <Check className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium">Step 1: Authenticate with GitHub</h4>
                            <p className="text-sm text-muted-foreground">Link your GitHub account</p>
                          </div>
                          <Button size="sm" className="ml-auto" onClick={handleGitHubAuth}>
                            <Github className="mr-2 h-4 w-4" />
                            Authenticate
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                          <Check className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium">Step 2: Install GitHub App</h4>
                            <p className="text-sm text-muted-foreground">Install our GitHub App to your repositories</p>
                          </div>
                          <Button size="sm" variant="outline" className="ml-auto" onClick={handleInstallGitHubApp}>
                            Install App
                          </Button>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsConnectDialogOpen(false)}>
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
                  <Tabs value={activeProvider} onValueChange={setActiveProvider} className="w-full sm:w-auto">
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
                      <div key={repo.id} className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 hover:bg-muted/50 items-center">
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
                              onCheckedChange={() => handleToggleRepository(repo.id)}
                            />
                            {repo.isConnected ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
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
                <CardDescription>Status of your GitHub or GitLab integration</CardDescription>
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
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        )}
                      </div>
                    </div>
                    {gitHubStatus.installed ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Connected</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Not Connected</Badge>
                    )}
                  </div>
                  
                  <div className="rounded-md bg-muted p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Gitlab className="h-6 w-6" />
                      <div>
                        <h3 className="font-medium">GitLab Integration</h3>
                        <p className="text-sm text-muted-foreground">Connected to acme-group</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Connected</Badge>
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
                        <span>Read and write access to pull requests and issues</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <Check className="h-4 w-4 text-green-600 shrink-0" />
                        <span>Read access to members and teams</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* GitHub tokens section (for dev environment) */}
                  <div className="mt-6 p-4 border rounded-md bg-gray-50">
                    <h3 className="font-medium mb-2">Environment Variables (Development Only)</h3>
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex justify-between">
                        <span>GitHub OAuth Client ID:</span>
                        <span className="bg-gray-200 px-2 py-1 rounded-md">
                          {import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>GitHub App Client ID:</span>
                        <span className="bg-gray-200 px-2 py-1 rounded-md">
                          {import.meta.env.VITE_GITHUB_APP_CLIENT_ID}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>GitHub Redirect URI:</span>
                        <span className="bg-gray-200 px-2 py-1 rounded-md">
                          {import.meta.env.VITE_GITHUB_REDIRECT_URI || "http://localhost:3000/api/auth/github/callback"}
                        </span>
                      </div>
                    </div>
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