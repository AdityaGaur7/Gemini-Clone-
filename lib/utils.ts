import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(date: Date | string): string {
  let d: Date;
  if (typeof date === "string") {
    d = new Date(date);
  } else {
    d = date;
  }

  // Check if the date is valid
  if (isNaN(d.getTime())) {
    return "Invalid time";
  }

  // Fallback formatting for environments without toLocaleTimeString
  if (typeof d.toLocaleTimeString === "function") {
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  // Manual formatting as fallback
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, "0");
  return `${displayHours}:${displayMinutes} ${ampm}`;
}

export function formatDate(date: Date | string): string {
  let d: Date;
  if (typeof date === "string") {
    d = new Date(date);
  } else {
    d = date;
  }
  if (isNaN(d.getTime())) return "";
  // Fallback formatting for environments without toLocaleDateString
  if (typeof d.toLocaleDateString === "function") {
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "2-digit",
    });
  }
  // Manual formatting
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear().toString().slice(-2);
  return `${month} ${day}, ${year}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<F extends (...args: any[]) => any>(
  func: F,
  limit: number
): (...args: Parameters<F>) => void {
  let inThrottle = false;
  return (...args: Parameters<F>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
