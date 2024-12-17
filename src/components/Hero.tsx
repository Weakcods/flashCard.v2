import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { HeroBanner } from "./HeroBanner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.2,
    },
  }),
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};

const features = [
  {
    title: "AI-Powered Learning",
    description: "Generate flashcards instantly using our advanced AI technology.",
  },
  {
    title: "PDF Integration",
    description: "Upload PDFs and automatically create study materials.",
  },
  {
    title: "Smart Review",
    description: "Adaptive learning system that focuses on what you need to review.",
  },
];

export function Hero() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <HeroBanner />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FDFC47] to-[#24FE41]">
            Transform Your Learning Experience
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Create, study, and master your subjects with AI-powered flashcards.
            Perfect for students, professionals, and lifelong learners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-revigreen hover:bg-revigreen/90"
              onClick={() => navigate("/signup")}
            >
              Get Started Free
              <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/not-found")}
            >
              <BookOpen className="mr-2" />
              Try Demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={itemVariants}
        >
          {features.map((card, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-xl bg-background/50 backdrop-blur-sm border shadow-md"
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <h3 className="text-2xl font-semibold mb-3">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}