import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert a Prisma object to a plain JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimalPlaces(num: number): string {
  // Split the number into integer and decimal parts
  const [integer, decimal] = num.toString().split('.');
  // Return the formatted number with two decimal places
  return decimal ? `${integer}.${decimal.padEnd(2, '0')}` : `${integer}.00`;
}