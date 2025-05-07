
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Code, Check, AlertCircle, BarChart } from "lucide-react";

interface CodeReviewCardProps {
  review: {
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
  };
}

const CodeReviewCard = ({ review }: CodeReviewCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={review.developer.avatar} alt={review.developer.name} />
              <AvatarFallback>{review.developer.initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg hover:text-primary hover:underline cursor-pointer">
                {review.pullRequestTitle}
              </CardTitle>
              <CardDescription>
                {review.repository} • by {review.developer.name} • {review.createdAt}
              </CardDescription>
            </div>
          </div>
          <Badge 
            variant={review.status === "Completed" ? "success" : "default"}
          >
            {review.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-sm">
                {review.commentCount} AI comments
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {review.suggestions} suggestions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">
                {review.issueCount === 0 ? "No issues found" : `${review.issueCount} issues found`}
              </span>
            </div>
          </div>
          
          <div>
            {(review.securityIssues > 0 || review.performanceIssues > 0 || review.codeQualityIssues > 0) && (
              <div className="space-y-2">
                {review.securityIssues > 0 && (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-3 w-3 text-destructive" />
                    <span className="text-xs">
                      {review.securityIssues} security {review.securityIssues === 1 ? "issue" : "issues"}
                    </span>
                  </div>
                )}
                {review.performanceIssues > 0 && (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-3 w-3 text-warning" />
                    <span className="text-xs">
                      {review.performanceIssues} performance {review.performanceIssues === 1 ? "issue" : "issues"}
                    </span>
                  </div>
                )}
                {review.codeQualityIssues > 0 && (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-3 w-3 text-info" />
                    <span className="text-xs">
                      {review.codeQualityIssues} code quality {review.codeQualityIssues === 1 ? "issue" : "issues"}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex justify-end gap-2">
          <Button size="sm" variant="outline" className="gap-1">
            <BarChart className="h-4 w-4" />
            <span>Analysis</span>
          </Button>
          <Button size="sm" variant="default">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeReviewCard;
