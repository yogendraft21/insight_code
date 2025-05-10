
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import StatCard from "@/components/StatCard";
import PerformanceChart from "@/components/PerformanceChart";
import { ChartBar, Check, Clock, FolderOpen } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";

const DashboardPage = () => {
  const user = useAppSelector((state) => state.user.user);
  const firstName = user?.name?.split(' ')[0] || "User";
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back, {firstName}</h1>
              <p className="text-muted-foreground">Here's an overview of your recent activity and insights</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Active PRs"
                value="12"
                icon={<FolderOpen size={20} />}
                description="4 need attention"
              />
              <StatCard
                title="Review Speed"
                value="1.4h"
                icon={<Clock size={20} />}
                trend="up"
                trendValue="12%"
                description="vs last week"
              />
              <StatCard
                title="Issues Identified"
                value="28"
                icon={<Check size={20} />}
                trend="up"
                trendValue="8%"
                description="vs last week"
              />
              <StatCard
                title="Code Quality Score"
                value="87%"
                icon={<ChartBar size={20} />}
                trend="up"
                trendValue="3%"
                description="vs last week"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-7">
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
              
              <div className="md:col-span-2 lg:col-span-2">
                <div className="bg-card border rounded-xl h-full">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-medium">Recent Activity</h2>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      {[
                        { user: "Sarah K.", action: "resolved a comment on", item: "frontend/auth.ts" },
                        { user: "You", action: "addressed AI feedback on", item: "api/models/user.js" },
                        { user: "Michael R.", action: "approved your PR", item: "#283" },
                        { user: "AI Review", action: "found a bug in", item: "utils/validation.ts" },
                        { user: "You", action: "submitted a new PR", item: "#286" }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                            {activity.user.substring(0, 1)}
                          </div>
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">{activity.user}</span>{" "}
                              {activity.action}{" "}
                              <span className="font-medium">{activity.item}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {index === 0 ? "Just now" : 
                               index === 1 ? "30 minutes ago" : 
                               index === 2 ? "2 hours ago" : 
                               index === 3 ? "4 hours ago" : "Yesterday"}
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
                      <th className="h-10 px-4 text-left text-sm font-medium">Title</th>
                      <th className="h-10 px-4 text-left text-sm font-medium">Repository</th>
                      <th className="h-10 px-4 text-left text-sm font-medium">Status</th>
                      <th className="h-10 px-4 text-left text-sm font-medium">Issues</th>
                      <th className="h-10 px-4 text-left text-sm font-medium">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { 
                        title: "Add user authentication flow", 
                        repo: "frontend/main", 
                        status: "Needs Review",
                        issues: 3,
                        updated: "10m ago"
                      },
                      { 
                        title: "Fix pagination bug in API", 
                        repo: "backend/api", 
                        status: "In Progress",
                        issues: 2,
                        updated: "30m ago"
                      },
                      { 
                        title: "Update design system components", 
                        repo: "design-system", 
                        status: "Approved",
                        issues: 0,
                        updated: "1h ago"
                      },
                      { 
                        title: "Implement caching strategy", 
                        repo: "backend/core", 
                        status: "Changes Requested",
                        issues: 5,
                        updated: "3h ago"
                      },
                      { 
                        title: "Refactor test suite", 
                        repo: "testing", 
                        status: "Draft",
                        issues: 1,
                        updated: "5h ago"
                      }
                    ].map((pr, index) => (
                      <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="p-4 align-middle">{pr.title}</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                            {pr.repo}
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            pr.status === "Approved" ? "bg-success/20 text-success" :
                            pr.status === "Needs Review" ? "bg-info/20 text-info" :
                            pr.status === "Changes Requested" ? "bg-destructive/20 text-destructive" :
                            pr.status === "Draft" ? "bg-muted text-muted-foreground" :
                            "bg-warning/20 text-warning"
                          }`}>
                            {pr.status}
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          {pr.issues > 0 ? (
                            <span className="inline-flex items-center rounded-full bg-destructive/20 text-destructive px-2.5 py-0.5 text-xs font-semibold">
                              {pr.issues}
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-success/20 text-success px-2.5 py-0.5 text-xs font-semibold">
                              {pr.issues}
                            </span>
                          )}
                        </td>
                        <td className="p-4 align-middle text-sm text-muted-foreground">
                          {pr.updated}
                        </td>
                      </tr>
                    ))}
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
