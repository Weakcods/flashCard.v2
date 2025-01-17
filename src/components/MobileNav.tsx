import { Button } from "@/components/ui/button";
import { BarChart3, Plus, UserRound, MessageSquare } from "lucide-react";

type MobileNavProps = {
  activeSection: 'overview' | 'create' | 'chat' | 'settings' | 'profile';
  onSectionChange: (section: 'overview' | 'create' | 'chat' | 'settings' | 'profile') => void;
};

export function MobileNav({ activeSection, onSectionChange }: MobileNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-50">
      <div className="grid grid-cols-4 gap-1 p-2">
        <Button
          variant={activeSection === 'overview' ? 'default' : 'ghost'}
          className="flex flex-col items-center justify-center h-16 px-2"
          onClick={() => onSectionChange('overview')}
        >
          <BarChart3 className="h-5 w-5" />
          <span className="text-xs mt-1">Overview</span>
        </Button>
        <Button
          variant={activeSection === 'create' ? 'default' : 'ghost'}
          className="flex flex-col items-center justify-center h-16 px-2"
          onClick={() => onSectionChange('create')}
        >
          <Plus className="h-5 w-5" />
          <span className="text-xs mt-1">Create</span>
        </Button>
        <Button
          variant={activeSection === 'chat' ? 'default' : 'ghost'}
          className="flex flex-col items-center justify-center h-16 px-2"
          onClick={() => onSectionChange('chat')}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs mt-1">Chat</span>
        </Button>
        <Button
          variant={activeSection === 'profile' ? 'default' : 'ghost'}
          className="flex flex-col items-center justify-center h-16 px-2"
          onClick={() => onSectionChange('profile')}
        >
          <UserRound className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Button>
      </div>
    </div>
  );
}