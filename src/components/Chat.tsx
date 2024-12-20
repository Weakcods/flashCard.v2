import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react"; // Import the Send icon

function Chat() {
  const [messages, setMessages] = React.useState([
    { id: 1, text: "Hello!", sender: "other" },
    { id: 2, text: "Hi there!", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = React.useState("");

  const updateChatData = () => {
    // Function implementation to update chat data
    console.log("Chat data updated");
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: "me" }]);
      setNewMessage("");
      // Update chatData in OverviewSection
      updateChatData();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            {message.sender === "other" && (
              <Avatar className="mr-2" src="/path/to/avatar.jpg">
                <AvatarImage src="/path/to/avatar.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`p-2 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${
                message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="flex items-center p-4 border-t bg-background">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 mr-2 bg-input text-foreground"
        />
        <Button onClick={handleSendMessage} className="bg-primary text-primary-foreground flex items-center">
          <Send className="mr-2" /> 
        </Button>
      </div>
    </div>
  );
}

export default Chat;
