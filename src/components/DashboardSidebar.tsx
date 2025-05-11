
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Menu, 
  FolderOpen, 
  Check, 
  ChartBar,
  Settings,
  UserCog,
  CreditCard,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const NavItem = ({ 
  icon: Icon, 
  label, 
  to, 
  isActive,
  isCollapsed 
}: { 
  icon: any; 
  label: string;
  to: string; 
  isActive: boolean;
  isCollapsed: boolean;
}) => {
  return (
    <Link 
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
    >
      <Icon size={20} />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

const DashboardSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Overview",
      to: "/dashboard"
    },
    {
      icon: FolderOpen,
      label: "Pull Requests",
      to: "/dashboard/pull-requests"
    },
    // {
    //   icon: Check,
    //   label: "Code Reviews",
    //   to: "/dashboard/code-reviews"
    // },
    // {
    //   icon: ChartBar,
    //   label: "Analytics",
    //   to: "/dashboard/analytics"
    // },
    {
      icon: Settings,
      label: "Repositories",
      to: "/dashboard/repositories"
    }
  ];

  const configNavItems = [
    {
      icon: UserCog,
      label: "AI Engineer",
      to: "/dashboard/ai-engineer"
    },
    {
      icon: CreditCard,
      label: "Subscription",
      to: "/dashboard/subscription"
    },
    {
      icon: Bell,
      label: "Notificatons",
      to: "/dashboard/notifications"
    }
  ];

  return (
    <div 
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border h-screen transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground h-8 w-8 rounded flex items-center justify-center font-bold">
              IC
            </div>
            <span className="font-bold text-sidebar-foreground">InsightCode</span>
          </div>
        )}
        {isCollapsed && (
          <div className="bg-primary text-primary-foreground h-8 w-8 rounded flex items-center justify-center font-bold mx-auto">
            IC
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-1 p-2 flex-1 overflow-auto">
        <div className="mb-1">
          {!isCollapsed && <div className="px-3 py-1 text-xs font-semibold text-sidebar-foreground/50">Core</div>}
          {navItems.map((item) => (
            <NavItem 
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isActive={location.pathname === item.to}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
        
        <div className="mt-2">
          {!isCollapsed && (
            <div className="px-3 py-1 text-xs font-semibold text-sidebar-foreground/50">
              Configuration
            </div>
          )}
          {configNavItems.map((item) => (
            <NavItem 
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isActive={location.pathname === item.to}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>
      
      <div className="p-2 border-t border-sidebar-border">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex justify-center text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
