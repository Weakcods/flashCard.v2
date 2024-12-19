import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import NetworkError from "./pages/NetworkError";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { DevelopmentBanner } from "./components/ui/development-banner";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Terms } from "@/components/policies/Terms";
import { Privacy } from "@/components/policies/Privacy";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDevBanner, setShowDevBanner] = useState(() => {
    return localStorage.getItem('devBannerDismissed') !== 'true';
  });

  const handleDismissBanner = () => {
    setShowDevBanner(false);
    localStorage.setItem('devBannerDismissed', 'true');
  };

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || event === 'SIGNED_IN') {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000); // Show loading for at least 1 second
      }
    });
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="revicard-theme">
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            {showDevBanner && <DevelopmentBanner onClose={handleDismissBanner} />}
            <div className={cn("flex-1", showDevBanner && "mt-[40px]")}>
              <LoadingOverlay isLoading={isLoading} />
              <BrowserRouter>
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/network-error" element={<NetworkError />} />
                    <Route path="/terms-of-service" element={<Terms />} />
                    <Route path="/privacy-policy" element={<Privacy />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </BrowserRouter>
            </div>
            <Toaster />
            <Sonner />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;