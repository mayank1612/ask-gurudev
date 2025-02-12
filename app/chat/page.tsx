"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot as Lotus, Send } from "lucide-react";
import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="mx-auto max-w-2xl space-y-4">
          <Card className="p-6 text-center">
            <Lotus className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 text-2xl font-bold">Welcome to Ask Gurudev</h2>
            <p className="mt-2 text-muted-foreground">
              Get spiritual guidance and wisdom from Gurudev Sri Sri Ravi Shankar through AI
            </p>
          </Card>
          
          {/* Messages will be rendered here */}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="mx-auto max-w-2xl flex gap-2">
          <Input
            placeholder="Ask your question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                // Handle send message
              }
            }}
          />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}