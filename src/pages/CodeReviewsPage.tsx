
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import CodeReviewCard from "@/components/code-reviews/CodeReviewCard";
import CodeReviewStats from "@/components/code-reviews/CodeReviewStats";
import CodeReviewFilters from "@/components/code-reviews/CodeReviewFilters";

interface CodeReview {
  id: number;
  pullRequestTitle: string;
  repository: string;
  createdAt: string;
  status: "Pending" | "Completed";
  issueCount: number;
  suggestions: number;
  securityIssues: number;
  performanceIssues: number;
  codeQualityIssues: number;
  developer: {
    name: string;
    avatar: string;
    initials: string;
  };
  commentCount: number;
}

const CodeReviewsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Enhanced code review data
  const codeReviews: CodeReview[] = [
    {
      id: 1,
      pullRequestTitle: "Add authentication flow",
      repository: "frontend/main",
      createdAt: "Today at 10:24 AM",
      status: "Completed",
      issueCount: 3,
      suggestions: 5,
      securityIssues: 1,
      performanceIssues: 0,
      codeQualityIssues: 2,
      developer: {
        name: "Sarah Kim",
        avatar: "/placeholder.svg",
        initials: "SK"
      },
      commentCount: 8
    },
    {
      id: 2,
      pullRequestTitle: "Fix pagination in user list",
      repository: "backend/api",
      createdAt: "Yesterday at 4:15 PM",
      status: "Completed",
      issueCount: 0,
      suggestions: 2,
      securityIssues: 0,
      performanceIssues: 0,
      codeQualityIssues: 0,
      developer: {
        name: "John Doe",
        avatar: "/placeholder.svg",
        initials: "JD"
      },
      commentCount: 3
    },
    {
      id: 3,
      pullRequestTitle: "Update design system components",
      repository: "design-system",
      createdAt: "2 days ago",
      status: "Completed",
      issueCount: 0,
      suggestions: 3,
      securityIssues: 0,
      performanceIssues: 0,
      codeQualityIssues: 0,
      developer: {
        name: "Alex Martinez",
        avatar: "/placeholder.svg",
        initials: "AM"
      },
      commentCount: 4
    },
    {
      id: 4,
      pullRequestTitle: "Implement search functionality",
      repository: "frontend/search",
      createdAt: "3 hours ago",
      status: "Pending",
      issueCount: 5,
      suggestions: 7,
      securityIssues: 2,
      performanceIssues: 2,
      codeQualityIssues: 1,
      developer: {
        name: "Lisa Park",
        avatar: "/placeholder.svg",
        initials: "LP"
      },
      commentCount: 0
    },
    {
      id: 5,
      pullRequestTitle: "Add unit tests for API endpoints",
      repository: "backend/tests",
      createdAt: "5 hours ago",
      status: "Pending",
      issueCount: 0,
      suggestions: 0,
      securityIssues: 0,
      performanceIssues: 0,
      codeQualityIssues: 0,
      developer: {
        name: "Michael Johnson",
        avatar: "/placeholder.svg",
        initials: "MJ"
      },
      commentCount: 0
    }
  ];

  const filteredReviews = codeReviews.filter(review => 
    review.pullRequestTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.repository.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.developer.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(review => 
    activeTab === "all" || 
    (activeTab === "pending" && review.status === "Pending") ||
    (activeTab === "completed" && review.status === "Completed") ||
    (activeTab === "issues" && review.issueCount > 0)
  );

  // Calculate statistics
  const totalReviews = codeReviews.length;
  const completedReviews = codeReviews.filter(r => r.status === "Completed").length;
  const totalIssues = codeReviews.reduce((sum, review) => sum + review.issueCount, 0);
  const totalComments = codeReviews.reduce((sum, review) => sum + review.commentCount, 0);

  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">AI Code Reviews</h1>
              <p className="text-muted-foreground">
                Our AI has reviewed pull requests from your development team
              </p>
            </div>
            
            {/* Stats Summary */}
            <CodeReviewStats 
              totalReviews={totalReviews}
              completedReviews={completedReviews}
              totalIssues={totalIssues}
              totalComments={totalComments}
            />
            
            {/* Filters */}
            <CodeReviewFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            
            {filteredReviews.length === 0 ? (
              <div className="p-8 text-center border rounded-md">
                <div className="text-muted-foreground">No code reviews matched your search</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredReviews.map((review) => (
                  <CodeReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CodeReviewsPage;
