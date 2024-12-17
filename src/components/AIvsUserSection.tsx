import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Brain, Send } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AIvsUserSection() {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{
    id: string;
    question: string;
    correct_answer: string;
  } | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const { toast } = useToast();

  const handleSubmitTopic = async () => {
    if (!topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "The topic field cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("ai_questions")
        .insert([
          {
            topic,
            user_id: user.id,
            question: `What is ${topic}?`,
            correct_answer: `This is a sample answer about ${topic}.`,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setCurrentQuestion(data);
      toast({
        title: "Question generated!",
        description: "Try to answer the question about " + topic,
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      toast({
        title: "Please enter your answer",
        description: "The answer field cannot be empty",
        variant: "destructive",
      });
      return;
    }
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setUserAnswer("");
    setCurrentQuestion(null);
    setTopic("");
  };

  return (
    <div className="space-y-6 pt-16 md:pt-0">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI vs Me</h2>
        <Brain className="h-6 w-6 text-revigreen" />
      </div>

      {!currentQuestion ? (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Enter a Topic</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Enter any topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
            />
            <Button
              onClick={handleSubmitTopic}
              disabled={isLoading}
              className="bg-revigreen hover:bg-revigreen/90"
            >
              Generate
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
          <div className="space-y-4">
            <Input
              placeholder="Type your answer..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={showAnswer}
            />
            {!showAnswer ? (
              <Button
                onClick={handleSubmitAnswer}
                className="w-full bg-revigreen hover:bg-revigreen/90"
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Answer
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-semibold mb-2">Correct Answer:</h4>
                  <p>{currentQuestion.correct_answer}</p>
                </div>
                <Button
                  onClick={handleNextQuestion}
                  className="w-full bg-revigreen hover:bg-revigreen/90"
                >
                  Next Question
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}