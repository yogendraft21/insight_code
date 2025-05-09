import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import SignupPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';

const App = () => (
  <Provider store={store}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          
          {/* Protected routes */}
          <Route path="/onboarding" element={
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/pull-requests" element={
            <ProtectedRoute>
              <PullRequestsPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/code-reviews" element={
            <ProtectedRoute>
              <CodeReviewsPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/analytics" element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/repositories" element={
            <ProtectedRoute>
              <RepositoriesPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/settings/repositories" element={
            <ProtectedRoute>
              <RepositorySettingsPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/ai-engineer" element={
            <ProtectedRoute>
              <AIEngineerPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/subscription" element={
            <ProtectedRoute>
              <SubscriptionPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/integrations" element={
            <ProtectedRoute>
              <IntegrationsPage />
            </ProtectedRoute>
          } />
          
          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </Provider>
);

export default App;