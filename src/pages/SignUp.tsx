import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SocialAuth } from "@/components/auth/SocialAuth";
import { EmailSignUpForm } from "@/components/auth/EmailSignUpForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 py-12 sm:py-16 relative bg-background">
      {showNotification && (
        <Alert 
          className="fixed top-4 left-1/2 -translate-x-1/2 max-w-md w-[calc(100%-2rem)] z-50 border-revigreen bg-revigreen/10 animate-in fade-in duration-700 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-revigreen flex-shrink-0" />
            <AlertDescription className="text-revigreen text-sm">
              This site is under development, some function may not work as expected.
            </AlertDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 shrink-0 text-revigreen hover:bg-revigreen/20 -mr-2"
            onClick={() => setShowNotification(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close notification</span>
          </Button>
        </Alert>
      )}

      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="absolute top-4 left-3 gap-2 sm:top-4 sm:left-4 text-sm hover:bg-secondary/80 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 sm:h-4 sm:w-4" />
        <span className="font-medium">Back</span>
      </Button>
      
      <Card className="w-full max-w-md shadow-lg border-0 sm:border">
        <CardHeader className="space-y-2 pb-6 pt-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center text-sm sm:text-base">
            Join us to start your journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6">
          <SocialAuth />

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <EmailSignUpForm />
          
          <p className="text-center text-sm text-muted-foreground py-2">
            Already have an account?{" "}
            <Link 
              to="/signin" 
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}