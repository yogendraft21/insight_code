
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CodeReviewStatsProps {
  totalReviews: number;
  completedReviews: number;
  totalIssues: number;
  totalComments: number;
}

const CodeReviewStats = ({ 
  totalReviews,
  completedReviews,
  totalIssues,
  totalComments
}: CodeReviewStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalReviews}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {completedReviews} completed
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">Issues Found</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalIssues}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Across all repositories
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">AI Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalComments}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Suggestions and improvements
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">Review Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">147</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-success">Unlimited</span> on current plan
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeReviewStats;
