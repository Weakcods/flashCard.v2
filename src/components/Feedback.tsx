import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface FeedbackProps {
  onClose?: () => void;
}

export function Feedback({ onClose }: FeedbackProps) {
  const [feedback, setFeedback] = React.useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      toast({
        title: "Please enter your feedback",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", feedback);
    
    toast({
      title: "Thank you for your feedback!",
      description: "We appreciate your input.",
    });
    
    setFeedback("");
    if (onClose) onClose();
  };

  return (
    <Card className="w-full max-w-lg mx-auto border-revigreen/20">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-revigreen">Share Your Feedback</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            placeholder="Tell us what you think about the app..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[120px]"
          />
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button type="submit" className="bg-revigreen hover:bg-revigreen/90">Submit Feedback</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
