import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function SettingsSection() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleNotificationChange = (checked: boolean) => {
    toast({
      title: `Notifications ${checked ? 'enabled' : 'disabled'}`,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6 pt-16 md:pt-0">
      <h2 className="text-3xl font-bold">Settings</h2>
      <div className="grid gap-4">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <Label htmlFor="theme">Theme</Label>
            </div>
            <Button
              variant="outline"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </Card>
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
      </div>
    </div>
  );
}