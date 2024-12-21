import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Bell, Moon, Sun, MessageSquare, ThumbsUp } from "lucide-react";
import { useTheme } from "next-themes";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function SettingsSection() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [feedback, setFeedback] = useState("");

  const handleNotificationChange = (checked: boolean) => {
    toast({
      title: `Notifications ${checked ? 'enabled' : 'disabled'}`,
      duration: 2000,
    });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast({
        title: "Please enter your feedback",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Feedback submitted",
      description: "Thank you for helping us improve!",
      duration: 3000,
    });
    setFeedback("");
  };

  return (
    <div className="space-y-6 pt-16 md:pt-0">
      <h2 className="text-3xl font-bold">Settings</h2>
      <div className="grid gap-4">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <Label htmlFor="notifications">Push Notifications</Label>
              </div>
              <Switch
                id="notifications"
                onCheckedChange={handleNotificationChange}
              />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Help Us Improve</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <ThumbsUp className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Your feedback helps us make the app better for everyone.
              </p>
            </div>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <Textarea
                placeholder="Share your thoughts or suggestions..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <Button type="submit" className="w-full sm:w-auto">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Feedback
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}