import { z } from "zod";
import { insertProductSchema } from "../lib/validator";

// Extend the insertProductSchema with the required fields
export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
  rating: string;
  numReviews: number;
}