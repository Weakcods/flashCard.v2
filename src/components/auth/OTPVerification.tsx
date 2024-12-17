import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { bouncy } from 'ldrs';

bouncy.register();

interface OTPVerificationProps {
  email: string;
  onVerificationComplete: () => void;
}

export const OTPVerification = ({ email, onVerificationComplete }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handleVerification = async () => {
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid 6-digit code",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Email verified successfully.",
      });
      onVerificationComplete();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to verify email. Please try again.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-up">
      <CardContent className="space-y-6 pt-6">
        <p className="text-center text-muted-foreground">
          Please check your email ({email}) for the verification code
        </p>
        <div className="flex justify-center">
          <Button 
            onClick={handleVerification} 
            className="w-full max-w-xs"
            disabled={isVerifying}
          >
            {isVerifying ? (
              <div className="flex items-center justify-center">
                <l-bouncy size="25" speed="1.75" color="white"></l-bouncy>
              </div>
            ) : (
              'Continue to Dashboard'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};