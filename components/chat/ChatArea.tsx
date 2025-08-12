"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import { cn } from "@/lib/utils";

export default function ChatArea() {
  const { currentChatroom, isTyping } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChatroom?.messages, isTyping]);

  // Simulate infinite scroll (load more messages when scrolling to top)
  const handleScroll = () => {
    if (!chatContainerRef.current || isLoadingMore) return;

    const { scrollTop } = chatContainerRef.current;
    if (scrollTop < 100) {
      setIsLoadingMore(true);
      
      // Simulate loading more messages
      setTimeout(() => {
        setIsLoadingMore(false);
      }, 1000);
    }
  };

  if (!currentChatroom) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Welcome to Gemini Clone
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Select a chatroom from the sidebar to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {currentChatroom.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {currentChatroom.messages.length} messages
        </p>
      </div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto"
        onScroll={handleScroll}
      >
        {/* Loading More Indicator */}
        {isLoadingMore && (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            Loading more messages...
          </div>
        )}

        {/* Messages */}
        <div className="space-y-1">
          {currentChatroom.messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>

        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}

        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

