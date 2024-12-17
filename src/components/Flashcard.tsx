import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface FlashcardProps {
  question: string;
  answer: string;
}

export function Flashcard({ question, answer }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const formatAnswer = (answer: string) => {
    if (!answer.startsWith("Answer:")) {
      answer = "Answer: " + answer;
    }
    
    // Split by newlines or bullet points
    const points = answer.split(/[\n•]+/).filter(point => point.trim());
    
    if (points.length <= 1) {
      return <p className="text-lg">{answer}</p>;
    }

    return (
      <div className="text-left">
        <p className="text-lg mb-2">{points[0]}</p>
        <ul className="list-disc pl-6 space-y-2">
          {points.slice(1).map((point, index) => (
            <li key={index} className="text-lg">{point.trim()}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div
        className={`flashcard h-64 w-full ${isFlipped ? "flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="flashcard-inner h-full">
          <div className="flashcard-front rounded-xl bg-white/80 dark:bg-revidark/80 backdrop-blur-sm p-6 shadow-lg border border-gray-200 dark:border-revigray-300 flex items-center justify-center transform transition-all duration-200 hover:scale-105">
            <h3 className="text-xl font-semibold">{question}</h3>
          </div>
          <div className="flashcard-back rounded-xl bg-white/80 dark:bg-revidark/80 backdrop-blur-sm p-6 shadow-lg border border-gray-200 dark:border-revigray-300 flex items-center justify-center transform transition-all duration-200 hover:scale-105 overflow-y-auto">
            {formatAnswer(answer)}
          </div>
        </div>
      </div>
      <Button
        onClick={() => setIsFlipped(!isFlipped)}
        className="mt-4 bg-revigreen hover:bg-revigreen/90 text-white"
      >
        Flip Card
      </Button>
    </div>
  );
}