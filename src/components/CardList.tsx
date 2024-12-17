import { Flashcard } from "@/services/flashcardService";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Pencil, Trash } from "lucide-react";

interface CardListProps {
  cards: Flashcard[];
  onEdit: (card: Flashcard) => void;
  onDelete: (id: string) => void;
}

export function CardList({ cards, onEdit, onDelete }: CardListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Card 
          key={card.id}
          className="transform transition-all duration-200 hover:scale-105 dark:bg-revidark border dark:border-revigray-300 backdrop-blur-sm bg-white/80 dark:bg-revidarkest/80 animate-fade-up"
        >
          <CardHeader>
            <CardTitle className="text-lg line-clamp-2 min-h-[3rem]">{card.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 line-clamp-3 whitespace-pre-line min-h-[4.5rem]">
              {card.answer}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(card)}
                className="flex-1 hover:bg-revigreen/10"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(card.id)}
                className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}