import { Button } from "@/components/ui/button";
import { Plus, UserRound, BarChart3, Settings } from "lucide-react";

type DesktopSidebarProps = {
  activeSection: 'overview' | 'create' | 'profile' | 'settings';
  onSectionChange: (section: 'overview' | 'create' | 'profile' | 'settings') => void;
};

export function DesktopSidebar({ activeSection, onSectionChange }: DesktopSidebarProps) {
  return (
    <div className="hidden md:block w-64 border-r p-4">
      <div className="space-y-2">
        <Button
          variant={activeSection === 'overview' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => onSectionChange('overview')}
        >
          <BarChart3 className="mr-2 h-5 w-5" />
          Overview
        </Button>
        <Button
          variant={activeSection === 'create' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => onSectionChange('create')}
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Cards
        </Button>
        <Button
          variant={activeSection === 'profile' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => onSectionChange('profile')}
        >
          <UserRound className="mr-2 h-5 w-5" />
          Profile
        </Button>
      </div>
    </div>
  );
}