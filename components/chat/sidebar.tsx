"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Glogo from "../Glogo";

export default function ChatSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex h-full w-[300px] flex-col bg-muted p-4">
      <div className="flex items-center gap-2 px-2">
        <Glogo />
        <h1 className="text-xl font-bold">Ask Gurudev</h1>
      </div>

      {/* <Button asChild className="mt-4 gap-2">
        <Link href="/chat">
          <Plus className="h-4 w-4" />
          New Chat
        </Link>
      </Button> */}

      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-2">
          {/* Chat history will be mapped here */}
        </div>
      </ScrollArea>

      {user ? (
        <div className="flex items-center gap-2 px-2">
          <img
            src={user.image}
            alt={user.name}
            className="h-8 w-8 rounded-full"
          />
          <div className="flex-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ) : (
        <Button asChild variant="outline" className="w-full">
          <Link href="/auth/signin">Sign in</Link>
        </Button>
      )}
    </div>
  );
}
