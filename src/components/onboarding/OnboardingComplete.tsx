
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Check, ChevronRight } from "lucide-react";

const OnboardingComplete = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">You're all set!</h1>
        <p className="text-muted-foreground mt-2">
          Your AI code review platform is ready to use
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Complete</CardTitle>
          <CardDescription>
            You've successfully configured your code review platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-md bg-primary/10 border border-primary/30 p-6 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium">Welcome to AI-Powered Code Review</h3>
            <p className="mt-2 text-muted-foreground">
              Everything is set up and ready to go. Your selected repositories will start receiving AI reviews on new pull requests.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg">What's next?</h3>
            
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">Explore your dashboard</p>
                  <p className="text-sm text-muted-foreground">
                    Get familiar with the platform and see your team's activity and metrics
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 items-start">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Create a pull request</p>
                  <p className="text-sm text-muted-foreground">
                    Submit your first PR to see the AI code review in action
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 items-start">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Customize your settings</p>
                  <p className="text-sm text-muted-foreground">
                    Adjust review depth, focus areas, and notification preferences
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 items-start">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-medium">Invite more team members</p>
                  <p className="text-sm text-muted-foreground">
                    Expand your team and collaborate more effectively
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onComplete} size="lg" className="w-full">
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingComplete;
