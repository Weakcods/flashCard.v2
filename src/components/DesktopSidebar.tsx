import { Button } from "@/components/ui/button";
import { FileText, Plus, UserRound, Brain } from "lucide-react";

type DesktopSidebarProps = {
  activeSection: 'upload' | 'create' | 'profile' | 'ai' | 'feedback';
  onSectionChange: (section: 'upload' | 'create' | 'profile' | 'ai' | 'feedback') => void;
};

export function DesktopSidebar({ activeSection, onSectionChange }: DesktopSidebarProps) {
  return (
    <div className="hidden md:block w-64 border-r p-4">
      <div className="space-y-2">
        <Button
          variant={activeSection === 'upload' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => onSectionChange('upload')}
        >
          <FileText className="mr-2 h-5 w-5" />
          Upload PDF
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
          variant={activeSection === 'ai' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => onSectionChange('ai')}
        >
          <Brain className="mr-2 h-5 w-5" />
          AI vs Me
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