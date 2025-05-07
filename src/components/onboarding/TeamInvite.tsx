
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronRight, Copy, Plus, Trash, X } from "lucide-react";
import { toast } from "sonner";

interface InviteEmail {
  id: string;
  email: string;
}

const TeamInvite = ({ onNext }: { onNext: () => void }) => {
  const [email, setEmail] = useState("");
  const [invites, setInvites] = useState<InviteEmail[]>([]);
  const [isInviting, setIsInviting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const inviteLink = "https://codereview.ai/join/team123456";

  const handleAddEmail = () => {
    // Simple email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (invites.some(invite => invite.email === email)) {
      toast.error("This email is already in the invite list");
      return;
    }
    
    setInvites([...invites, { id: Date.now().toString(), email }]);
    setEmail("");
  };
  
  const handleRemoveEmail = (id: string) => {
    setInvites(invites.filter(invite => invite.id !== id));
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success("Invite link copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleSendInvites = () => {
    if (invites.length === 0) {
      onNext();
      return;
    }
    
    setIsInviting(true);
    
    // Simulate sending invites
    setTimeout(() => {
      setIsInviting(false);
      toast.success(`Invites sent to ${invites.length} team members`);
      onNext();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Invite your team</h1>
        <p className="text-muted-foreground mt-2">
          Get your team members onboard to collaborate and improve together
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Invite via email</CardTitle>
          <CardDescription>Send email invitations to your team members</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <Label htmlFor="email" className="sr-only">Email</Label>
              <Input
                id="email"
                placeholder="colleague@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddEmail();
                  }
                }}
              />
            </div>
            <Button onClick={handleAddEmail} size="sm" className="flex-shrink-0">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          
          {invites.length > 0 && (
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-medium">Invites ({invites.length})</h3>
              <div className="max-h-40 overflow-auto space-y-2">
                {invites.map((invite) => (
                  <div 
                    key={invite.id} 
                    className="flex items-center justify-between bg-muted rounded-md pl-3 pr-2 py-2"
                  >
                    <span className="text-sm">{invite.email}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7" 
                      onClick={() => handleRemoveEmail(invite.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Or share an invite link</h3>
              <div className="flex items-center gap-2">
                <Input value={inviteLink} readOnly className="flex-1" />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-shrink-0" 
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={onNext}>
            Skip for now
          </Button>
          <Button 
            onClick={handleSendInvites} 
            disabled={isInviting}
          >
            {invites.length === 0 
              ? "Continue" 
              : isInviting 
                ? "Sending invites..." 
                : `Send ${invites.length} invite${invites.length === 1 ? "" : "s"}`}
            {!isInviting && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TeamInvite;
