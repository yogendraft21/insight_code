// pages/SubscriptionPage.tsx
import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CreditCard, Package, Receipt } from "lucide-react";
import { CurrentStatusBar } from "@/components/subscription/CurrentStatusBar";
import { PlansView } from "@/components/subscription/PlansView";
import { CreditsView } from "@/components/subscription/CreditsView";
import { BillingView } from "@/components/subscription/BillingView";
import { useSubscription } from "@/hooks/useSubscription";

const SubscriptionPage = () => {
  const [activeTab, setActiveTab] = useState("plans");
  const { currentSubscription } = useSubscription();

  // Get current plan from subscription data
  const activePlan = currentSubscription?.subscription?.plan || "";

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full">
          {/* Fixed Header Section */}
          <div className="space-y-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Subscription Management
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your plan, credits, and billing
              </p>
            </div>
            <CurrentStatusBar />
          </div>

          {/* Tabs Navigation */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col min-h-0"
          >
            <TabsList className="grid w-full grid-cols-3 max-w-md mb-6">
              <TabsTrigger value="plans" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Plans
              </TabsTrigger>
              <TabsTrigger value="credits" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Credits
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                Billing
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 min-h-0">
              <TabsContent value="plans" className="h-full m-0">
                <PlansView activePlan={activePlan} />
              </TabsContent>
              <TabsContent value="credits" className="h-full m-0">
                <CreditsView />
              </TabsContent>
              <TabsContent value="billing" className="h-full m-0">
                <BillingView />
              </TabsContent>
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SubscriptionPage;
