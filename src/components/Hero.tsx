import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-revigreen/10 to-background z-0" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjMjRGRTQxIiBzdHJva2Utb3BhY2l0eT0iLjUiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-10 z-0" />
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
            Ace Your Reviews, <span className="text-revigreen">Anytime</span>, Anywhere
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up">
            Master any subject with our intelligent flashcard system. Create, study, and track your progress with ease.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up">
          <Button
            onClick={() => navigate("/signin")}
            className="bg-revigreen hover:bg-revigreen/90 text-white px-8 py-6 text-lg rounded-full w-full sm:w-auto"
          >
            Start Reviewing
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const featuresSection = document.getElementById('features');
              featuresSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-6 text-lg rounded-full w-full sm:w-auto"
          >
            Learn More
            <BookOpen className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up">
          <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border">
            <h3 className="text-xl font-semibold mb-2">Smart Learning</h3>
            <p className="text-muted-foreground">Adaptive flashcards that evolve with your progress</p>
          </div>
          <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border">
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-muted-foreground">Visualize your learning journey with detailed analytics</p>
          </div>
          <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border">
            <h3 className="text-xl font-semibold mb-2">Study Anywhere</h3>
            <p className="text-muted-foreground">Access your flashcards on any device, anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
}