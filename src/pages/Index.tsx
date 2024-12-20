import React, { useState } from "react";
import { Hero } from "@/components/Hero";
import { Footer } from "@/pages/Footer";
import { Testimonials } from "@/pages/Testimonials";
import TryItOut from "@/pages/TryItOut";
import Header from "@/pages/Header";

const Index = () => {
  const [isFlipped, setIsFlipped] = useState(false);

 
  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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