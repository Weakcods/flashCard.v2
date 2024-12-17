import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { flashcardService, type Flashcard } from "@/services/flashcardService";
import { ReviewMode } from "@/components/ReviewMode";
import { useToast } from "@/hooks/use-toast";
import { PDFUploader } from "@/components/PDFUploader";
import { MobileNav } from "@/components/MobileNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { CreateCardsSection } from "@/components/CreateCardsSection";
import { ProfileSection } from "@/components/ProfileSection";
import { AIvsUserSection } from "@/components/AIvsUserSection";

export default function Dashboard() {
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>(() => flashcardService.getAll());
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [activeSection, setActiveSection] = useState<'upload' | 'create' | 'profile' | 'ai' | 'feedback'>('upload');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const resetForm = () => {
    setFormData({ question: "", answer: "" });
    setEditingCard(null);
    setShowCreateCard(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCard) {
      flashcardService.update(editingCard.id, formData);
      toast({
        title: "Card updated successfully!",
        duration: 2000,
      });
    } else {
      flashcardService.create(formData);
      toast({
        title: "Card created successfully!",
        duration: 2000,
      });
    }
    
    setCards(flashcardService.getAll());
    resetForm();
  };

  const handleEdit = (card: Flashcard) => {
    setFormData({ question: card.question, answer: card.answer });
    setEditingCard(card);
    setShowCreateCard(true);
    setActiveSection('create');
  };

  const handleDelete = (id: string) => {
    flashcardService.delete(id);
    setCards(flashcardService.getAll());
    toast({
      title: "Card deleted successfully!",
      duration: 2000,
    });
  };

  if (isReviewing) {
    return (
      <div className="min-h-screen">
        <DashboardHeader />
        <div className="container mx-auto max-w-4xl p-4">
          <ReviewMode cards={cards} onClose={() => setIsReviewing(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <MobileNav activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex min-h-[calc(100vh-65px)]">
        <DesktopSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <div className="flex-1 p-4 overflow-auto">
          <div className="container mx-auto max-w-4xl">
            <div className="grid gap-6">
              {activeSection === 'upload' && (
                <div className="pt-16 md:pt-0">
                  <PDFUploader />
                </div>
              )}

              {activeSection === 'create' && (
                <CreateCardsSection
                  showCreateCard={showCreateCard}
                  setShowCreateCard={setShowCreateCard}
                  formData={formData}
                  setFormData={setFormData}
                  handleSubmit={handleSubmit}
                  editingCard={editingCard}
                  resetForm={resetForm}
                  cards={cards}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  setIsReviewing={setIsReviewing}
                />
              )}

              {activeSection === 'ai' && (
                <AIvsUserSection />
              )}

              {activeSection === 'profile' && (
                <div className="pt-16 md:pt-0">
                  <ProfileSection />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}