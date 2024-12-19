import React, { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Hero } from "@/components/Hero";
import { Flashcard } from "@/components/Flashcard";
import { Footer } from "@/pages/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Testimonials } from "@/pages/Testimonials";

const questions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is the capital of Spain?", answer: "Madrid" },
  // Add more questions as needed
];

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Review<span className="text-revigreen">card</span>
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => window.location.href = "/signin"}
              className="bg-revigreen text-white px-4 py-2 rounded-lg hover:bg-revigreen/90 transition-colors z-10">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="pt-16">
          <Hero />
          
          <section className="py-8 md:py-16 bg-muted">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Try It Out</h2>
              <div className="flex flex-col items-center max-w-md mx-auto">
                <Flashcard
                  question={questions[currentQuestionIndex].question}
                  answer={questions[currentQuestionIndex].answer}
                />
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
          <Testimonials />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;