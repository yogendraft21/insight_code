// components/subscription/CreditsView.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, Gift } from "lucide-react";
import { useCredits } from "@/hooks/useCredits";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { StripePaymentModal } from "./StripePaymentModal";

export const CreditsView = () => {
  const { packages, loading, purchaseCredits, fetchBalance } = useCredits();
  const [purchasingPackage, setPurchasingPackage] = useState<string | null>(
    null
  );
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    clientSecret: string;
    amount: number;
    description: string;
    packageId: string;
  } | null>(null);
  const { toast } = useToast();

  const handlePurchase = async (packageId: string) => {
    const pkg = packages.find((p) => (p.id || p._id) === packageId);
    if (!pkg) return;

    try {
      setPurchasingPackage(packageId);
      const result = await purchaseCredits(packageId);

      if (result.clientSecret) {
        // Open payment modal
        setPaymentModal({
          isOpen: true,
          clientSecret: result.clientSecret,
          amount: pkg.price,
          description: `${pkg.credits} Credits Purchase`,
          packageId: packageId,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate credit purchase",
        variant: "destructive",
      });
    } finally {
      setPurchasingPackage(null);
    }
  };

  const handlePaymentSuccess = async () => {
    setPaymentModal(null);
    toast({
      title: "Success",
      description: "Credits added successfully!",
    });
    await fetchBalance();
  };

  if (loading) {
    return (
      <div className="h-full">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Purchase Additional Credits
          </h2>
          <p className="text-sm text-muted-foreground">
            One-time purchase • Credits never expire • Use anytime
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100%-100px)]">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="p-6 space-y-4">
                <div className="h-12 w-12 bg-muted rounded-lg"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
                <div className="h-10 bg-muted rounded"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const getIcon = (packageName: string) => {
    switch (packageName) {
      case "small":
        return Zap;
      case "medium":
        return TrendingUp;
      case "large":
        return Gift;
      default:
        return Zap;
    }
  };

  const getColors = (packageName: string) => {
    switch (packageName) {
      case "small":
        return { color: "text-blue-600", bgColor: "bg-blue-50" };
      case "medium":
        return { color: "text-purple-600", bgColor: "bg-purple-50" };
      case "large":
        return { color: "text-green-600", bgColor: "bg-green-50" };
      default:
        return { color: "text-blue-600", bgColor: "bg-blue-50" };
    }
  };

  return (
    <>
      <div className="h-full">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Purchase Additional Credits
          </h2>
          <p className="text-sm text-muted-foreground">
            One-time purchase • Credits never expire • Use anytime
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100%-100px)]">
          {packages.map((pkg) => {
            const Icon = getIcon(pkg.name);
            const colors = getColors(pkg.name);
            const packageId = pkg.id || pkg._id;
            const isProcessing = purchasingPackage === packageId;

            return (
              <Card
                key={packageId}
                className={`relative flex flex-col h-full ${
                  pkg.popular ? "border-primary shadow-lg" : ""
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary z-10">
                    Best Value
                  </Badge>
                )}

                <div className="p-6 flex flex-col h-full">
                  <div className="space-y-4 flex-1">
                    <div
                      className={`${colors.bgColor} w-12 h-12 rounded-lg flex items-center justify-center`}
                    >
                      <Icon className={`h-6 w-6 ${colors.color}`} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">
                        {pkg.credits.toLocaleString()} Credits
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ${(pkg.price / pkg.credits).toFixed(2)} per credit
                      </p>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">${pkg.price}</span>
                        {pkg.discount > 0 && (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700"
                          >
                            Save {pkg.discount}%
                          </Badge>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Instant activation</li>
                      <li>• No monthly commitment</li>
                      <li>• Roll over month to month</li>
                    </ul>
                  </div>

                  <div className="pt-6 mt-auto">
                    <Button
                      className="w-full"
                      variant={pkg.popular ? "default" : "outline"}
                      disabled={purchasingPackage !== null}
                      onClick={() => handlePurchase(packageId)}
                    >
                      {isProcessing ? "Processing..." : "Buy Now"}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
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
