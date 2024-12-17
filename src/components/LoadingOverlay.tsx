import React from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-background p-8 rounded-lg shadow-lg">
        <l-bouncy
          size="45"
          speed="1.75"
          color="var(--revigreen)"
        ></l-bouncy>
      </div>
    </div>
  );
}