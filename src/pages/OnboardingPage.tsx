
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import { toast } from "sonner";

const OnboardingPage = () => {
  const navigate = useNavigate();
  
  const handleOnboardingComplete = () => {
    toast.success("Onboarding completed successfully!");
    navigate("/dashboard");
  };
  
  return <OnboardingFlow onComplete={handleOnboardingComplete} />;
};

export default OnboardingPage;
