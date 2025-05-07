
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronRight } from "lucide-react";
import ConnectRepositories from "./ConnectRepositories";
import TeamInvite from "./TeamInvite";
import SampleReview from "./SampleReview";
import OnboardingComplete from "./OnboardingComplete";

const steps = [
  { id: 1, name: "Connect Repositories" },
  { id: 2, name: "Invite Team" },
  { id: 3, name: "View AI Review" },
  { id: 4, name: "Complete" },
];

const OnboardingFlow = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  
  const handleSkip = () => {
    onComplete();
  };

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;
  
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="border-b px-6 py-4">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Get Started</h2>
              <p className="text-muted-foreground">Set up your AI code review platform</p>
            </div>
            <Button variant="ghost" onClick={handleSkip}>Skip Setup</Button>
          </div>
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              {steps.map((step) => (
                <div 
                  key={step.id}
                  className={`flex items-center ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"}`}
                >
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs mr-2 
                    ${currentStep > step.id 
                      ? "bg-primary text-primary-foreground" 
                      : currentStep === step.id 
                        ? "border-2 border-primary text-primary" 
                        : "border border-muted-foreground"}`}
                  >
                    {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">{step.name}</span>
                </div>
              ))}
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>
      
      <div className="flex-1 py-8 px-6">
        <div className="max-w-3xl mx-auto w-full animate-fade-in">
          {currentStep === 1 && <ConnectRepositories onNext={handleNext} />}
          {currentStep === 2 && <TeamInvite onNext={handleNext} />}
          {currentStep === 3 && <SampleReview onNext={handleNext} />}
          {currentStep === 4 && <OnboardingComplete onComplete={onComplete} />}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
