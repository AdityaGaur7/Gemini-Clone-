"use client";

import { useEffect } from "react";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { useStore } from "@/store/useStore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { darkMode, initialize } = useStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    // Apply theme to HTML element
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  // Keyboard shortcut for theme toggle (Ctrl+T or Cmd+T)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "t") {
        event.preventDefault();
        const { toggleDarkMode } = useStore.getState();
        toggleDarkMode();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
