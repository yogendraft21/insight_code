import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import StatCard from "@/components/StatCard";
import PerformanceChart from "@/components/PerformanceChart";
import {
  ChartBar,
  Check,
  Clock,
  FolderOpen,
  GitPullRequest,
  AlertTriangle,
  TrendingUp,
  Users,
  Trophy,
  Zap,
  Shield,
} from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";
import api from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

const DashboardPage = () => {
  const user = useAppSelector((state) => state.user.user);
  const firstName = user?.name?.split(" ")[0] || "User";

  const [stats, setStats] = useState({
    activePRs: 0,
    criticalIssues: 0,
    reviewsCompleted: 0,
    issuesFound: 0,
    codeQualityScore: 0,
  });

  const [recentPRs, setRecentPRs] = useState([]);
  const [topRepositories, setTopRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch pull requests
      const prResponse = await api.pullRequests.getUserPullRequests();
      const pullRequests = prResponse.pullRequests;

      // Filter only open PRs
      const openPRs = pullRequests.filter((pr) => pr.state === "open");

      // Calculate stats
      let criticalIssues = 0;
      let totalIssues = 0;
      let resolvedIssues = 0;
      let completedReviews = 0;
      let totalQualityScore = 0;
      let totalSecurityScore = 0;
      let reviewCount = 0;
      const repoStats = {};

      pullRequests.forEach((pr) => {
        // Count repos
        const repoName = pr.repositoryId.name;
        repoStats[repoName] = (repoStats[repoName] || 0) + 1;

        if (pr.reviews) {
          pr.reviews.forEach((review) => {
            if (review.status === "completed") {
              completedReviews++;

              if (review.feedback) {
                review.feedback.forEach((fb) => {
                  if (fb.type === "issue") {
                    totalIssues++;
                    if (fb.severity === "high") criticalIssues++;
                  }
                });
              }

              if (review.metrics) {
                if (review.metrics.codeQualityScore) {
                  totalQualityScore += review.metrics.codeQualityScore;
                  reviewCount++;
                }
                if (review.metrics.securityScore) {
                  totalSecurityScore += review.metrics.securityScore;
                }
              }
            }
          });
        }
      });

      // Get top repositories
      const topRepos = Object.entries(repoStats)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 3)
        .map(([name, count]) => ({ name, count }));

      setTopRepositories(topRepos);

      const avgQualityScore =
        reviewCount > 0 ? Math.round(totalQualityScore / reviewCount) : 85;

      const avgSecurityScore =
        reviewCount > 0 ? Math.round(totalSecurityScore / reviewCount) : 92;

      setStats({
        activePRs: openPRs.length,
        criticalIssues,
        reviewsCompleted: completedReviews,
        issuesFound: totalIssues, // Changed from issuesResolved
        codeQualityScore: avgQualityScore,
      });
      // Get recent open PRs
      const sortedOpenPRs = openPRs
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
        .slice(0, 5);

      setRecentPRs(sortedOpenPRs);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getReviewStatus = (pr) => {
    const hasReview = pr.reviews && pr.reviews.length > 0;
    const latestReview = hasReview ? pr.reviews[pr.reviews.length - 1] : null;

    if (!latestReview)
      return { text: "Needs Review", color: "text-muted-foreground" };
    if (latestReview.status === "in_progress")
      return { text: "In Review", color: "text-blue-600" };

    if (latestReview.status === "completed") {
      const hasIssues = latestReview.feedback?.some((f) => f.type === "issue");
      const hasCritical = latestReview.feedback?.some(
        (f) => f.type === "issue" && f.severity === "high"
      );

      if (hasCritical)
        return { text: "Critical Issues", color: "text-destructive" };
      if (hasIssues) return { text: "Issues Found", color: "text-warning" };
      return { text: "Approved", color: "text-success" };
    }

    return { text: "Pending", color: "text-muted-foreground" };
  };

  if (loading) {
    return (
      <div className="flex h-screen">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="flex items-center justify-center h-full">
              <div className="text-lg text-muted-foreground">
                Loading dashboard...
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <DashboardSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back, {firstName}
              </h1>
              <p className="text-muted-foreground">
                Here's an overview of your recent activity and insights
              </p>
            </div>

            {/* Main Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Active PRs"
                value={stats.activePRs.toString()}
                icon={<GitPullRequest size={20} />}
                description="Open for review"
              />

              <StatCard
                title="Reviews Done"
                value={stats.reviewsCompleted.toString()}
                icon={<Check size={20} />}
                description="Total completed"
              />
              <StatCard
                title="Issues Found"
                value={stats.issuesFound.toString()}
                icon={<Zap size={20} />}
                description="By AI reviewer"
              />
              <StatCard
                title="Code Quality"
                value={`${stats.codeQualityScore}%`}
                icon={<ChartBar size={20} />}
                description="Average score"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-7">
              {/* Performance Chart */}
              <div className="md:col-span-5 lg:col-span-5">
                <div className="bg-card border rounded-xl p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium">Performance Trends</h2>
                    <Tabs defaultValue="2weeks">
                      <TabsList>
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="2weeks">2 Weeks</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <PerformanceChart height={350} />
                  <div className="flex gap-6 mt-4 justify-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                      <span className="text-sm">Code Reviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-success"></div>
                      <span className="text-sm">Actionable Insights</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="md:col-span-2 lg:col-span-2">
                <div className="bg-card border rounded-xl h-full">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-medium">Recent Activity</h2>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      {[
                        {
                          user: "Sarah K.",
                          action: "resolved a comment on",
                          item: "frontend/auth.ts",
                        },
                        {
                          user: "You",
                          action: "addressed AI feedback on",
                          item: "api/models/user.js",
                        },
                        {
                          user: "Michael R.",
                          action: "approved your PR",
                          item: "#283",
                        },
                        {
                          user: "AI Review",
                          action: "found issues in",
                          item: "utils/validation.ts",
                        },
                        {
                          user: "You",
                          action: "submitted a new PR",
                          item: "#286",
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                        >
                          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                            {activity.user.substring(0, 1)}
                          </div>
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">
                                {activity.user}
                              </span>{" "}
                              {activity.action}{" "}
                              <span className="font-medium">
                                {activity.item}
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {index === 0
                                ? "Just now"
                                : index === 1
                                ? "30 minutes ago"
                                : index === 2
                                ? "2 hours ago"
                                : index === 3
                                ? "4 hours ago"
                                : "Yesterday"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-xl">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">Open Pull Requests</h2>
              </div>
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-10 px-4 text-left text-sm font-medium">
                        Title
                      </th>
                      <th className="h-10 px-4 text-left text-sm font-medium">
                        Repository
                      </th>
                      <th className="h-10 px-4 text-left text-sm font-medium">
                        Status
                      </th>
                      <th className="h-10 px-4 text-left text-sm font-medium">
                        Issues
                      </th>
                      <th className="h-10 px-4 text-left text-sm font-medium">
                        Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPRs.map((pr, index) => {
                      const latestReview =
                        pr.reviews && pr.reviews.length > 0
                          ? pr.reviews[pr.reviews.length - 1]
                          : null;
                      const issueCount =
                        latestReview?.feedback?.filter(
                          (f) => f.type === "issue"
                        ).length || 0;
                      const status = getReviewStatus(pr);

                      return (
                        <tr
                          key={pr._id}
                          className="border-b last:border-0 hover:bg-muted/50"
                        >
                          <td className="p-4 align-middle">{pr.title}</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              {pr.repositoryId.name}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <span
                              className={`text-sm font-medium ${status.color}`}
                            >
                              {status.text}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            {issueCount > 0 ? (
                              <span className="inline-flex items-center rounded-full bg-destructive/20 text-destructive px-2.5 py-0.5 text-xs font-semibold">
                                {issueCount}
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-success/20 text-success px-2.5 py-0.5 text-xs font-semibold">
                                0
                              </span>
                            )}
                          </td>
                          <td className="p-4 align-middle text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(pr.updatedAt), {
                              addSuffix: true,
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
