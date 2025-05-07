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
  Cell
} from "recharts";
import { useState } from "react";

const data = [
  { name: "Apr 1", reviews: 4, insights: 2, issues: 3 },
  { name: "Apr 2", reviews: 3, insights: 3, issues: 2 },
  { name: "Apr 3", reviews: 8, insights: 5, issues: 4 },
  { name: "Apr 4", reviews: 5, insights: 3, issues: 3 },
  { name: "Apr 5", reviews: 7, insights: 4, issues: 5 },
  { name: "Apr 6", reviews: 6, insights: 3, issues: 4 },
  { name: "Apr 7", reviews: 9, insights: 6, issues: 5 },
  { name: "Apr 8", reviews: 11, insights: 8, issues: 6 },
  { name: "Apr 9", reviews: 8, insights: 5, issues: 4 },
  { name: "Apr 10", reviews: 12, insights: 7, issues: 5 },
  { name: "Apr 11", reviews: 14, insights: 9, issues: 6 },
  { name: "Apr 12", reviews: 16, insights: 10, issues: 8 },
  { name: "Apr 13", reviews: 10, insights: 6, issues: 5 },
  { name: "Apr 14", reviews: 12, insights: 8, issues: 6 },
];

const issueTypes = [
  { name: "Performance", value: 42, color: "#4F46E5" },
  { name: "Security", value: 28, color: "#DC2626" },
  { name: "Maintainability", value: 20, color: "#059669" },
  { name: "Other", value: 10, color: "#D97706" },
];

const COLORS = ["#4F46E5", "#DC2626", "#059669", "#D97706"];

interface PerformanceChartProps {
  height?: number;
}

const PerformanceChart = ({ height = 300 }: PerformanceChartProps) => {
  const [activeChart, setActiveChart] = useState<"trend" | "types" | "impact">("trend");

  const renderTrendChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorInsights" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#059669" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#DC2626" stopOpacity={0.6} />
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
        <YAxis 
          stroke="#888" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <CartesianGrid vertical={false} stroke="#eee" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="reviews"
          stroke="#4F46E5"
          fillOpacity={1}
          fill="url(#colorReviews)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="insights"
          stroke="#059669"
          fillOpacity={1}
          fill="url(#colorInsights)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="issues"
          stroke="#DC2626"
          fillOpacity={1}
          fill="url(#colorIssues)"
          strokeWidth={2}
        />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderTypeChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={issueTypes}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}%`}
          labelLine={false}
        >
          {issueTypes.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderImpactChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={[
          { name: "Before AI", review: 68, quality: 42, issues: 35 },
          { name: "After AI", review: 27, quality: 78, issues: 12 }
        ]}
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
        <YAxis 
          stroke="#888" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="review" name="Review Time (min)" fill="#4F46E5" radius={[4, 4, 0, 0]} />
        <Bar dataKey="quality" name="Code Quality Score" fill="#059669" radius={[4, 4, 0, 0]} />
        <Bar dataKey="issues" name="Production Issues" fill="#DC2626" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4 border-b pb-2">
        <button 
          onClick={() => setActiveChart("trend")}
          className={`text-sm px-3 py-1 rounded-md transition-colors ${activeChart === "trend" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
        >
          Trend
        </button>
        <button 
          onClick={() => setActiveChart("types")}
          className={`text-sm px-3 py-1 rounded-md transition-colors ${activeChart === "types" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
        >
          Issue Types
        </button>
        <button 
          onClick={() => setActiveChart("impact")}
          className={`text-sm px-3 py-1 rounded-md transition-colors ${activeChart === "impact" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
        >
          AI Impact
        </button>
      </div>
      <div className="h-[300px]">
        {activeChart === "trend" && renderTrendChart()}
        {activeChart === "types" && renderTypeChart()}
        {activeChart === "impact" && renderImpactChart()}
      </div>
    </div>
  );
};

export default PerformanceChart;