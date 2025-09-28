import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isPremiumResponse?: boolean;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hello! I'm your AI farming assistant. I can help you with crop diseases, pest management, soil health, and farming best practices. How can I assist you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Mock responses for demonstration
  const mockResponses = [
    {
      keywords: ["disease", "sick", "spots", "brown", "yellow"],
      response: "I can help identify plant diseases! For accurate diagnosis, I recommend using our Disease Detector feature. Common symptoms to look for include discolored spots, wilting, and unusual growth patterns. Would you like to upgrade to Premium for detailed treatment prescriptions?",
      isPremium: false
    },
    {
      keywords: ["fertilizer", "nutrients", "npk"],
      response: "For fertilizer recommendations, I need to know your crop type and soil conditions. Generally, most crops benefit from balanced NPK fertilizers. Premium users get access to detailed fertilizer schedules and custom recommendations. Upgrade now?",
      isPremium: true
    },
    {
      keywords: ["water", "irrigation", "watering"],
      response: "Proper watering is crucial for crop health! Most crops need about 1-2 inches of water per week. Check soil moisture at 2-3 inch depth. Our Soil Moisture Test can help you monitor this effectively.",
      isPremium: false
    },
    {
      keywords: ["pest", "insects", "bugs"],
      response: "Pest management is essential for healthy crops. Common pests include aphids, caterpillars, and beetles. Integrated Pest Management (IPM) combines biological, cultural, and chemical controls. Premium members get access to pest identification guides and treatment protocols.",
      isPremium: true
    },
    {
      keywords: ["organic", "natural", "pesticide"],
      response: "Organic farming practices are great for sustainable agriculture! Natural pest control includes beneficial insects, companion planting, and organic sprays like neem oil. I can provide more detailed organic protocols with a Premium subscription.",
      isPremium: true
    }
  ];

  const generateBotResponse = (userMessage: string): { text: string; isPremium: boolean } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Find matching response based on keywords
    const matchedResponse = mockResponses.find(response =>
      response.keywords.some(keyword => lowerMessage.includes(keyword))
    );

    if (matchedResponse) {
      return {
        text: matchedResponse.response,
        isPremium: matchedResponse.isPremium
      };
    }

    // Default response
    return {
      text: "That's an interesting question about farming! I can help with crop diseases, pest management, soil health, irrigation, and fertilizers. Could you provide more specific details about your farming concern?",
      isPremium: false
    };
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const botResponse = generateBotResponse(inputMessage);
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: botResponse.text,
      sender: "bot",
      timestamp: new Date(),
      isPremiumResponse: botResponse.isPremium
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="shadow-soft h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="h-5 w-5 mr-2 text-primary animate-pulse" />
          AI Farming Assistant
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            Free
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "bot" && (
                      <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    {message.sender === "user" && (
                      <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.text}</p>
                      {message.isPremiumResponse && (
                        <div className="mt-2 p-2 bg-accent/20 rounded border border-accent/30">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-accent-foreground">
                              🔒 Full answer requires Premium
                            </span>
                            <Button size="sm" variant="outline" className="text-xs h-6">
                              Upgrade
                            </Button>
                          </div>
                        </div>
                      )}
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 animate-pulse" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about crop diseases, pests, soil health..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            💡 Try asking: "My tomato leaves have brown spots" or "Best fertilizer for wheat"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;