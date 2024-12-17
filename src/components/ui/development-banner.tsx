import React from "react";
import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface DevelopmentBannerProps {
  onClose: () => void;
}

export function DevelopmentBanner({ onClose }: DevelopmentBannerProps) {
  return (
    <Alert 
      variant="default" 
      className="fixed top-0 left-0 right-0 z-50 bg-revigreen/10 border-revigreen mb-0 rounded-none flex items-center justify-between px-4 py-2"
    >
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-revigreen shrink-0" />
        <AlertDescription className="text-revigreen text-sm md:text-base">
          🚧 This application is under active development. Some features may be limited or unavailable.
        </AlertDescription>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6 shrink-0 text-revigreen hover:bg-revigreen/20"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close banner</span>
      </Button>
    </Alert>
  );
} 