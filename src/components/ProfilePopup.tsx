import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Mail, 
  Briefcase, 
  MapPin, 
  Github, 
  Shield, 
  Calendar,
  Settings,
  Users
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const ProfilePopup = ({ isOpen, onClose, user }) => {
  // Default static data for organization owner
  const defaultUser = {
    name: user?.name || "Alex Johnson",
    email: user?.email || "alex.johnson@orgname.com",
    organization: user?.organization || "OrgName Technologies",
    location: user?.location || "San Francisco, CA",
    githubUsername: user?.githubUsername || "alexjohnson-dev",
    role: user?.role || "Organization Owner",
    avatar: user?.avatar || null,
    bio: user?.bio || "Engineering manager with 10+ years in software development. Passionate about developer productivity and AI-driven code quality.",
    joinDate: user?.joinDate || "January 2020",
    teamSize: user?.teamSize || "45",
    permissions: user?.permissions || "Full Access"
  };

  const [profile, setProfile] = useState(defaultUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would typically save the profile data to your backend
    setIsEditing(false);
  };

  const ProfileField = ({ icon: Icon, label, value, name, editing, className = "" }) => {
    return editing ? (
      <div className="space-y-2">
        <Label htmlFor={name} className="text-sm font-medium text-foreground">
          {label}
        </Label>
        <Input 
          id={name} 
          name={name} 
          value={value} 
          onChange={handleChange}
          className="border-input focus:border-primary"
        />
      </div>
    ) : (
      <div className={`flex items-start space-x-4 ${className}`}>
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon size={18} className="text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            {label}
          </p>
          <p className="text-sm font-medium text-foreground break-words">{value}</p>
        </div>
      </div>
    );
  };

  const StatCard = ({ icon: Icon, label, value }) => (
    <Card className="border-border/50">
      <CardContent className="p-4 text-center">
        <div className="flex justify-center mb-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon size={16} className="text-primary" />
          </div>
        </div>
        <p className="text-lg font-semibold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold">
            Organization Profile
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-4">
          {/* Header Section with Avatar and Basic Info */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl -m-2"></div>
            <div className="relative flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 p-6">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                {profile.avatar ? (
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                ) : (
                  <AvatarFallback className="text-xl bg-primary/10 text-primary font-semibold">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-foreground mb-2">{profile.name}</h2>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3">
                  <Badge variant="default" className="px-3 py-1 bg-primary text-primary-foreground">
                    <Shield size={12} className="mr-1" />
                    {profile.role}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 border-primary/20">
                    {profile.permissions}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground max-w-md">
                  {profile.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          {!isEditing && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              <StatCard 
                icon={Users} 
                label="Team Members" 
                value={profile.teamSize} 
              />
              <StatCard 
                icon={Calendar} 
                label="Member Since" 
                value={profile.joinDate} 
              />
              <StatCard 
                icon={Settings} 
                label="Admin Level" 
                value="Full" 
              />
            </div>
          )}

          {isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileField
                  icon={User}
                  label="Full Name"
                  value={profile.name}
                  name="name"
                  editing={true}
                />
                <ProfileField
                  icon={Mail}
                  label="Email Address"
                  value={profile.email}
                  name="email"
                  editing={true}
                />
                <ProfileField
                  icon={Briefcase}
                  label="Organization"
                  value={profile.organization}
                  name="organization"
                  editing={true}
                />
                <ProfileField
                  icon={MapPin}
                  label="Location"
                  value={profile.location}
                  name="location"
                  editing={true}
                />
                <ProfileField
                  icon={Github}
                  label="GitHub Username"
                  value={profile.githubUsername}
                  name="githubUsername"
                  editing={true}
                />
                <ProfileField
                  icon={Users}
                  label="Team Size"
                  value={profile.teamSize}
                  name="teamSize"
                  editing={true}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">
                  Professional Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="min-h-[120px] resize-none"
                  placeholder="Tell us about your professional background and expertise..."
                />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Contact & Professional Info */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Mail size={18} className="mr-2 text-primary" />
                  Contact & Professional Details
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ProfileField
                    icon={Mail}
                    label="Email Address"
                    value={profile.email}
                    name="email"
                    editing={false}
                  />
                  <ProfileField
                    icon={Briefcase}
                    label="Organization"
                    value={profile.organization}
                    name="organization"
                    editing={false}
                  />
                  <ProfileField
                    icon={MapPin}
                    label="Location"
                    value={profile.location}
                    name="location"
                    editing={false}
                  />
                  <ProfileField
                    icon={Github}
                    label="GitHub Profile"
                    value={`@${profile.githubUsername}`}
                    name="githubUsername"
                    editing={false}
                  />
                </div>
              </div>

              {/* Bio Section */}
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <User size={18} className="mr-2 text-primary" />
                  Professional Background
                </h3>
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <p className="text-sm leading-relaxed text-foreground">{profile.bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="p-6 border-t border-border bg-muted/20">
          {isEditing ? (
            <div className="flex space-x-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="flex-1 sm:flex-none bg-primary hover:bg-primary/90"
              >
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="flex space-x-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="flex-1 sm:flex-none"
              >
                Close
              </Button>
              <Button 
                onClick={() => setIsEditing(true)}
                className="flex-1 sm:flex-none bg-primary hover:bg-primary/90"
              >
                <Settings size={16} className="mr-2" />
                Edit Profile
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePopup;