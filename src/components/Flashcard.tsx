import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlashcardProps {
  question: string;
  answer: string;
}

export const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="w-full aspect-[3/2] perspective-1000 cursor-pointer touch-manipulation"
      onClick={handleClick}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-transform duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        <div className="absolute w-full h-full backface-hidden rounded-xl p-6 md:p-8 flex items-center justify-center text-center bg-card shadow-lg">
          <p className="text-lg md:text-xl font-medium">{question}</p>
        </div>
        <div className="absolute w-full h-full backface-hidden rounded-xl p-6 md:p-8 flex items-center justify-center text-center bg-card shadow-lg [transform:rotateY(180deg)]">
          <p className="text-lg md:text-xl font-medium">{answer}</p>
        </div>
      </motion.div>
    </div>
  );
};