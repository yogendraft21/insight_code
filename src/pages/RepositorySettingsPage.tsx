
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Gitlab, Plus, RefreshCw, Search, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Repository {
  id: number;
  name: string;
  fullName: string;
  provider: "github" | "gitlab";
  active: boolean;
  lastSynced: string;
}

const RepositorySettingsPage = () => {
  const [repositories, setRepositories] = useState<Repository[]>([
    { 
      id: 1, 
      name: "frontend-app", 
      fullName: "acme/frontend-app", 
      provider: "github", 
      active: true, 
      lastSynced: "2 hours ago" 
    },
    { 
      id: 2, 
      name: "api-service", 
      fullName: "acme/api-service", 
      provider: "github", 
      active: true, 
      lastSynced: "3 hours ago" 
    },
    { 
      id: 3, 
      name: "design-system", 
      fullName: "acme/design-system", 
      provider: "github", 
      active: false, 
      lastSynced: "1 day ago" 
    },
    { 
      id: 4, 
      name: "mobile-app", 
      fullName: "acme/mobile-app", 
      provider: "github", 
      active: true, 
      lastSynced: "5 hours ago" 
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  
  const filteredRepositories = repositories.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    repo.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleToggleRepository = (id: number) => {
    setRepositories(repositories.map(repo => 
      repo.id === id ? { ...repo, active: !repo.active } : repo
    ));
    
    const repo = repositories.find(r => r.id === id);
    if (repo) {
      toast.success(`${repo.active ? "Disabled" : "Enabled"} repository: ${repo.fullName}`);
    }
  };
  
  const handleRemoveRepository = (id: number) => {
    const repo = repositories.find(r => r.id === id);
    setRepositories(repositories.filter(repo => repo.id !== id));
    
    if (repo) {
      toast.success(`Removed repository: ${repo.fullName}`);
    }
  };
  
  const handleSyncRepositories = () => {
    setIsSyncing(true);
    
    // Simulate sync
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("Repositories synchronized successfully");
    }, 2000);
  };

  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Repository Settings</h1>
              <p className="text-muted-foreground">Manage the repositories connected to the AI code review platform</p>
            </div>
            
            <div className="grid gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <div>
                    <CardTitle>Connected Repositories</CardTitle>
                    <CardDescription>
                      Repositories that are currently connected to the AI code review platform
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
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Repository
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Label htmlFor="search-repos" className="sr-only">Search repositories</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search-repos"
                        placeholder="Search repositories..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="border rounded-md">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 text-sm font-medium">
                      <div className="col-span-5">Repository</div>
                      <div className="col-span-2">Provider</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Last Synced</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    {filteredRepositories.length === 0 ? (
                      <div className="p-6 text-center text-muted-foreground">
                        No repositories found
                      </div>
                    ) : (
                      filteredRepositories.map((repo) => (
                        <div key={repo.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center last:border-0">
                          <div className="col-span-5 font-medium">{repo.fullName}</div>
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
                                checked={repo.active} 
                                onCheckedChange={() => handleToggleRepository(repo.id)}
                              />
                              {repo.active ? (
                                <Badge variant="success" className="ml-2">Active</Badge>
                              ) : (
                                <Badge variant="outline" className="ml-2">Inactive</Badge>
                              )}
                            </div>
                          </div>
                          <div className="col-span-2 text-muted-foreground text-sm">
                            {repo.lastSynced}
                          </div>
                          <div className="col-span-1 text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleRemoveRepository(repo.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>GitHub Integration</CardTitle>
                  <CardDescription>
                    Manage your GitHub connection settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Permissions</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-baseline gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-1.5"></span>
                        <span>Read access to code and metadata</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-1.5"></span>
                        <span>Read and write access to pull requests and issues</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-1.5"></span>
                        <span>Read access to members and teams</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reconnect</Button>
                  <Button variant="destructive">Disconnect</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RepositorySettingsPage;
