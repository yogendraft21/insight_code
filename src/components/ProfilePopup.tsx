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
import { User, Mail, Briefcase, MapPin, Github } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
    bio:
      user?.bio ||
      "Engineering manager with 10+ years in software development. Passionate about developer productivity and AI-driven code quality.",
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

  const ProfileField = ({ icon: Icon, label, value, name, editing }) => {
    return editing ? (
      <div className="space-y-2">
        <Label htmlFor={name} className="text-sm">
          {label}
        </Label>
        <Input id={name} name={name} value={value} onChange={handleChange} />
      </div>
    ) : (
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon size={16} className="text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-sm font-medium truncate">{value}</p>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-4">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-20 w-20 mb-3">
              {profile.avatar ? (
                <AvatarImage src={profile.avatar} alt={profile.name} />
              ) : (
                <AvatarFallback className="text-lg bg-primary/10 text-primary">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              )}
            </Avatar>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <div className="flex items-center mt-1 space-x-2">
              <Badge variant="outline" className="py-1">
                {profile.role}
              </Badge>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileField
                  icon={User}
                  label="Name"
                  value={profile.name}
                  name="name"
                  editing={true}
                />
                <ProfileField
                  icon={Mail}
                  label="Email"
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
                  label="GitHub"
                  value={profile.githubUsername}
                  name="githubUsername"
                  editing={true}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="min-h-[100px] resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <ProfileField
                  icon={Mail}
                  label="Email"
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
                  label="GitHub"
                  value={profile.githubUsername}
                  name="githubUsername"
                  editing={false}
                />
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Bio</p>
                <p className="text-sm">{profile.bio}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="p-4 px-6 border-t">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePopup;
