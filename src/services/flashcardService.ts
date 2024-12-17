export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

const STORAGE_KEY = 'revicard_flashcards';

export const flashcardService = {
  getAll: (): Flashcard[] => {
    const cards = localStorage.getItem(STORAGE_KEY);
    return cards ? JSON.parse(cards) : [];
  },

  create: (card: Omit<Flashcard, 'id' | 'createdAt'>): Flashcard => {
    const cards = flashcardService.getAll();
    const newCard = {
      ...card,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...cards, newCard]));
    return newCard;
  },

  update: (id: string, card: Partial<Flashcard>): Flashcard => {
    const cards = flashcardService.getAll();
    const updatedCards = cards.map((c) =>
      c.id === id ? { ...c, ...card } : c
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
    return updatedCards.find((c) => c.id === id)!;
  },

  delete: (id: string): void => {
    const cards = flashcardService.getAll();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cards.filter((c) => c.id !== id))
    );
  },
};