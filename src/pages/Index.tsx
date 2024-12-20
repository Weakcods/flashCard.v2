import React, { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Hero } from "@/components/Hero";
import { Footer } from "@/pages/Footer";
import { Testimonials } from "@/pages/Testimonials";
import TryItOut from "@/pages/TryItOut";

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

 
  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
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
          <TryItOut />
          <Testimonials />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;