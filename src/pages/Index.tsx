import { ThemeToggle } from "@/components/ThemeToggle";
import { Hero } from "@/components/Hero";
import { Flashcard } from "@/components/Flashcard";
import { Footer } from "@/pages/Footer";

const Index = () => {
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
              className="bg-revigreen text-white px-4 py-2 rounded-lg hover:bg-revigreen/90 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="pt-16">
          <Hero />
          
          <section className="py-16 bg-muted">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Try It Out</h2>
              <Flashcard
                question="What is the capital of France?"
                answer="Paris"
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;