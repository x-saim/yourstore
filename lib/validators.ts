import { z } from 'zod';
import { formatNumberWithDecimalPlaces } from './utils';

const currency = z
  .string()
  .refine(
    (value) =>
      /^\d+(\.\d{2})?$/.test(formatNumberWithDecimalPlaces(Number(value))),
    'Price must have exactly two decimal places (e.g., 49.99)'
  );

// Schema for inserting a product
export const insertProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  category: z.string().min(3, 'Category must be at least 3 characters'),
  brand: z.string().min(3, 'Brand must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  stock: z.coerce.number(), // Convert to number
  images: z.array(z.string()).min(1, 'Product must have at least one image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// Schema for user signin
const MIN_PASSWORD_LENGTH = 6;

export const signInFormSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .trim() // Remove leading/trailing whitespace for security and data consistency
    .email('Please enter a valid email address.'), // Slightly friendlier message
  password: z
    .string({
      required_error: 'Password is required.',
    })
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
    ),
});
