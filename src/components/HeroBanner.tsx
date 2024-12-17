import React, { useState } from "react";
import { Sparkles, Rocket, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function HeroBanner() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(() => {
    return localStorage.getItem('heroBannerDismissed') !== 'true';
  });

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('heroBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-revigreen/10 to-revigreen/5 border-b border-revigreen/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-revigreen/10 p-2 rounded-full">
              <Sparkles className="h-4 w-4 text-revigreen animate-pulse" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="font-semibold text-revigreen">Beta Release</span>
              <span className="text-sm text-muted-foreground">
                Experience the future of learning with our AI-powered flashcards
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-revigreen hover:bg-revigreen/10"
              onClick={() => navigate("/signup")}
            >
              <Rocket className="h-4 w-4 mr-1" />
              Try Beta
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-background/80"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss banner</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 