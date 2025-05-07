
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Github, Gitlab } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PullRequest {
  id: number;
  title: string;
  repository: string;
  author: string;
  status: "Open" | "Merged" | "Closed" | "Draft";
  provider: "github" | "gitlab";
  updatedAt: string;
  reviewStatus: "Pending" | "Approved" | "Changes Requested" | "Reviewing";
  aiIssues: number;
}

const PullRequestsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample pull request data
  const pullRequests: PullRequest[] = [
    {
      id: 1,
      title: "Add authentication flow",
      repository: "frontend/main",
      author: "Sarah K.",
      status: "Open",
      provider: "github",
      updatedAt: "10 minutes ago",
      reviewStatus: "Reviewing",
      aiIssues: 3
    },
    {
      id: 2,
      title: "Fix pagination in user list",
      repository: "backend/api",
      author: "John D.",
      status: "Open",
      provider: "github",
      updatedAt: "2 hours ago",
      reviewStatus: "Approved",
      aiIssues: 0
    },
    {
      id: 3,
      title: "Update design system components",
      repository: "design-system",
      author: "Alex M.",
      status: "Merged",
      provider: "github",
      updatedAt: "1 day ago",
      reviewStatus: "Approved",
      aiIssues: 0
    },
    {
      id: 4,
      title: "Implement search functionality",
      repository: "frontend/search",
      author: "Lisa P.",
      status: "Open",
      provider: "github",
      updatedAt: "3 hours ago",
      reviewStatus: "Changes Requested",
      aiIssues: 5
    },
    {
      id: 5,
      title: "Add unit tests for API endpoints",
      repository: "backend/tests",
      author: "Michael J.",
      status: "Draft",
      provider: "gitlab",
      updatedAt: "5 hours ago",
      reviewStatus: "Pending",
      aiIssues: 0
    }
  ];

  const filteredPRs = pullRequests.filter(pr => 
    pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pr.repository.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pr.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Pull Requests</h1>
              <p className="text-muted-foreground">
                View and manage pull requests across your repositories
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pull requests..."
                  className="pl-9 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="merged">Merged</TabsTrigger>
                    <TabsTrigger value="closed">Closed</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 text-sm font-medium">
                <div className="col-span-5">Pull Request</div>
                <div className="col-span-2">Repository</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-2">AI Review</div>
                <div className="col-span-2">Updated</div>
              </div>
              
              {filteredPRs.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No pull requests matched your search
                </div>
              ) : (
                filteredPRs.map((pr) => (
                  <div key={pr.id} className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 hover:bg-muted/50 items-center">
                    <div className="col-span-5">
                      <div className="flex items-start gap-3">
                        <div className="pt-0.5">
                          {pr.provider === "github" ? (
                            <Github className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Gitlab className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium hover:text-primary hover:underline cursor-pointer">
                            {pr.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            By {pr.author}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        {pr.repository}
                      </span>
                    </div>
                    
                    <div className="col-span-1">
                      <Badge 
                        variant={
                          pr.status === "Open" ? "default" :
                          pr.status === "Merged" ? "success" :
                          pr.status === "Closed" ? "destructive" : "outline"
                        } 
                        className="whitespace-nowrap"
                      >
                        {pr.status}
                      </Badge>
                    </div>
                    
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={
                            pr.reviewStatus === "Approved" ? "success" :
                            pr.reviewStatus === "Changes Requested" ? "destructive" :
                            pr.reviewStatus === "Reviewing" ? "default" : "outline"
                          }
                          className="whitespace-nowrap"
                        >
                          {pr.reviewStatus}
                        </Badge>
                        {pr.aiIssues > 0 && (
                          <Badge variant="destructive" className="bg-destructive/20 text-destructive">
                            {pr.aiIssues} issues
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-sm text-muted-foreground">
                      {pr.updatedAt}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PullRequestsPage;
