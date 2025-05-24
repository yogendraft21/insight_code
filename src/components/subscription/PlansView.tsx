// components/subscription/PlansView.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { StripePaymentModal } from "./StripePaymentModal";

interface PlansViewProps {
  activePlan: string;
}

export const PlansView = ({ activePlan }: PlansViewProps) => {
  const {
    plans,
    loading,
    createSubscription,
    updateSubscription,
    currentSubscription,
    fetchCurrentSubscription,
  } = useSubscription();
  const [updatingPlan, setUpdatingPlan] = useState<string | null>(null);
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    clientSecret: string;
    amount: number;
    description: string;
    planId: string;
    isSetup?: boolean; // Add this
  } | null>(null);
  const { toast } = useToast();

  const handlePlanAction = async (planId: string) => {
    const plan = plans.find((p) => p.name === planId);
    if (!plan) return;
  
    try {
      setUpdatingPlan(planId);
  
      // If user has no subscription, create checkout session
      if (!currentSubscription?.subscription?.plan) {
        const result = await createSubscription(planId);
        
        if (result.success && result.url) {
          // Redirect to Stripe Checkout
          window.location.href = result.url;
        } else {
          toast({
            title: "Error",
            description: "Failed to create checkout session",
            variant: "destructive",
          });
        }
      } else {
        // Keep existing update logic
        await updateSubscription(planId);
        toast({
          title: "Success",
          description: "Subscription updated successfully",
        });
        await fetchCurrentSubscription();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process subscription",
        variant: "destructive",
      });
    } finally {
      setUpdatingPlan(null);
    }
  };

  const handlePaymentSuccess = async () => {
    setPaymentModal(null);
    toast({
      title: "Success",
      description: "Subscription activated successfully!",
    });
    await fetchCurrentSubscription();
  };

  if (loading) {
    return (
      <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="p-6 space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-8 bg-muted rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const currentPlanName = currentSubscription?.subscription?.plan;

  return (
    <>
      <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = plan.name === currentPlanName;

          return (
            <Card
              key={plan.id || plan._id}
              className={`relative flex flex-col h-full ${
                isCurrentPlan ? "border-primary shadow-lg" : ""
              } ${plan.recommended ? "border-primary/50" : ""}`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-primary px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="p-6 flex flex-col h-full">
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="font-semibold text-xl">
                      {plan.displayName}
                    </h3>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-primary font-medium mt-1">
                      {plan.credits.toLocaleString()} credits/month
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-auto">
                  <Button
                    className="w-full"
                    variant={
                      isCurrentPlan
                        ? "secondary"
                        : plan.recommended
                        ? "default"
                        : "outline"
                    }
                    disabled={isCurrentPlan || updatingPlan !== null}
                    onClick={() => handlePlanAction(plan.name)}
                  >
                    {updatingPlan === plan.name
                      ? "Processing..."
                      : isCurrentPlan
                      ? "Current Plan"
                      : currentPlanName
                      ? "Upgrade"
                      : "Subscribe"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {paymentModal && (
        <StripePaymentModal
          isOpen={paymentModal.isOpen}
          onClose={() => setPaymentModal(null)}
          clientSecret={paymentModal.clientSecret}
          amount={paymentModal.amount}
          description={paymentModal.description}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
};
