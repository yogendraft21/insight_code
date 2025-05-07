
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import OnboardingPage from "./pages/OnboardingPage";
import RepositorySettingsPage from "./pages/RepositorySettingsPage";
import FeaturesPage from "./pages/FeaturesPage";
import PullRequestsPage from "./pages/PullRequestsPage";
import CodeReviewsPage from "./pages/CodeReviewsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import RepositoriesPage from "./pages/RepositoriesPage";
import AIEngineerPage from "./pages/AIEngineerPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import IntegrationsPage from "./pages/IntegrationsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/pull-requests" element={<PullRequestsPage />} />
          <Route path="/dashboard/code-reviews" element={<CodeReviewsPage />} />
          <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
          <Route path="/dashboard/repositories" element={<RepositoriesPage />} />
          <Route path="/dashboard/settings/repositories" element={<RepositorySettingsPage />} />
          <Route path="/dashboard/ai-engineer" element={<AIEngineerPage />} />
          <Route path="/dashboard/subscription" element={<SubscriptionPage />} />
          <Route path="/dashboard/integrations" element={<IntegrationsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
