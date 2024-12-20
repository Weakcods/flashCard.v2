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
import { OverviewSection } from "@/components/OverviewSection";
import { FeedbackSection } from "@/components/FeedbackSection";
import { SettingsSection } from "@/components/SettingsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chat from "@/components/Chat";

export default function Dashboard() {
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>(() => flashcardService.getAll());
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [activeSection, setActiveSection] = useState<'overview' | 'create' | 'profile' | 'settings' | 'chat'>('overview');
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
        
        <div className="flex-1 p-4 pb-20 md:pb-4 overflow-auto">
          <div className="container mx-auto max-w-4xl">
            <div className="grid gap-6">
              {activeSection === 'overview' && <OverviewSection />}
              
              {activeSection === 'create' && (
                <div className="space-y-6 pt-16 md:pt-0">
                  <Tabs defaultValue="create" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="create">Create Cards</TabsTrigger>
                      <TabsTrigger value="upload">Upload PDF</TabsTrigger>
                    </TabsList>
                    <TabsContent value="create">
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
                    </TabsContent>
                    <TabsContent value="upload">
                      <div className="mt-6">
                        <PDFUploader />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {activeSection === 'profile' && (
                <div className="pt-16 md:pt-0">
                  <div className="grid gap-6">
                    <ProfileSection />
                    <SettingsSection />
                  </div>
                </div>
              )}

              {activeSection === 'chat' && (
                <div className="pt-16 md:pt-0">
                  <Chat />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}