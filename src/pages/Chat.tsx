import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PageContainer from "@/components/layout/PageContainer";
import { Search, Send, Circle, Phone, Video, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Peer {
  id: string;
  name: string;
  college: string;
  avatar?: string;
  online: boolean;
  lastSeen?: string;
}

interface Message {
  id: string;
  text: string;
  fromMe: boolean;
  timestamp: Date;
}

const mockPeers: Peer[] = [
  { id: "1", name: "Rahul Sharma", college: "IIT Delhi", online: true },
  { id: "2", name: "Priya Patel", college: "DTU", online: true },
  { id: "3", name: "Amit Kumar", college: "BITS Pilani", online: false, lastSeen: "2 hours ago" },
  { id: "4", name: "Sneha Reddy", college: "IIT Bombay", online: false, lastSeen: "Yesterday" },
  { id: "5", name: "Vikram Singh", college: "NIT Trichy", online: true },
];

const mockMessages: Message[] = [
  { id: "1", text: "Hey! I saw your listing for the Data Structures notes", fromMe: true, timestamp: new Date(Date.now() - 3600000) },
  { id: "2", text: "Hi! Yes, they're still available. Interested?", fromMe: false, timestamp: new Date(Date.now() - 3500000) },
  { id: "3", text: "Definitely! Are they handwritten or typed?", fromMe: true, timestamp: new Date(Date.now() - 3400000) },
  { id: "4", text: "Handwritten with diagrams and examples. I scored 9.5 in that course!", fromMe: false, timestamp: new Date(Date.now() - 3300000) },
  { id: "5", text: "Perfect! Can we meet at the library tomorrow?", fromMe: true, timestamp: new Date(Date.now() - 3200000) },
];

export default function Chat() {
  const [selectedPeer, setSelectedPeer] = useState<Peer | null>(mockPeers[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchPeer, setSearchPeer] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      fromMe: true,
      timestamp: new Date(),
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredPeers = mockPeers.filter((peer) =>
    peer.name.toLowerCase().includes(searchPeer.toLowerCase())
  );

  return (
    <PageContainer className="h-[calc(100vh-8rem)]">
      <div className="grid h-full gap-6 lg:grid-cols-[320px,1fr]">
        {/* Peers List */}
        <Card variant="elevated" className="flex flex-col overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Messages</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchPeer}
                onChange={(e) => setSearchPeer(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            <div className="space-y-1 px-3 pb-3">
              {filteredPeers.map((peer) => (
                <button
                  key={peer.id}
                  onClick={() => setSelectedPeer(peer)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-lg p-3 text-left transition-colors",
                    selectedPeer?.id === peer.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-secondary"
                  )}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {peer.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {peer.online && (
                      <Circle className="absolute -bottom-0.5 -right-0.5 h-3 w-3 fill-green-500 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{peer.name}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {peer.online ? "Online" : peer.lastSeen}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card variant="elevated" className="flex flex-col overflow-hidden">
          {selectedPeer ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedPeer.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{selectedPeer.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {selectedPeer.college}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.fromMe ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-2xl px-4 py-2",
                        message.fromMe
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-secondary rounded-bl-md"
                      )}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={cn(
                        "text-xs mt-1",
                        message.fromMe ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} className="gap-2">
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                  <Send className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-1">Select a conversation</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a peer to start chatting
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}
