import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, GitPullRequest, Code, AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NotificationsPopup = () => {
  const [prNotifications] = useState([
    {
      id: 1,
      type: "pr-review",
      repo: "frontend-dashboard",
      title: "Fix responsive layout in dashboard",
      message: "AI review completed: 3 issues found, 2 style suggestions",
      time: "10m ago",
      read: false,
      status: "needs-attention",
      prNumber: "#342"
    },
    {
      id: 2,
      type: "pr-review",
      repo: "api-service",
      title: "Add authentication middleware",
      message: "AI review completed: All tests passing, 1 security suggestion",
      time: "1h ago",
      read: false,
      status: "success",
      prNumber: "#285"
    },
    {
      id: 3,
      type: "pr-merged",
      repo: "data-processing",
      title: "Optimize data processing pipeline",
      message: "PR merged after addressing all AI review comments",
      time: "3h ago",
      read: true,
      status: "success",
      prNumber: "#198"
    },
  ]);

  const [systemNotifications] = useState([
    {
      id: 1,
      type: "system",
      title: "System update completed",
      message: "AI engine updated to v3.2.1 with improved code analysis",
      time: "2h ago",
      read: false
    },
    {
      id: 2,
      type: "system",
      title: "New language support",
      message: "Added Rust language support for code analysis",
      time: "1d ago",
      read: true
    }
  ]);

  const getIcon = (notification) => {
    switch(notification.type) {
      case "pr-review":
        return notification.status === "needs-attention" 
          ? <AlertCircle size={16} className="text-amber-500" /> 
          : <GitPullRequest size={16} className="text-blue-500" />;
      case "pr-merged":
        return <CheckCircle2 size={16} className="text-green-500" />;
      case "system":
        return <Code size={16} className="text-purple-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  const getTotalCount = () => {
    return prNotifications.filter(n => !n.read).length + 
           systemNotifications.filter(n => !n.read).length;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell size={20} />
          {getTotalCount() > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {getTotalCount()}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 p-0">
        <Tabs defaultValue="pull-requests" className="w-full">
          <div className="flex items-center justify-between border-b px-4 py-2">
            <h3 className="font-medium">Notifications</h3>
            <TabsList className="grid grid-cols-2 h-8">
              <TabsTrigger value="pull-requests" className="text-xs">PRs</TabsTrigger>
              <TabsTrigger value="system" className="text-xs">System</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="pull-requests" className="focus:outline-none mt-0">
            {prNotifications.length > 0 ? (
              <div className="max-h-[350px] overflow-auto">
                {prNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border-b p-3 hover:bg-muted/50 ${!notification.read ? 'bg-muted/30' : ''}`}
                  >
                    <div className="flex items-start gap-2">
                      {getIcon(notification)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-xs">{notification.repo}</span>
                            <span className="text-xs text-muted-foreground">{notification.prNumber}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm font-medium truncate">{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No PR notifications
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="system" className="focus:outline-none mt-0">
            {systemNotifications.length > 0 ? (
              <div className="max-h-[350px] overflow-auto">
                {systemNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border-b p-3 hover:bg-muted/50 ${!notification.read ? 'bg-muted/30' : ''}`}
                  >
                    <div className="flex items-start gap-2">
                      {getIcon(notification)}
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No system notifications
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="p-2 border-t">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="w-full text-xs">
              Mark all as read
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              View all
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopup;