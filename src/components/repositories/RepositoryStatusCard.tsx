import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Github, Loader2 } from "lucide-react";

interface RepositoryStatusCardProps {
  gitHubStatus: {
    installed: boolean;
    organizationName: string | null;
  };
  isInstalling: boolean;
  onInstallGitHub: () => void;
}

export const RepositoryStatusCard = ({
  gitHubStatus,
  isInstalling,
  onInstallGitHub,
}: RepositoryStatusCardProps) => {
  if (gitHubStatus.installed) {
    return null;
  }

  if (!gitHubStatus.installed && !isInstalling) {
    return (
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-100 p-2 rounded-full">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-yellow-800">
                GitHub Integration Required
              </h3>
              <p className="text-sm text-yellow-700 mb-4">
                To connect GitHub repositories, you need to install our GitHub
                App.
              </p>
              <div className="flex gap-2">
                <Button onClick={onInstallGitHub}>
                  <Github className="mr-2 h-4 w-4" />
                  Install GitHub App
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isInstalling) {
    return (
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-blue-800">
                Installing GitHub App
              </h3>
              <p className="text-sm text-blue-700">
                Please complete the installation process in the GitHub window.
                We'll automatically detect when the installation is complete.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};
