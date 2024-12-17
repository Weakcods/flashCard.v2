import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { WifiOff } from "lucide-react";

export default function NetworkError() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <WifiOff className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="text-4xl font-bold">No Internet Connection</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Please check your internet connection and try again
        </p>
        <div className="space-x-4">
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}