
// App constants
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "YourStore";
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_DESCRIPTION || "A modern ecommerce store built with Next.js.";

// Server constants
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";


// Product constants
// The number of latest products to display on the home page
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

// Sign in constants
export const signInDefaultValues = {
  email: '',
  password: '',
};