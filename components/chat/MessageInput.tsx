"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Image, X, Smile, Paperclip } from "lucide-react";
import { messageSchema, MessageFormData } from "@/lib/validations";
import { useStore, simulateAIResponse } from "@/store/useStore";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function MessageInput() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { currentChatroom, addMessage, isTyping } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = watch("content");

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: MessageFormData) => {
    if (!currentChatroom) {
      toast.error("Please select a chatroom first");
      return;
    }

    if (isTyping) {
      toast.error("Please wait for Gemini to finish typing");
      return;
    }

    // Create user message
    const userMessage = {
      id: Math.random().toString(36).substr(2, 9),
      content: data.content,
      sender: "user" as const,
      timestamp: new Date(),
      image: selectedImage || undefined,
    };

    // Add user message
    addMessage(currentChatroom.id, userMessage);

    // Clear form
    reset();
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Simulate AI response
    simulateAIResponse(currentChatroom.id, data.content);
  };

  if (!currentChatroom) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Send className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          Select a chatroom to start chatting
        </h3>
        <p className="text-sm">
          Choose a conversation from the sidebar to begin
        </p>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 border-t border-gray-200/50 dark:border-gray-700/50 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      {/* Selected Image Preview */}
      {selectedImage && (
        <div className="mb-4 relative animate-fade-in">
          <div className="relative inline-block">
            <img
              src={selectedImage}
              alt="Selected image preview"
              className="max-w-xs h-auto rounded-xl shadow-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 p-1.5 bg-gray-900 text-white rounded-full hover:bg-black transition-colors duration-200 shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 items-end">
        {/* Action Buttons */}
        <div className="flex gap-2 flex-shrink-0">
          {/* Image Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <Image className="w-5 h-5" />
          </button>

          {/* Emoji Button */}
          <button
            type="button"
            className="p-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <Smile className="w-5 h-5" />
          </button>

          {/* Attachment Button */}
          <button
            type="button"
            className="p-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <Paperclip className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        {/* Message Input */}
        <div className="flex-1 relative min-w-0">
          <textarea
            placeholder="Type your message..."
            rows={1}
            className={cn(
              "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none transition-all duration-200",
              isFocused && "shadow-lg",
              errors.content && "border-red-500 focus:ring-red-500"
            )}
            {...register("content")}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
          />
          {errors.content && (
            <p className="absolute -bottom-6 left-0 text-sm text-red-600 animate-fade-in">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={isTyping || !messageContent?.trim()}
          className={cn(
            "p-3 rounded-xl transition-all duration-200 shadow-lg flex-shrink-0",
            messageContent?.trim() && !isTyping
              ? "bg-gray-900 text-white hover:bg-black hover:shadow-xl"
              : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          )}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Character Count */}
      {messageContent && (
        <div className="mt-2 text-right">
          <span
            className={cn(
              "text-xs",
              messageContent.length > 900
                ? "text-red-500"
                : "text-gray-500 dark:text-gray-400"
            )}
          >
            {messageContent.length}/1000
          </span>
        </div>
      )}
    </div>
  );
}
