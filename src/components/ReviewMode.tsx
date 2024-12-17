import { useState } from "react";
import { Button } from "./ui/button";
import { Flashcard as FlashcardType } from "@/services/flashcardService";
import { Flashcard } from "./Flashcard";
import { ArrowLeft, ArrowRight, Shuffle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ReviewModeProps {
  cards: FlashcardType[];
  onClose: () => void;
}

export function ReviewMode({ cards, onClose }: ReviewModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledCards, setShuffledCards] = useState<FlashcardType[]>(cards);

  const handleNext = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleShuffle = () => {
    const newShuffledCards = [...shuffledCards].sort(() => Math.random() - 0.5);
    setShuffledCards(newShuffledCards);
    setCurrentIndex(0);
    toast({
      title: "Cards shuffled!",
      description: "Review order has been randomized.",
      duration: 2000,
    });
  };

  if (shuffledCards.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg mb-4">No cards to review!</p>
        <Button onClick={onClose}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={onClose}>
          Exit Review
        </Button>
        <Button
          variant="outline"
          onClick={handleShuffle}
          className="mx-2"
        >
          <Shuffle className="mr-2 h-4 w-4" />
          Shuffle
        </Button>
        <span className="text-sm">
          Card {currentIndex + 1} of {shuffledCards.length}
        </span>
      </div>

      <Flashcard
        question={shuffledCards[currentIndex].question}
        answer={shuffledCards[currentIndex].answer}
      />

      <div className="flex justify-center gap-4 mt-4">
        <Button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          variant="outline"
        >
          <ArrowLeft className="mr-2" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex === shuffledCards.length - 1}
          variant="outline"
        >
          Next
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}