import { ThemeToggle } from "@/components/ThemeToggle";
import { Hero } from "@/components/Hero";
import { Flashcard } from "@/components/Flashcard";

const Index = () => {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Revi<span className="text-revigreen">card</span>
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="bg-revigreen text-white px-4 py-2 rounded-lg hover:bg-revigreen/90 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="pt-16">
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
      </main>

      <footer className="bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">© 2024 Revicard. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground">About</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">FAQ</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;