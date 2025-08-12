export interface Country {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
}

export interface User {
  id: string;
  phone: string;
  countryCode: string;
  name?: string;
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date | string;
  image?: string;
}

export interface Chatroom {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ChatState {
  chatrooms: Chatroom[];
  currentChatroom: Chatroom | null;
  isLoading: boolean;
  isTyping: boolean;
}

export interface AppState extends AuthState, ChatState {
  darkMode: boolean;
  searchQuery: string;
}
