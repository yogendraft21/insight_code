import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  GitPullRequest,
  GitMerge,
  XCircle,
  RefreshCw,
  ExternalLink,
  Bot,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import api, { PullRequestData } from "@/lib/api";

const PullRequestsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pullRequests, setPullRequests] = useState<PullRequestData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [filter, setFilter] = useState<"all" | "open" | "closed" | "merged">(
    "all"
  );
  const [reviewingPrId, setReviewingPrId] = useState<string | null>(null);

  const fetchPullRequests = async () => {
    try {
      setIsLoading(true);
      const response = await api.pullRequests.getUserPullRequests(
        filter === "all" ? undefined : { state: filter }
      );
      setPullRequests(response.pullRequests);
    } catch (error) {
      console.error("Error fetching pull requests:", error);
      toast.error("Failed to fetch pull requests");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPullRequests();
  }, [filter]);

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      const response = await api.pullRequests.syncAllPullRequests();
      toast.success(response.message);
      await fetchPullRequests();
    } catch (error) {
      console.error("Error syncing pull requests:", error);
      toast.error("Failed to sync pull requests");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleTriggerReview = async (prId: string) => {
    try {
      setReviewingPrId(prId);
      const pr = pullRequests.find((p) => p._id === prId);
      const hasExistingReview = pr && pr.reviews && pr.reviews.length > 0;
      const response = await api.pullRequests.triggerPullRequestReview(
        prId,
        hasExistingReview
      );
      toast.success(response.message);
      await fetchPullRequests();
    } catch (error) {
      console.error("Error triggering review:", error);
      toast.error("Failed to trigger review");
    } finally {
      setReviewingPrId(null);
    }
  };

  const filteredPRs = pullRequests.filter(
    (pr) =>
      pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pr.repositoryId.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      pr.author.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadgeVariant = (state: string) => {
    switch (state) {
      case "open":
        return "default";
      case "merged":
        return "success";
      case "closed":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPRStatusIcon = (state: string) => {
    switch (state) {
      case "open":
        return <GitPullRequest className="h-5 w-5 text-green-600" />;
      case "merged":
        return <GitMerge className="h-5 w-5 text-purple-600" />;
      case "closed":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <GitPullRequest className="h-5 w-5 text-gray-600" />;
    }
  };

  const getReviewStatusInfo = (pr: PullRequestData) => {
    if (pr.reviews.length === 0) {
      return { status: "Pending", variant: "outline" };
    }

    const latestReview = pr.reviews[pr.reviews.length - 1];
    switch (latestReview.status) {
      case "completed":
        return { status: "Reviewed", variant: "success" };
      case "in_progress":
        return { status: "Reviewing", variant: "default" };
      case "failed":
        return { status: "Failed", variant: "destructive" };
      default:
        return { status: "Pending", variant: "outline" };
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  return (
    <div className="flex h-screen">
      <DashboardSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Pull Requests
              </h1>
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
                <Tabs
                  value={filter}
                  onValueChange={(v) => setFilter(v as typeof filter)}
                >
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="merged">Merged</TabsTrigger>
                    <TabsTrigger value="closed">Closed</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSync}
                  disabled={isSyncing}
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 text-sm font-medium">
                <div className="col-span-4">Pull Request</div>
                <div className="col-span-2">Repository</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-2">AI Review</div>
                <div className="col-span-1">Updated</div>
                <div className="col-span-1">Link</div>
                <div className="col-span-1">Actions</div>
              </div>

              {isLoading ? (
                <div className="p-8 text-center text-muted-foreground">
                  Loading pull requests...
                </div>
              ) : filteredPRs.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  {searchQuery
                    ? "No pull requests matched your search"
                    : "No pull requests found"}
                </div>
              ) : (
                filteredPRs.map((pr) => {
                  const reviewStatus = getReviewStatusInfo(pr);
                  const issueCount = pr.reviews.reduce((count, review) => {
                    return (
                      count +
                      (review.feedback?.filter((f) => f.type === "issue")
                        .length || 0)
                    );
                  }, 0);

                  return (
                    <div
                      key={pr._id}
                      className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 hover:bg-muted/50 items-center"
                    >
                      <div className="col-span-4">
                        <div className="flex items-start gap-3">
                          <div className="pt-0.5">
                            {getPRStatusIcon(pr.state)}
                          </div>
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={pr.author.avatarUrl} />
                            <AvatarFallback>
                              {pr.author.username[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{pr.title}</div>
                            <div className="text-sm text-muted-foreground">
                              #{pr.prNumber} by {pr.author.username}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          {pr.repositoryId.fullName}
                        </span>
                      </div>

                      <div className="col-span-1">
                        <Badge
                          variant={getStatusBadgeVariant(pr.state)}
                          className="whitespace-nowrap capitalize"
                        >
                          {pr.state}
                        </Badge>
                      </div>

                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={reviewStatus.variant as any}
                            className="whitespace-nowrap"
                          >
                            {reviewStatus.status}
                          </Badge>
                          {issueCount > 0 && (
                            <Badge
                              variant="destructive"
                              className="bg-destructive/20 text-destructive"
                            >
                              {issueCount} issues
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="col-span-1 text-sm text-muted-foreground">
                        {formatTimeAgo(pr.updatedAt)}
                      </div>

                      <div className="col-span-1 flex justify-left">
                        <a
                          href={pr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>

                      <div className="col-span-1">
                        {pr.state === "open" && (
                          <>
                            {reviewStatus.status === "Reviewing" ? (
                              <Badge
                                variant="outline"
                                className="whitespace-nowrap"
                              >
                                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                In Progress
                              </Badge>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleTriggerReview(pr._id)}
                                disabled={
                                  reviewingPrId === pr._id ||
                                  reviewStatus.status === "Reviewing"
                                }
                                className="whitespace-nowrap"
                              >
                                {reviewingPrId === pr._id ? (
                                  <>
                                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                    Starting...
                                  </>
                                ) : (
                                  <>
                                    <Bot className="h-3 w-3 mr-1" />
                                    {pr.reviews.length > 0
                                      ? "Re-review"
                                      : "AI Review"}
                                  </>
                                )}
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PullRequestsPage;
