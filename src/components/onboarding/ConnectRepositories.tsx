
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronRight, Github, Gitlab } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Provider = "github" | "gitlab";

interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string;
  selected: boolean;
}

const ConnectRepositories = ({ onNext }: { onNext: () => void }) => {
  const [step, setStep] = useState<"provider" | "install" | "select" | "complete">("provider");
  const [provider, setProvider] = useState<Provider>("github");
  const [isConnecting, setIsConnecting] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  // Mock repositories data
  const mockRepositories = [
    { id: 1, name: "frontend-app", fullName: "acme/frontend-app", description: "React application for the customer portal", selected: false },
    { id: 2, name: "api-service", fullName: "acme/api-service", description: "RESTful API for data access", selected: false },
    { id: 3, name: "design-system", fullName: "acme/design-system", description: "Shared UI components and styles", selected: false },
    { id: 4, name: "mobile-app", fullName: "acme/mobile-app", description: "React Native mobile application", selected: false },
  ];

  const handleProviderSelect = (value: Provider) => {
    setProvider(value);
  };

  const handleConnectProvider = () => {
    setIsConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      setIsConnecting(false);
      setStep("install");
    }, 1500);
  };

  const handleInstall = () => {
    setIsConnecting(true);
    
    // Simulate installation
    setTimeout(() => {
      setIsConnecting(false);
      setRepositories(mockRepositories);
      setStep("select");
      toast.success(`${provider === "github" ? "GitHub" : "GitLab"} app installed successfully`);
    }, 2000);
  };

  const toggleRepository = (id: number) => {
    setRepositories(repositories.map(repo => 
      repo.id === id ? { ...repo, selected: !repo.selected } : repo
    ));
  };

  const handleConfirm = () => {
    const selectedRepos = repositories.filter(repo => repo.selected);
    
    if (selectedRepos.length === 0) {
      toast.error("Please select at least one repository");
      return;
    }
    
    setIsConnecting(true);
    
    // Simulate configuration
    setTimeout(() => {
      setIsConnecting(false);
      setStep("complete");
      toast.success(`${selectedRepos.length} repositories connected successfully`);
    }, 1500);
  };

  const handleComplete = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Connect your repositories</h1>
        <p className="text-muted-foreground mt-2">
          Connect your Git repositories so the AI can begin reviewing pull requests.
        </p>
      </div>

      {step === "provider" && (
        <Card>
          <CardHeader>
            <CardTitle>Select a Git provider</CardTitle>
            <CardDescription>Choose where your code repositories are hosted</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={provider} 
              onValueChange={(value) => handleProviderSelect(value as Provider)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem 
                  value="github" 
                  id="github" 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor="github"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Github className="mb-3 h-6 w-6" />
                  <div className="space-y-1 text-center">
                    <p className="font-medium leading-none">GitHub</p>
                    <p className="text-sm text-muted-foreground">
                      Connect to GitHub repositories
                    </p>
                  </div>
                </Label>
              </div>

              <div>
                <RadioGroupItem
                  value="gitlab"
                  id="gitlab"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="gitlab"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Gitlab className="mb-3 h-6 w-6" />
                  <div className="space-y-1 text-center">
                    <p className="font-medium leading-none">GitLab</p>
                    <p className="text-sm text-muted-foreground">
                      Connect to GitLab repositories
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleConnectProvider} 
              disabled={isConnecting}
              className="ml-auto"
            >
              {isConnecting ? "Connecting..." : "Connect"}
              {!isConnecting && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === "install" && (
        <Card>
          <CardHeader>
            <CardTitle>Install {provider === "github" ? "GitHub" : "GitLab"} App</CardTitle>
            <CardDescription>
              We need permission to access your repositories
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center gap-4">
                {provider === "github" ? (
                  <Github className="h-10 w-10" />
                ) : (
                  <Gitlab className="h-10 w-10" />
                )}
                <div>
                  <h3 className="font-medium">
                    {provider === "github" ? "GitHub" : "GitLab"} App Installation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We'll redirect you to {provider === "github" ? "GitHub" : "GitLab"} to install our app
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Required permissions:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  Read access to code and metadata
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  Read and write access to pull requests and issues
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  Read access to members and teams
                </li>
              </ul>
            </div>
            
            <div className="bg-accent/50 rounded-md p-4 text-sm">
              <p className="font-medium">We value your privacy and security</p>
              <p className="mt-1 text-muted-foreground">
                We only request the permissions necessary for our AI code review features.
                You can revoke access at any time from your {provider === "github" ? "GitHub" : "GitLab"} settings.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleInstall} 
              disabled={isConnecting} 
              className="ml-auto"
            >
              {isConnecting ? "Installing..." : `Install ${provider === "github" ? "GitHub" : "GitLab"} App`}
              {!isConnecting && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === "select" && (
        <Card>
          <CardHeader>
            <CardTitle>Select repositories</CardTitle>
            <CardDescription>
              Choose which repositories you want the AI to review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {repositories.map((repo) => (
                <div
                  key={repo.id}
                  className={`flex items-center justify-between p-4 rounded-md border ${
                    repo.selected ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <div>
                    <h3 className="font-medium">{repo.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{repo.description}</p>
                  </div>
                  <Button
                    variant={repo.selected ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleRepository(repo.id)}
                  >
                    {repo.selected ? "Selected" : "Select"}
                    {repo.selected && <Check className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleConfirm} 
              disabled={isConnecting || repositories.filter(r => r.selected).length === 0}
              className="ml-auto"
            >
              {isConnecting ? "Confirming..." : "Confirm Selection"}
              {!isConnecting && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === "complete" && (
        <Card>
          <CardHeader>
            <CardTitle>Repositories connected!</CardTitle>
            <CardDescription>
              Your repositories are now connected and ready for AI review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-primary/5 border border-primary/10 p-4 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-lg">Success!</h3>
              <p className="mt-2 text-muted-foreground">
                {repositories.filter(r => r.selected).length} repositories have been connected to the AI code review platform
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleComplete} className="ml-auto">
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ConnectRepositories;
