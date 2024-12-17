import { Button } from "@/components/ui/button";
import { FileText, Plus, UserRound, Brain } from "lucide-react";

type MobileNavProps = {
  activeSection: 'upload' | 'create' | 'profile' | 'ai';
  onSectionChange: (section: 'upload' | 'create' | 'profile' | 'ai') => void;
};

export function MobileNav({ activeSection, onSectionChange }: MobileNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background md:hidden z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-around items-center">
          <Button
            variant={activeSection === 'upload' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1"
            onClick={() => onSectionChange('upload')}
          >
            <FileText className="h-5 w-5" />
            <span className="text-xs">Upload</span>
          </Button>
          <Button
            variant={activeSection === 'create' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1"
            onClick={() => onSectionChange('create')}
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs">Create</span>
          </Button>
          <Button
            variant={activeSection === 'ai' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1"
            onClick={() => onSectionChange('ai')}
          >
            <Brain className="h-5 w-5" />
            <span className="text-xs">AI vs Me</span>
          </Button>
          <Button
            variant={activeSection === 'profile' ? 'default' : 'ghost'}
            size="sm"
            className="flex flex-col items-center gap-1"
            onClick={() => onSectionChange('profile')}
          >
            <UserRound className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}