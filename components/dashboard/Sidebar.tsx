"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  MessageSquare,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useStore } from "@/store/useStore";
import { chatroomSchema, ChatroomFormData } from "@/lib/validations";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  const {
    chatrooms,
    currentChatroom,
    searchQuery,
    addChatroom,
    deleteChatroom,
    setCurrentChatroom,
  } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChatroomFormData>({
    resolver: zodResolver(chatroomSchema),
  });

  // Filter chatrooms based on search query
  const filteredChatrooms = chatrooms.filter((chatroom) =>
    chatroom.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateChatroom = (data: ChatroomFormData) => {
    const newChatroom = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addChatroom(newChatroom);
    setCurrentChatroom(newChatroom);
    setShowCreateForm(false);
    reset();
    toast.success("Chatroom created successfully!");
  };

  const handleDeleteChatroom = (id: string) => {
    deleteChatroom(id);
    setShowDeleteConfirm(null);
    toast.success("Chatroom deleted successfully!");
  };

  return (
    <div className="w-full md:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Chatrooms
          </h2>
          <div className="flex items-center gap-2">
           

            {/* Create Chatroom Button */}
            <button
              onClick={() => setShowCreateForm(true)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              title="Create new chatroom"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Create Chatroom Form */}
      {showCreateForm && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <form
            onSubmit={handleSubmit(handleCreateChatroom)}
            className="space-y-3"
          >
            <div>
              <input
                type="text"
                placeholder="Enter chatroom title..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-0"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  reset();
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-0"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chatrooms List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChatrooms.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            {searchQuery ? "No chatrooms found" : "No chatrooms yet"}
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredChatrooms.map((chatroom) => (
              <div
                key={chatroom.id}
                className={cn(
                  "group relative flex items-center p-3 rounded-lg cursor-pointer transition-colors",
                  currentChatroom?.id === chatroom.id
                    ? "bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
                onClick={() => setCurrentChatroom(chatroom)}
              >
                <MessageSquare className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {chatroom.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {chatroom.messages.length} messages •{" "}
                    {formatDate(chatroom.updatedAt)}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteConfirm(chatroom.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Delete Chatroom
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Are you sure you want to delete this chatroom? This action cannot
              be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => handleDeleteChatroom(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
