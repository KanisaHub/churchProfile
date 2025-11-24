import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { church } from 'workers/database/schema';
import { z } from 'zod';

// Zod schemas for validation
const createChurchSchema = z.object({
  name: z.string().min(1, 'Church name is required'),
  city: z.string().min(1, 'City is required'),
});

const updateChurchSchema = z.object({
  name: z.string().min(1, 'Church name is required').optional(),
  city: z.string().min(1, 'City is required').optional(),
});

const getChurchSchema = z
  .object({
    limit: z.number().min(1).max(100).default(50),
    offset: z.number().min(0).default(0),
    sortBy: z.enum(['name', 'createdAt', 'updatedAt']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
    search: z.string().optional(),
  })
  .optional();

export type CreateChurchInput = z.infer<typeof createChurchSchema>;
export type UpdateChurchInput = z.infer<typeof updateChurchSchema>;
export type GetChurchInput = z.infer<typeof getChurchSchema>;
/**
 * Simple service class for managing churches
 */

export default class ChurchService {
  private db: DrizzleD1Database;

  constructor(database: DrizzleD1Database) {
    this.db = database;
  }

  // Methods for creating, updating, and retrieving churches would go here
  //Create a new church

  async createChurch(data: CreateChurchInput) {
    try {
      const parsedData = createChurchSchema.parse(data);
      const result = await this.db
        .insert(church)
        .values({
          name: parsedData.name,
          city: parsedData.city,
        })
        .returning();
      return result[0] || null;
    } catch (error) {
      console.error('Error creating church:', error);
      return null;
    }
  }
}
