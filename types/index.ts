import { z } from 'zod';
import { insertProductSchema } from '../lib/validators';

// Extend the insertProductSchema with the required fields
export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
  rating: string;
  numReviews: number;
};
