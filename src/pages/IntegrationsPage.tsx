
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Github, GitlabIcon, Code, Settings, Link2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const IntegrationsPage = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: "github",
      name: "GitHub",
      icon: Github,
      connected: true,
      accountName: "acme-org",
      lastSync: "2 hours ago",
      description: "Connect your GitHub repositories for code review"
    },
    {
      id: "gitlab",
      name: "GitLab",
      icon: GitlabIcon,
      connected: false,
      accountName: "",
      lastSync: "",
      description: "Connect your GitLab repositories for code review"
    },
    {
      id: "bitbucket",
      name: "Bitbucket",
      icon: Code,
      connected: false,
      accountName: "",
      lastSync: "",
      description: "Connect your Bitbucket repositories for code review"
    },
    {
      id: "jira",
      name: "Jira",
      icon: Settings,
      connected: true,
      accountName: "acme-team",
      lastSync: "1 day ago",
      description: "Link review comments to Jira issues"
    },
    {
      id: "slack",
      name: "Slack",
      icon: Link2,
      connected: true,
      accountName: "acme-workspace",
      lastSync: "5 hours ago",
      description: "Receive notifications about code reviews in Slack"
    }
  ]);

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, connected: !integration.connected } 
          : integration
      )
    );
    
    const integration = integrations.find(i => i.id === id);
    
    if (integration) {
      if (integration.connected) {
        toast.info(`Disconnected ${integration.name}`);
      } else {
        toast.success(`Connected ${integration.name}`);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold tracking-tight mb-1">Integrations</h1>
              <p className="text-muted-foreground">
                Connect your development tools to enhance your code review workflow
              </p>
            </div>
            
            <div className="grid gap-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-800">Repository connection required</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    To use InsightCode, you need to connect at least one Git repository. 
                    Connect a repository to get started with AI code reviews.
                  </p>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mt-4 mb-2">Code Repositories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.slice(0, 3).map((integration) => (
                  <Card key={integration.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className="bg-muted p-1.5 rounded-md">
                            <integration.icon className="h-5 w-5" />
                          </div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                        </div>
                        <Switch 
                          checked={integration.connected}
                          onCheckedChange={() => handleToggleIntegration(integration.id)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-2">
                        {integration.description}
                      </CardDescription>
                      {integration.connected && (
                        <div className="text-sm mt-3">
                          <div className="flex justify-between text-muted-foreground">
                            <span>Connected as:</span>
                            <span className="font-medium text-foreground">{integration.accountName}</span>
                          </div>
                          <div className="flex justify-between text-muted-foreground mt-1">
                            <span>Last sync:</span>
                            <span>{integration.lastSync}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        disabled={!integration.connected}
                      >
                        {integration.connected ? "Configure" : "Connect"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <h2 className="text-xl font-semibold mt-4 mb-2">Development Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.slice(3).map((integration) => (
                  <Card key={integration.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className="bg-muted p-1.5 rounded-md">
                            <integration.icon className="h-5 w-5" />
                          </div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                        </div>
                        <Switch 
                          checked={integration.connected}
                          onCheckedChange={() => handleToggleIntegration(integration.id)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-2">
                        {integration.description}
                      </CardDescription>
                      {integration.connected && (
                        <div className="text-sm mt-3">
                          <div className="flex justify-between text-muted-foreground">
                            <span>Connected as:</span>
                            <span className="font-medium text-foreground">{integration.accountName}</span>
                          </div>
                          <div className="flex justify-between text-muted-foreground mt-1">
                            <span>Last sync:</span>
                            <span>{integration.lastSync}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        disabled={!integration.connected}
                      >
                        {integration.connected ? "Configure" : "Connect"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>API Integration</CardTitle>
                  <CardDescription>
                    Use our API to integrate InsightCode with your custom tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                    curl -X POST https://api.insightcode.ai/v1/reviews \<br />
                    &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY" \<br />
                    &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
                    &nbsp;&nbsp;-d '&#123;"repository": "username/repo", "pull_request": 123&#125;'
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View API Documentation</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IntegrationsPage;
