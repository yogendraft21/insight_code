import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Github, Gitlab } from "lucide-react";

interface IntegrationStatusCardProps {
  gitHubStatus: {
    installed: boolean;
    organizationName: string | null;
  };
  isInstalling: boolean;
}

export const IntegrationStatusCard = ({ gitHubStatus, isInstalling }: IntegrationStatusCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Status</CardTitle>
        <CardDescription>
          Status of your GitHub or GitLab integration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md bg-muted p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="h-6 w-6" />
              <div>
                <h3 className="font-medium">GitHub App</h3>
                {gitHubStatus.installed ? (
                  <p className="text-sm text-muted-foreground">
                    Connected to {gitHubStatus.organizationName}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Not connected
                  </p>
                )}
              </div>
            </div>
            {gitHubStatus.installed ? (
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 hover:bg-green-200"
              >
                Connected
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              >
                {isInstalling ? "Installing..." : "Not Connected"}
              </Badge>
            )}
          </div>

          <div className="rounded-md bg-muted p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gitlab className="h-6 w-6" />
              <div>
                <h3 className="font-medium">GitLab Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Not connected
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            >
              Not Connected
            </Badge>
          </div>

          <div className="space-y-2 mt-4">
            <h3 className="font-medium">Permissions</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-baseline gap-2">
                <Check className={`h-4 w-4 shrink-0 ${gitHubStatus.installed ? 'text-green-600' : 'text-gray-400'}`} />
                <span>Read access to code and metadata</span>
              </li>
              <li className="flex items-baseline gap-2">
                <Check className={`h-4 w-4 shrink-0 ${gitHubStatus.installed ? 'text-green-600' : 'text-gray-400'}`} />
                <span>
                  Read and write access to pull requests and issues
                </span>
              </li>
              <li className="flex items-baseline gap-2">
                <Check className={`h-4 w-4 shrink-0 ${gitHubStatus.installed ? 'text-green-600' : 'text-gray-400'}`} />
                <span>Read access to members and teams</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};