import { Button } from "@/components/ui/button";
import { FileText, Plus, UserRound, Brain, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  activeSection: 'upload' | 'create' | 'profile' | 'ai' | 'feedback';
  onSectionChange: (section: 'upload' | 'create' | 'profile' | 'ai' | 'feedback') => void;
};

export function MobileNav({ activeSection, onSectionChange }: MobileNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm md:hidden z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-around items-center">
          <NavButton
            isActive={activeSection === 'upload'}
            icon={<FileText className="h-5 w-5" />}
            label="Upload"
            onClick={() => onSectionChange('upload')}
          />
          <NavButton
            isActive={activeSection === 'create'}
            icon={<Plus className="h-5 w-5" />}
            label="Create"
            onClick={() => onSectionChange('create')}
          />
          <NavButton
            isActive={activeSection === 'ai'}
            icon={<Brain className="h-5 w-5" />}
            label="AI vs Me"
            onClick={() => onSectionChange('ai')}
          />
          <NavButton
            isActive={activeSection === 'profile'}
            icon={<UserRound className="h-5 w-5" />}
            label="Profile"
            onClick={() => onSectionChange('profile')}
          />
          <NavButton
            isActive={activeSection === 'feedback'}
            icon={<MessageSquare className="h-5 w-5" />}
            label="Feedback"
            onClick={() => onSectionChange('feedback')}
          />
        </div>
      </div>
    </div>
  );
}

interface NavButtonProps {
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function NavButton({ isActive, icon, label, onClick }: NavButtonProps) {
  return (
    <Button
      variant={isActive ? 'default' : 'ghost'}
      size="sm"
      className={cn(
        "flex flex-col items-center gap-1 h-auto py-2 px-3 transition-all",
        isActive && "bg-revigreen/10 text-revigreen hover:bg-revigreen/20"
      )}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
}