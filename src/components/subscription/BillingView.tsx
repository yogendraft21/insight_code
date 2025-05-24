// components/subscription/BillingView.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, CreditCard, Settings, Zap } from "lucide-react";
import { useBilling } from "@/hooks/useBilling";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const BillingView = () => {
  const {
    transactions,
    paymentMethods,
    loading,
    setDefaultPaymentMethod,
    downloadInvoice,
  } = useBilling();
  const [updatingDefault, setUpdatingDefault] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSetDefault = async (paymentMethodId: string) => {
    try {
      setUpdatingDefault(paymentMethodId);
      await setDefaultPaymentMethod(paymentMethodId);
      toast({
        title: "Success",
        description: "Default payment method updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update payment method",
        variant: "destructive",
      });
    } finally {
      setUpdatingDefault(null);
    }
  };

  const handleDownloadInvoice = async (transactionId: string) => {
    try {
      await downloadInvoice(transactionId);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download invoice",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="h-full flex gap-6">
        <div className="w-1/3">
          <Card className="p-6 h-full animate-pulse">
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-20 bg-muted rounded"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
          </Card>
        </div>
        <div className="flex-1">
          <Card className="h-full animate-pulse">
            <div className="p-6 space-y-4">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="h-20 bg-muted rounded"></div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex gap-6">
      {/* Left side - Payment Method */}
      <div className="w-1/3">
        <Card className="p-6 h-full">
          <h3 className="font-semibold mb-4">Payment Methods</h3>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <p className="font-medium">
                        •••• •••• •••• {method.last4}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {method.brand} • Expires {method.expMonth}/
                        {method.expYear}
                      </p>
                    </div>
                  </div>
                  {method.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                </div>
                {!method.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    disabled={updatingDefault !== null}
                    onClick={() => handleSetDefault(method.id)}
                  >
                    {updatingDefault === method.id
                      ? "Updating..."
                      : "Set as Default"}
                  </Button>
                )}
              </div>
            ))}

            {paymentMethods.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No payment methods added
              </div>
            )}

            <Button variant="outline" className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </Card>
      </div>

      {/* Right side - Transaction History */}
      <div className="flex-1">
        <Card className="h-full flex flex-col">
          <div className="p-6 border-b">
            <h3 className="font-semibold">Transaction History</h3>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="divide-y">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "subscription"
                            ? "bg-blue-100"
                            : "bg-purple-100"
                        }`}
                      >
                        {transaction.type === "subscription" ||
                        transaction.type === "subscription_renewal" ? (
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Zap className="h-5 w-5 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">
                          ${transaction.amount.toFixed(2)}
                        </p>
                        <Badge
                          variant="outline"
                          className={
                            transaction.status === "completed"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : transaction.status === "failed"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                      {transaction.status === "completed" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadInvoice(transaction.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {transactions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No transactions found
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
