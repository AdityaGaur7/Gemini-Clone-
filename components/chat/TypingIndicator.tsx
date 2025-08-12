"use client";

import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 p-4 animate-fade-in">
      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
        <Bot className="w-5 h-5 text-white" />
      </div>

      <div className="flex-1 max-w-[75%]">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Gemini is typing
            </span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full typing-dot"></div>
              <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full typing-dot"></div>
              <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full typing-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
