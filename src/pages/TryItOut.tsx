import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Flashcard } from "@/components/Flashcard";
import { useState } from "react"; // Add this import

const questions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is the capital of Spain?", answer: "Madrid" },
  // Add more questions as needed
];

interface FlashcardProps {
  question: string;
  answer: string;
  isFlipped: boolean;
}

const TryItOut = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Add this state
  const [isFlipped, setIsFlipped] = useState(false); // Add this state
  const [showingAnswer, setShowingAnswer] = useState(false);

  const handleNext = () => {
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
      }, 200);
    } else {
      setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    }
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  // Add responsive padding and spacing classes
  return (
    <section className="py-6 md:py-12 bg-muted">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 md:mb-8">
          Try It Out
        </h2>
        <div className="flex flex-col items-center max-w-sm md:max-w-md mx-auto">
          <div className="w-full mb-4">
            <p className="text-center text-sm text-muted-foreground mb-2">
              {isFlipped ? "Answer" : "Question"} {currentQuestionIndex + 1} of {questions.length}
            </p>
            <Flashcard
              question={questions[currentQuestionIndex].question}
              answer={questions[currentQuestionIndex].answer}
              isFlipped={isFlipped}
            />
          </div>
          
          {/* Stack buttons vertically on mobile, horizontally on larger screens */}
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-4 sm:mt-6">
            <Button 
              onClick={handleNext}
              className="w-full sm:w-auto flex-1 flex items-center justify-center text-sm"
            >
              Next Card
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TryItOut;