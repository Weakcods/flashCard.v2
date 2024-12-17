import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-background/95 p-8 rounded-xl shadow-lg flex flex-col items-center gap-4 min-w-[200px] border border-border/50">
        <div className="relative">
          {/* Outer ring animation */}
          <div className="absolute inset-0 rounded-full border-4 border-revigreen/20 animate-ping" />
          {/* Inner loader */}
          <Loader2 className="h-12 w-12 animate-spin text-revigreen relative z-10" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-lg font-medium text-foreground">Please wait</p>
          <p className="text-sm text-muted-foreground animate-pulse">Processing your request...</p>
        </div>
      </div>
    </div>
  );
}