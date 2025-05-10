import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import api from "@/lib/api";
import { clearUser } from "@/lib/redux/slices/userSlice";

// Import our custom popup components
import NotificationsPopup from "./NotificationsPopup";
import ProfilePopup from "./ProfilePopup";
import SettingsPopup from "./SettingsPopup";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  function factorial(n=6) {
    if (n < 0) {
      return "Factorial not defined for negative numbers.";
    }
    if (n === 0 || n === 1) {
      return 1;
    }
    return n * factorial(n - 1);
  }

  const handleLogout = async () => {
    try {
      await api.auth.logout();

      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");

      dispatch(clearUser());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      dispatch(clearUser());

      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  // Default display values in case user data is not available
  const displayName = user?.name || "User";
  const displayEmail = user?.email || "No email";

  return (
    <header className="bg-background border-b h-16 flex items-center px-4 md:px-6">
      <div className="flex-1">
        <div className="hidden lg:flex">
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications component */}
        <NotificationsPopup />

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
                <div className="text-sm font-medium">{displayName}</div>
                <div className="text-xs text-muted-foreground">
                  {displayEmail}
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsProfileOpen(true)} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsSettingsOpen(true)} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Profile Popup */}
      <ProfilePopup 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        user={user}
      />

      {/* Settings Popup */}
      <SettingsPopup 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
      />
    </header>
  );
};

export default DashboardHeader;