import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { username } = useParams();
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
    backgroundImage: user?.backgroundImage || "",
  });

  const isOwnProfile = user && user.username === username;

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully",
    });
  };

  if (!user && username !== user?.username) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Profile not found</CardTitle>
            <p className="text-muted-foreground">
              This user doesn't exist or their profile is private.
            </p>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Background Image */}
      <div 
        className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg relative overflow-hidden"
        style={{
          backgroundImage: formData.backgroundImage ? `url(${formData.backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-end p-6">
          <div>
            <h1 className="text-3xl font-black text-white">
              {formData.username}
            </h1>
            <p className="text-white/80">
              {formData.bio || "No bio available"}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid gap-6">
        {isOwnProfile && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Profile Settings</CardTitle>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>
            {isEditing && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Your username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background">Background Image URL</Label>
                  <Input
                    id="background"
                    value={formData.backgroundImage}
                    onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <Button 
                  onClick={handleSave}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Save Changes
                </Button>
              </CardContent>
            )}
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              No recent activity to display.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}