import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertSecondsToDate(seconds: number): string {
  const date = new Date(seconds * 1000); // Convert seconds to milliseconds
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

export const timestampToDate = (timestamp: { _seconds: number; _nanoseconds: number }) => {
  const date = new Date(timestamp._seconds * 1000);
  return date.toLocaleString('en-US', {
    weekday: 'long', // Full name of the day (e.g., Monday)
    year: 'numeric',
    month: 'long', // Full name of the month (e.g., January)
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

  export const getTableRange = (length: number): number[] => {
    const numberOfDivisions = Math.ceil(length / 10);
    return Array.from({ length: numberOfDivisions }, (_, i) => (i + 1) * 10);
  };