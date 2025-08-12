import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppState, User, Chatroom, Message } from "@/types";

interface Store extends AppState {
  // Auth actions
  setUser: (user: User) => void;
  logout: () => void;
  setAuthLoading: (loading: boolean) => void;
  
  // Chat actions
  setChatrooms: (chatrooms: Chatroom[]) => void;
  addChatroom: (chatroom: Chatroom) => void;
  deleteChatroom: (id: string) => void;
  setCurrentChatroom: (chatroom: Chatroom | null) => void;
  addMessage: (chatroomId: string, message: Message) => void;
  setTyping: (typing: boolean) => void;
  setChatLoading: (loading: boolean) => void;
  
  // UI actions
  toggleDarkMode: () => void;
  setSearchQuery: (query: string) => void;
  
  // Initialize from localStorage
  initialize: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const createMockAIResponse = (userMessage: string): string => {
  const responses = [
    "That's an interesting question! Let me think about that...",
    "I understand what you're asking. Here's what I think...",
    "Great question! Based on my knowledge, I would say...",
    "I appreciate you sharing that with me. Here's my perspective...",
    "That's a fascinating topic. Let me break it down for you...",
    "I see what you mean. Here's how I would approach this...",
    "Thanks for asking! This is what I know about that...",
    "Interesting point! Let me provide some insights...",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      chatrooms: [],
      currentChatroom: null,
      isTyping: false,
      darkMode: false,
      searchQuery: "",
      
      // Auth actions
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
        chatrooms: [], 
        currentChatroom: null 
      }),
      setAuthLoading: (loading) => set({ isLoading: loading }),
      
      // Chat actions
      setChatrooms: (chatrooms) => set({ chatrooms }),
      addChatroom: (chatroom) => set((state) => ({
        chatrooms: [chatroom, ...state.chatrooms]
      })),
      deleteChatroom: (id) => set((state) => ({
        chatrooms: state.chatrooms.filter(room => room.id !== id),
        currentChatroom: state.currentChatroom?.id === id ? null : state.currentChatroom
      })),
      setCurrentChatroom: (chatroom) => set({ currentChatroom: chatroom }),
      addMessage: (chatroomId, message) => set((state) => {
        const updatedChatrooms = state.chatrooms.map(room => {
          if (room.id === chatroomId) {
            return {
              ...room,
              messages: [...room.messages, message],
              updatedAt: new Date()
            };
          }
          return room;
        });
        
        const updatedCurrentChatroom = state.currentChatroom?.id === chatroomId
          ? { ...state.currentChatroom, messages: [...state.currentChatroom.messages, message], updatedAt: new Date() }
          : state.currentChatroom;
        
        return {
          chatrooms: updatedChatrooms,
          currentChatroom: updatedCurrentChatroom
        };
      }),
      setTyping: (typing) => set({ isTyping: typing }),
      setChatLoading: (loading) => set({ isLoading: loading }),
      
      // UI actions
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      // Initialize
      initialize: () => {
        // Load initial data from localStorage if needed
        const stored = localStorage.getItem("gemini-clone-storage");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.state) {
            set(parsed.state);
          }
        }
      }
    }),
    {
      name: "gemini-clone-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        chatrooms: state.chatrooms,
        darkMode: state.darkMode,
      }),
    }
  )
);

// Helper function to simulate AI response
export const simulateAIResponse = async (chatroomId: string, userMessage: string) => {
  const store = useStore.getState();
  
  // Set typing indicator
  store.setTyping(true);
  
  // Simulate AI thinking time (1-3 seconds)
  const thinkingTime = Math.random() * 2000 + 1000;
  await new Promise(resolve => setTimeout(resolve, thinkingTime));
  
  // Create AI response
  const aiMessage: Message = {
    id: generateId(),
    content: createMockAIResponse(userMessage),
    sender: "ai",
    timestamp: new Date(),
  };
  
  // Add AI message
  store.addMessage(chatroomId, aiMessage);
  store.setTyping(false);
};

