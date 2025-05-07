
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import PerformanceChart from "@/components/PerformanceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("30days");
  
  // Sample team members data for demonstration purposes
  const teamMembers = [
    { name: "John Doe", reviewCount: 43, avgResponseTime: "1.2h", issuesFound: 67, qualityScore: 92 },
    { name: "Sarah Kim", reviewCount: 38, avgResponseTime: "0.8h", issuesFound: 52, qualityScore: 95 },
    { name: "Michael Rodriguez", reviewCount: 26, avgResponseTime: "1.7h", issuesFound: 31, qualityScore: 88 },
    { name: "Aisha Patel", reviewCount: 41, avgResponseTime: "1.1h", issuesFound: 49, qualityScore: 91 },
    { name: "David Chen", reviewCount: 29, avgResponseTime: "2.3h", issuesFound: 34, qualityScore: 86 }
  ];
  
  // Sample repository data
  const repositories = [
    { name: "frontend-app", reviewCount: 78, issuesFound: 112, avgReviewTime: "1.3h", qualityScore: 89 },
    { name: "api-service", reviewCount: 53, issuesFound: 87, avgReviewTime: "1.5h", qualityScore: 92 },
    { name: "mobile-app", reviewCount: 41, issuesFound: 53, avgReviewTime: "0.9h", qualityScore: 94 },
    { name: "design-system", reviewCount: 32, issuesFound: 28, avgReviewTime: "1.1h", qualityScore: 97 }
  ];
  
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">
                  Track team performance and code quality metrics
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
            
            <Tabs defaultValue="team">
              <TabsList className="mb-4">
                <TabsTrigger value="team">Team Performance</TabsTrigger>
                <TabsTrigger value="repositories">Repository Analysis</TabsTrigger>
                <TabsTrigger value="issues">Issue Breakdown</TabsTrigger>
              </TabsList>
              
              <TabsContent value="team">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Member Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 gap-4 p-4 border-b bg-muted/50 text-sm font-medium">
                        <div>Team Member</div>
                        <div>Reviews</div>
                        <div>Avg. Response Time</div>
                        <div>Issues Found</div>
                        <div>Quality Score</div>
                      </div>
                      
                      {teamMembers.map((member, index) => (
                        <div key={index} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center hover:bg-muted/50">
                          <div className="font-medium">{member.name}</div>
                          <div>{member.reviewCount}</div>
                          <div>{member.avgResponseTime}</div>
                          <div>{member.issuesFound}</div>
                          <div className="flex items-center gap-2">
                            <div className="bg-muted h-2 w-24 rounded-full overflow-hidden">
                              <div 
                                className="bg-primary h-full" 
                                style={{ width: `${member.qualityScore}%` }}
                              />
                            </div>
                            <span>{member.qualityScore}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="repositories">
                <Card>
                  <CardHeader>
                    <CardTitle>Repository Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 gap-4 p-4 border-b bg-muted/50 text-sm font-medium">
                        <div>Repository</div>
                        <div>Reviews</div>
                        <div>Issues Found</div>
                        <div>Avg. Review Time</div>
                        <div>Quality Score</div>
                      </div>
                      
                      {repositories.map((repo, index) => (
                        <div key={index} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center hover:bg-muted/50">
                          <div className="font-medium">{repo.name}</div>
                          <div>{repo.reviewCount}</div>
                          <div>{repo.issuesFound}</div>
                          <div>{repo.avgReviewTime}</div>
                          <div className="flex items-center gap-2">
                            <div className="bg-muted h-2 w-24 rounded-full overflow-hidden">
                              <div 
                                className="bg-primary h-full" 
                                style={{ width: `${repo.qualityScore}%` }}
                              />
                            </div>
                            <span>{repo.qualityScore}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="issues">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Issue Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          Issue Types Chart Placeholder
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Code Quality</span>
                            <span className="text-sm font-medium">42%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Performance</span>
                            <span className="text-sm font-medium">28%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Security</span>
                            <span className="text-sm font-medium">18%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Maintainability</span>
                            <span className="text-sm font-medium">12%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Issue Resolution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          Resolution Chart Placeholder
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Resolved</span>
                            <span className="text-sm font-medium">76%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">In Progress</span>
                            <span className="text-sm font-medium">14%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Pending</span>
                            <span className="text-sm font-medium">8%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Rejected</span>
                            <span className="text-sm font-medium">2%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;
