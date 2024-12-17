import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <FileQuestion className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved
        </p>
        <Button onClick={() => navigate("/")}>
          Go Back Home
        </Button>
      </div>
    </div>
  );
}