// components/subscription/CurrentStatusBar.tsx
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useEffect } from "react";

export const CurrentStatusBar = () => {
  const { currentSubscription, loading, fetchCurrentSubscription } =
    useSubscription();

  useEffect(() => {
    fetchCurrentSubscription();
  }, []);

  if (loading || !currentSubscription) {
    return (
      <div className="bg-card border rounded-lg p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="h-8 bg-muted rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  const { subscription, credits, currentPlan } = currentSubscription;
  const totalCredits = credits?.total || 0;
  const usedCredits = credits?.used || 0;
  const usagePercentage =
    totalCredits > 0 ? (usedCredits / totalCredits) * 100 : 0;

  // Calculate days remaining
  const currentPeriodEnd = subscription?.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd)
    : new Date();
  const now = new Date();
  const daysRemaining = Math.ceil(
    (currentPeriodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate daily average
  const currentPeriodStart = subscription?.currentPeriodStart
    ? new Date(subscription.currentPeriodStart)
    : new Date();
  const daysInPeriod = Math.ceil(
    (currentPeriodEnd.getTime() - currentPeriodStart.getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const daysElapsed = daysInPeriod - daysRemaining;
  const dailyAverage =
    daysElapsed > 0 ? Math.round(usedCredits / daysElapsed) : 0;

  // Project usage for the month
  const projectedUsage = dailyAverage * daysInPeriod;
  const willExceed = projectedUsage > totalCredits;

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Current Plan */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            Current Plan
          </p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">
              {currentPlan?.displayName || subscription?.plan || "No Plan"}
            </p>
            {subscription?.status && (
              <Badge
                variant="secondary"
                className={
                  subscription.status === "active"
                    ? "bg-green-100 text-green-700"
                    : ""
                }
              >
                {subscription.status}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {subscription?.plan
              ? `Renews in ${daysRemaining} days`
              : "No active subscription"}
          </p>
        </div>

        {/* Credits Usage */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            Credits Used
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">{usedCredits}</p>
            <p className="text-sm text-muted-foreground">/ {totalCredits}</p>
          </div>
          <Progress value={usagePercentage} className="h-2" />
        </div>

        {/* Daily Average */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            Daily Average
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">{dailyAverage}</p>
            <p className="text-sm text-muted-foreground">credits/day</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Last {daysElapsed} days
          </p>
        </div>

        {/* Projected Usage */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            Month Projection
          </p>
          <div className="flex items-center gap-2">
            <p
              className={`text-2xl font-bold ${
                willExceed ? "text-yellow-600" : "text-green-600"
              }`}
            >
              {projectedUsage}
            </p>
            {willExceed ? (
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            ) : (
              <TrendingUp className="h-5 w-5 text-green-600" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {willExceed ? "Exceeds limit" : "Within limit"}
          </p>
        </div>
      </div>
    </div>
  );
};
