import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react"; // Import the Send icon

function Chat() {
  const [messages, setMessages] = React.useState([
    { id: 1, text: "Hello!", sender: "other", timestamp: new Date().toLocaleString() },
    { id: 2, text: "Hi there!", sender: "me", timestamp: new Date().toLocaleString() },
  ]);
  const [newMessage, setNewMessage] = React.useState("");

  const updateChatData = () => {
    // Function implementation to update chat data
    console.log("Chat data updated");
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: "me", timestamp: new Date().toLocaleString() }]);
      setNewMessage("");
      // Update chatData in OverviewSection
      updateChatData();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="p-4 bg-blue-600 text-white text-lg font-semibold rounded-t-lg">
        Chat
      </div>
      <ScrollArea className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"} mb-2`}
          >
            {message.sender === "other" && (
              <Avatar className="mr-2" src="/path/to/avatar.jpg">
                <AvatarImage src="/path/to/avatar.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`p-4 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${
                message.sender === "me" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
              }`}
            >
              <div>{message.text}</div>
              <div className="text-xs text-gray-500 mt-1 text-right">{message.timestamp}</div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="flex items-center p-4 border-t bg-white dark:bg-gray-900 rounded-b-lg">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 mr-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 px-4"
        />
        <Button onClick={handleSendMessage} className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition duration-200">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default Chat;
