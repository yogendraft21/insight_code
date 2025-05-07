
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Download, ArrowRight, Check, Zap, Plus, ChevronsUp } from "lucide-react";

const SubscriptionPage = () => {
  const [activePlan, setActivePlan] = useState("pro");

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$29",
      period: "per month",
      features: [
        "100 review credits per month",
        "Basic AI code reviews",
        "2 repositories",
        "Email support"
      ],
      recommended: false
    },
    {
      id: "pro",
      name: "Pro",
      price: "$99",
      period: "per month",
      features: [
        "500 review credits per month",
        "Advanced AI code reviews",
        "10 repositories",
        "Custom AI configuration",
        "Priority support"
      ],
      recommended: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$499",
      period: "per month",
      features: [
        "2,000 review credits per month",
        "Premium AI models",
        "Unlimited repositories",
        "Full API access",
        "Custom integrations",
        "Dedicated support"
      ],
      recommended: false
    }
  ];
  
  // Mock billing history
  const billingHistory = [
    { date: "May 1, 2025", amount: "$99.00", status: "Paid", invoice: "INV-001" },
    { date: "Apr 1, 2025", amount: "$99.00", status: "Paid", invoice: "INV-002" },
    { date: "Mar 1, 2025", amount: "$99.00", status: "Paid", invoice: "INV-003" },
    { date: "Feb 1, 2025", amount: "$99.00", status: "Paid", invoice: "INV-004" },
  ];

  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight mb-1">Subscription & Credits</h1>
                <p className="text-muted-foreground">
                  Manage your subscription plan and review credits
                </p>
              </div>
              <Button className="mt-4 md:mt-0">
                <CreditCard className="mr-2 h-4 w-4" />
                Update Payment Method
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Your active subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-bold">Pro</span>
                    <Badge className="mb-1.5">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Renews on June 1, 2025
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Manage Plan</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Review Credits</CardTitle>
                  <CardDescription>Monthly usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold">312</span>
                      <span className="text-muted-foreground mb-1">/ 500 credits</span>
                    </div>
                    <Progress value={62} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      63% used this month
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Zap className="mr-2 h-4 w-4" />
                    Purchase Credits
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Team Usage</CardTitle>
                  <CardDescription>All users in your organization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Sarah Kim</span>
                        <span>124 credits</span>
                      </div>
                      <Progress value={25} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>John Doe</span>
                        <span>98 credits</span>
                      </div>
                      <Progress value={20} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Alex Martinez</span>
                        <span>90 credits</span>
                      </div>
                      <Progress value={18} className="h-1.5" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">View All Users</Button>
                </CardFooter>
              </Card>
            </div>
            
            <Tabs defaultValue="plans" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
                <TabsTrigger value="billing">Billing History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="plans">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card key={plan.id} className={`border ${plan.id === activePlan ? "border-primary shadow-md" : ""}`}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{plan.name}</CardTitle>
                            <div className="flex items-baseline mt-2">
                              <span className="text-3xl font-bold">{plan.price}</span>
                              <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
                            </div>
                          </div>
                          {plan.recommended && (
                            <Badge className="bg-primary">Recommended</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant={plan.id === activePlan ? "default" : "outline"} 
                          className="w-full"
                          disabled={plan.id === activePlan}
                        >
                          {plan.id === activePlan ? "Current Plan" : "Upgrade"}
                          {plan.id !== activePlan && <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>
                      View and download your past invoices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Invoice</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {billingHistory.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                {item.invoice}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <Card>
              <CardHeader>
                <CardTitle>Need More Credits?</CardTitle>
                <CardDescription>
                  Add additional review credits to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="mb-2">
                      <span className="text-xl font-bold">100 Credits</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Best for small teams or occasional use
                    </p>
                    <div className="flex items-baseline mb-4">
                      <span className="text-2xl font-bold">$49</span>
                      <span className="text-sm text-muted-foreground ml-1">one-time</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Credits
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 border-primary bg-primary/5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xl font-bold">500 Credits</span>
                      <Badge className="bg-primary">Popular</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Perfect for active development teams
                    </p>
                    <div className="flex items-baseline mb-4">
                      <span className="text-2xl font-bold">$199</span>
                      <span className="text-sm text-muted-foreground ml-1">one-time</span>
                    </div>
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Credits
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="mb-2">
                      <span className="text-xl font-bold">1,000 Credits</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Best value for larger teams
                    </p>
                    <div className="flex items-baseline mb-4">
                      <span className="text-2xl font-bold">$349</span>
                      <span className="text-sm text-muted-foreground ml-1">one-time</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Credits
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SubscriptionPage;
