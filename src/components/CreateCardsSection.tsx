import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Plus, Play, Image as ImageIcon } from "lucide-react";
import { CardList } from "./CardList";
import { Flashcard } from "@/services/flashcardService";
import { LoadingOverlay } from "./LoadingOverlay";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface CreateCardsSectionProps {
  showCreateCard: boolean;
  setShowCreateCard: (show: boolean) => void;
  formData: { question: string; answer: string };
  setFormData: (data: { question: string; answer: string }) => void;
  handleSubmit: (e: React.FormEvent) => void;
  editingCard: Flashcard | null;
  resetForm: () => void;
  cards: Flashcard[];
  onEdit: (card: Flashcard) => void;
  onDelete: (id: string) => void;
  setIsReviewing: (reviewing: boolean) => void;
}

export function CreateCardsSection({
  showCreateCard,
  setShowCreateCard,
  formData,
  setFormData,
  handleSubmit,
  editingCard,
  resetForm,
  cards,
  onEdit,
  onDelete,
  setIsReviewing,
}: CreateCardsSectionProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    setCardToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (cardToDelete) {
      setIsLoading(true);
      try {
        const { error } = await supabase
          .from('flashcards')
          .delete()
          .eq('id', cardToDelete);

        if (error) throw error;

        onDelete(cardToDelete);
        setShowDeleteDialog(false);
        setCardToDelete(null);
        toast({
          title: "Card deleted",
          description: "The flashcard has been removed successfully.",
        });
      } catch (error) {
        console.error('Error deleting card:', error);
        toast({
          title: "Error",
          description: "Failed to delete the flashcard. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (e.nativeEvent instanceof InputEvent && e.nativeEvent.inputType === "insertLineBreak") {
      const lines = value.split("\n");
      if (lines[lines.length - 2] && !lines[lines.length - 2].startsWith("• ")) {
        lines[lines.length - 2] = "• " + lines[lines.length - 2];
        setFormData({ ...formData, answer: lines.join("\n") });
        return;
      }
    }
    setFormData({ ...formData, answer: value });
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <div className="space-y-6 pt-16 md:pt-0">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Button
            onClick={() => setShowCreateCard(!showCreateCard)}
            className="bg-revigreen hover:bg-revigreen/90"
          >
            <Plus className="mr-2" size={20} />
            Create Card
          </Button>
          <Button 
            className="bg-revigreen hover:bg-revigreen/90"
            onClick={() => setIsReviewing(true)}
            disabled={cards.length === 0}
          >
            <Play className="mr-2" size={20} />
            Start Review
          </Button>
        </div>

        {showCreateCard && (
          <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg bg-card animate-fade-up">
            <div className="space-y-2">
              <Input
                placeholder="Enter your question"
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                required
                className="min-h-[50px] text-lg"
              />
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Enter the answer (Press Enter for bullet points)"
                value={formData.answer}
                onChange={handleAnswerChange}
                required
                className="min-h-[120px] text-lg"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-revigreen hover:bg-revigreen/90">
                {editingCard ? "Update Card" : "Save Card"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Clear
              </Button>
            </div>
          </form>
        )}

        {cards.length > 0 && (
          <div className="grid gap-4">
            <h2 className="text-xl font-semibold">Your Cards</h2>
            <CardList 
              cards={cards}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          </div>
        )}

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the flashcard.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}