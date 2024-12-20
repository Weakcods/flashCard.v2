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

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <section className="py-8 md:py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Try It Out</h2>
        <div className="flex flex-col items-center max-w-md mx-auto">
          <Flashcard
            question={questions[currentQuestionIndex].question}
            answer={questions[currentQuestionIndex].answer}
            isFlipped={isFlipped}
          />
          <Button 
            onClick={handleFlip} 
            className="mt-4 w-full sm:w-auto flex items-center justify-center"
          >
            Flip Card
          </Button>
          <Button 
            onClick={handleNext} 
            className="mt-6 w-full sm:w-auto flex items-center justify-center"
          >
            Next
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TryItOut;