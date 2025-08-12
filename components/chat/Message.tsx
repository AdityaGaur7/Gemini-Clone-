"use client";

import { useState } from "react";
import { Copy, Check, User, Bot, MoreVertical } from "lucide-react";
import { Message as MessageType } from "@/types";
import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const [copied, setCopied] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  };

  const isUser = message.sender === "user";

  return (
    <div
      className={cn(
        "group flex gap-3 p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-200 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm">
          <Bot className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </div>
      )}

      <div
        className={cn(
          "flex-1 max-w-[75%] space-y-2",
          isUser && "flex flex-col items-end"
        )}
      >
        <div
          className={cn(
            "relative group/message rounded-2xl p-4 shadow-sm transition-all duration-200 hover:shadow-md",
            isUser
              ? "bg-gray-900 text-white"
              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
          )}
        >
          {/* Message Actions */}
          <div className="absolute top-2 right-2 opacity-0 group-hover/message:opacity-100 transition-opacity duration-200">
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className={cn(
                  "p-1 rounded-full transition-colors duration-200",
                  isUser
                    ? "text-white/70 hover:text-white hover:bg-white/20"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                )}
              >
                <MoreVertical className="w-3 h-3" />
              </button>

              {showActions && (
                <div className="absolute right-0 top-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 animate-fade-in">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Message Content */}
          <div className="pr-8">
            {message.image && (
              <div className="mb-3">
                <img
                  src={message.image}
                  alt="Uploaded image"
                  className="max-w-full h-auto rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                />
              </div>
            )}
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          {isUser && (
            <div className="flex-shrink-0 w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-gray-700 dark:text-gray-300" />
            </div>
          )}
          <span className="font-medium">{formatTime(message.timestamp)}</span>
          {!isUser && (
            <div className="flex-shrink-0 w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-gray-700 dark:text-gray-300" />
            </div>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm">
          <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </div>
      )}
    </div>
  );
}
