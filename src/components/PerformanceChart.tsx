import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { format, subDays } from "date-fns";

interface PerformanceChartProps {
  height?: number;
}

const PerformanceChart = ({ height = 300 }: PerformanceChartProps) => {
  const [activeChart, setActiveChart] = useState<
    "trend" | "severity" | "repositories"
  >("trend");
  const [chartData, setChartData] = useState({
    trendData: [],
    severityData: [],
    repositoryData: [],
  });

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const prResponse = await api.pullRequests.getUserPullRequests();
      const pullRequests = prResponse.pullRequests;

      // Generate trend data for the last 14 days
      const last14Days = Array.from({ length: 14 }, (_, i) => {
        const date = subDays(new Date(), 13 - i);
        return {
          date,
          dateStr: format(date, "MMM d"),
          prs: 0,
          reviews: 0,
          issues: 0,
        };
      });

      // Count metrics by date
      pullRequests.forEach((pr) => {
        const prDate = new Date(pr.createdAt);
        const dayIndex = last14Days.findIndex(
          (day) =>
            format(day.date, "yyyy-MM-dd") === format(prDate, "yyyy-MM-dd")
        );

        if (dayIndex !== -1) {
          last14Days[dayIndex].prs++;

          if (pr.reviews) {
            pr.reviews.forEach((review) => {
              if (review.status === "completed") {
                last14Days[dayIndex].reviews++;

                if (review.feedback) {
                  const issueCount = review.feedback.filter(
                    (f) => f.type === "issue"
                  ).length;
                  last14Days[dayIndex].issues += issueCount;
                }
              }
            });
          }
        }
      });

      // Calculate severity distribution (only for issues)
      const severityCount = {
        low: 0,
        medium: 0,
        high: 0,
      };

      // Repository issue count
      const repoIssueCount = {};

      pullRequests.forEach((pr) => {
        const repoName = pr.repositoryId.name;

        if (pr.reviews) {
          pr.reviews.forEach((review) => {
            if (review.feedback) {
              review.feedback.forEach((fb) => {
                if (fb.type === "issue") {
                  severityCount[fb.severity] =
                    (severityCount[fb.severity] || 0) + 1;
                  repoIssueCount[repoName] =
                    (repoIssueCount[repoName] || 0) + 1;
                }
              });
            }
          });
        }
      });

      // Convert to chart format
      const severityData = Object.entries(severityCount)
        .filter(([_, value]) => value > 0)
        .map(([name, value]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          count: value,
        }));

      const repositoryData = Object.entries(repoIssueCount)
        .map(([name, count]) => ({ name, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5); 

      setChartData({
        trendData: last14Days.map((day) => ({
          name: day.dateStr,
          "Pull Requests": day.prs,
          Reviews: day.reviews,
          Issues: day.issues,
        })),
        severityData,
        repositoryData,
      });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const renderTrendChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData.trendData}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPRs" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#DC2626" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          stroke="#888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
        <CartesianGrid vertical={false} stroke="#eee" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Pull Requests"
          stroke="#3B82F6"
          fillOpacity={1}
          fill="url(#colorPRs)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="Reviews"
          stroke="#10B981"
          fillOpacity={1}
          fill="url(#colorReviews)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="Issues"
          stroke="#DC2626"
          fillOpacity={1}
          fill="url(#colorIssues)"
          strokeWidth={2}
        />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderSeverityChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData.severityData}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid vertical={false} stroke="#eee" />
        <XAxis
          dataKey="name"
          stroke="#888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar dataKey="count" name="Issues" radius={[4, 4, 0, 0]}>
          {chartData.severityData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.name.toLowerCase() === "high"
                  ? "#DC2626"
                  : entry.name.toLowerCase() === "medium"
                  ? "#F59E0B"
                  : "#10B981"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  const renderRepositoryChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData.repositoryData}
        layout="vertical"
        margin={{ top: 10, right: 10, left: 80, bottom: 0 }}
      >
        <CartesianGrid horizontal={false} stroke="#eee" />
        <XAxis type="number" stroke="#888" fontSize={12} />
        <YAxis
          dataKey="name"
          type="category"
          stroke="#888"
          fontSize={12}
          width={80}
        />
        <Tooltip />
        <Bar
          dataKey="count"
          name="Issues Found"
          fill="#DC2626"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4 border-b pb-2">
        <button
          onClick={() => setActiveChart("trend")}
          className={`text-sm px-3 py-1 rounded-md transition-colors ${
            activeChart === "trend"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          Activity Trend
        </button>
        <button
          onClick={() => setActiveChart("severity")}
          className={`text-sm px-3 py-1 rounded-md transition-colors ${
            activeChart === "severity"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          Issue Severity
        </button>
        <button
          onClick={() => setActiveChart("repositories")}
          className={`text-sm px-3 py-1 rounded-md transition-colors ${
            activeChart === "repositories"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          By Repository
        </button>
      </div>
      <div style={{ height: `${height}px` }}>
        {activeChart === "trend" && renderTrendChart()}
        {activeChart === "severity" && renderSeverityChart()}
        {activeChart === "repositories" && renderRepositoryChart()}
      </div>
    </div>
  );
};

export default PerformanceChart;
