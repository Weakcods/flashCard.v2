import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, ThumbsUp } from "lucide-react";

export function FeedbackSection() {
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });
    setFeedback("");
  };

  return (
    <div className="space-y-6 pt-16 md:pt-0">
      <h2 className="text-3xl font-bold">Feedback</h2>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="feedback" className="text-sm font-medium">
              Share your thoughts
            </label>
            <Textarea
              id="feedback"
              placeholder="Tell us what you think about the app..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          <Button type="submit" className="w-full md:w-auto">
            <MessageSquare className="mr-2 h-4 w-4" />
            Submit Feedback
          </Button>
        </form>
      </Card>
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <ThumbsUp className="h-12 w-12 text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold">Your feedback matters</h3>
            <p className="text-sm text-muted-foreground">
              Help us improve your learning experience by sharing your thoughts and suggestions.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}