import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

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
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};

export function Hero() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-revigreen/10 to-background z-0" />
      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        <motion.div className="space-y-6" variants={itemVariants}>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-4">
            Ace your reviews anytime 
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Master any subject . Create, study with ease.
          </p>
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate("/signin")}
              className="bg-revigreen hover:bg-revigreen/90 text-white px-10 py-6 text-lg rounded-full w-full sm:w-auto shadow-lg"
            >
              Review now
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              onClick={() => navigate("/not-found")}
              className="px-10 py-6 text-lg rounded-full w-full sm:w-auto border-2 border-revigreen text-revigreen hover:bg-revigreen hover:text-white transition-colors"
            >
              Learn More
              <BookOpen className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={itemVariants}
        >
          {[
            {
              title: "Smart Learning",
              description: "Adaptive flashcards that evolve with your progress",
            },
            {
              title: "Track Progress",
              description: "Visualize your learning journey with detailed analytics",
            },
            {
              title: "Study Anywhere",
              description: "Access your flashcards on any device, anytime",
            },
          ].map((card, index) => (
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