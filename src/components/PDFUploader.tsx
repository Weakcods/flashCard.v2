import { useState } from "react";
import { FileUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { flashcardService } from "@/services/flashcardService";
import * as pdfjsLib from 'pdfjs-dist';

// Initialize pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export function PDFUploader() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePDFUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      // Extract text from all pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + ' ';
      }
      
      // Simple algorithm to extract potential QA pairs
      const sentences = fullText.split(/[.!?]+/);
      const cards = sentences
        .filter(s => s.length > 10) // Filter out very short sentences
        .map((sentence, index) => {
          if (index % 2 === 0) {
            return {
              question: sentence.trim(),
              answer: sentences[index + 1]?.trim() || "No answer available"
            };
          }
          return null;
        })
        .filter(Boolean);

      cards.forEach(card => {
        if (card) {
          flashcardService.create(card);
        }
      });

      toast({
        title: "PDF processed successfully",
        description: `Created ${cards.length} flashcards`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error processing PDF:', error);
      toast({
        title: "Error processing PDF",
        description: "Please try again with a different file",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted dark:hover:bg-muted/10">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FileUp className="w-10 h-10 mb-3 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">PDF (MAX. 10MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".pdf"
            onChange={handlePDFUpload}
            disabled={isLoading}
          />
        </label>
      </div>
      {isLoading && (
        <div className="mt-4 flex justify-center">
          <l-bouncy size="45" speed="1.75" color="var(--revigreen)"></l-bouncy>
        </div>
      )}
    </div>
  );
}