"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";


export default function ChatArea() {
  const { currentChatroom, isTyping, darkMode, toggleDarkMode } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Auto-scroll to bottom when new messages arrive or typing starts
  const scrollToBottom = (force = false) => {
    if (messagesEndRef.current) {
      const container = chatContainerRef.current;
      if (container) {
        const isAtBottom =
          container.scrollTop + container.clientHeight >=
          container.scrollHeight - 10;

        // Only auto-scroll if user is already at bottom or if forced
        if (isAtBottom || force) {
          messagesEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }
    }
  };

  // Scroll to bottom when messages change or typing starts
  useEffect(() => {
    scrollToBottom(true); // Force scroll for new messages
  }, [currentChatroom?.messages?.length, isTyping]);

  // Scroll to bottom after a short delay to ensure DOM is updated
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom(true);
    }, 100);
    return () => clearTimeout(timer);
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
      <div className="flex-1 flex items-center justify-center min-h-0">
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
    <div className="flex-1 flex flex-col min-h-0">
      {/* Chat Header */}
      <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {currentChatroom.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentChatroom.messages.length} messages
            </p>
          </div>

        
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto min-h-0 px-4 py-2"
        onScroll={handleScroll}
      >
        {/* Loading More Indicator */}
        {isLoadingMore && (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            Loading more messages...
          </div>
        )}

        {/* Messages */}
        <div className="space-y-1 pb-2">
          {currentChatroom.messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>

        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}

        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} className="h-1" />
      </div>
    </div>
  );
}
