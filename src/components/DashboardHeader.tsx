
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { Bell, LogOut, Settings, User } from "lucide-react";
import { toast } from "sonner";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulate logout
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="bg-background border-b h-16 flex items-center px-4 md:px-6">
      <div className="flex-1">
        <div className="hidden lg:flex">
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell size={20} />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <User size={16} />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-muted-foreground">john@example.com</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/dashboard/profile" className="w-full cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings" className="w-full cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
