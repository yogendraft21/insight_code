import { useState } from "react";
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
import { Github, Gitlab, Plus, Search, RefreshCw, Check } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Repository {
  id: number;
  name: string;
  organization: string;
  provider: "github" | "gitlab";
  isConnected: boolean;
  lastSynced: string | null;
  reviewsCount: number;
}

const repositorySchema = z.object({
  repoUrl: z.string().url("Please enter a valid repository URL"),
  autoReview: z.boolean().default(true)
});

const RepositoriesPage = () => {
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
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProvider, setActiveProvider] = useState("all");
  
  const form = useForm<z.infer<typeof repositorySchema>>({
    resolver: zodResolver(repositorySchema),
    defaultValues: {
      repoUrl: "",
      autoReview: true,
    },
  });
  
  const handleConnectRepository = (values: z.infer<typeof repositorySchema>) => {
    // Simulate adding a new repository
    const newId = repositories.length + 1;
    const isGithub = values.repoUrl.includes("github");
    
    // Extract repo name from URL (this is a simplified version)
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
    toast.success(`Repository "${repoName}" connected successfully`);
    setIsDialogOpen(false);
    form.reset();
  };
  
  const handleToggleRepository = (id: number) => {
    setRepositories(repositories.map(repo => 
      repo.id === id ? { ...repo, isConnected: !repo.isConnected } : repo
    ));
    
    const repo = repositories.find(r => r.id === id);
    if (repo) {
      toast.success(`${repo.isConnected ? "Disconnected" : "Connected"} repository: ${repo.name}`);
    }
  };
  
  const handleSyncRepositories = () => {
    setIsSyncing(true);
    
    // Simulate sync with delay
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("Repositories synchronized successfully");
      
      // Update last synced time for connected repos
      setRepositories(repositories.map(repo => 
        repo.isConnected ? { ...repo, lastSynced: "Just now" } : repo
      ));
    }, 2000);
  };
  
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
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Repositories</h1>
              <p className="text-muted-foreground">
                Connect and manage repositories for AI code review
              </p>
            </div>
            
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
                              <Badge variant="success">Active</Badge>
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
                        <p className="text-sm text-muted-foreground">Connected to acme-organization</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success">Connected</Badge>
                  </div>
                  
                  <div className="rounded-md bg-muted p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Gitlab className="h-6 w-6" />
                      <div>
                        <h3 className="font-medium">GitLab Integration</h3>
                        <p className="text-sm text-muted-foreground">Connected to acme-group</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success">Connected</Badge>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <h3 className="font-medium">Permissions</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-baseline gap-2">
                        <Check className="h-4 w-4 text-success shrink-0" />
                        <span>Read access to code and metadata</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <Check className="h-4 w-4 text-success shrink-0" />
                        <span>Read and write access to pull requests and issues</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <Check className="h-4 w-4 text-success shrink-0" />
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
