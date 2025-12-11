import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { church } from 'workers/database/schema';
import { z } from 'zod';
import { eq, like, asc, desc } from 'drizzle-orm';

const createChurchSchema = z.object({
  name: z.string().min(1),
  pastor: z.string().min(1),
  establishedDate: z.string().min(1),
  location: z.string().min(1),
  city: z.string().min(1),
  districtId: z.number().int().min(1),
});

const updateChurchSchema = z.object({
  name: z.string().optional(),
  pastor: z.string().optional(),
  establishedDate: z.string().optional(),
  location: z.string().optional(),
  city: z.string().optional(),
  districtId: z.number().int().optional(),
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

export default class ChurchService {
  private db: DrizzleD1Database;

  constructor(database: DrizzleD1Database) {
    this.db = database;
  }

  // ────────────────────────────
  // CREATE
  // ────────────────────────────
  async createChurch(data: CreateChurchInput) {
    const parsed = createChurchSchema.parse(data);

    const result = await this.db
      .insert(church)
      .values({
        name: parsed.name,
        pastor: parsed.pastor,
        establishedDate: parsed.establishedDate,
        location: parsed.location,
        city: parsed.city,
        districtId: parsed.districtId,
      })
      .returning();

    return result[0] ?? null;
  }

  // ────────────────────────────
  // GET ALL
  // ────────────────────────────
  async getallChurches(query?: GetChurchInput) {
    const filters = getChurchSchema.parse(query ?? {}) ?? {
      limit: 50,
      offset: 0,
      sortBy: 'createdAt' as const,
      sortOrder: 'desc' as const,
    };

    const orderBy =
      filters.sortOrder === 'asc'
        ? asc(church[filters.sortBy])
        : desc(church[filters.sortBy]);

    const baseQuery = this.db
      .select()
      .from(church)
      .limit(filters.limit)
      .offset(filters.offset)
      .orderBy(orderBy);

    if (filters.search) {
      baseQuery.where(like(church.name, `%${filters.search}%`));
    }

    return await baseQuery;
  }

  // ────────────────────────────
  // GET ONE
  // ────────────────────────────
  async getChurchById(id: number) {
    const result = await this.db.select().from(church).where(eq(church.id, id));

    return result[0] ?? null;
  }

  // ────────────────────────────
  // GET BY DISTRICT
  // ────────────────────────────
  async getChurchesByDistrictId(districtId: number) {
    return await this.db
      .select()
      .from(church)
      .where(eq(church.districtId, districtId))
      .orderBy(asc(church.name));
  }

  // ────────────────────────────
  // UPDATE
  // ────────────────────────────
  async updateChurch(id: number, data: UpdateChurchInput) {
    const parsed = updateChurchSchema.parse(data);

    const result = await this.db
      .update(church)
      .set({
        ...parsed,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(church.id, id))
      .returning();

    return result[0] ?? null;
  }

  // ────────────────────────────
  // DELETE
  // ────────────────────────────
  async deleteChurch(id: number) {
    const result = await this.db
      .delete(church)
      .where(eq(church.id, id))
      .returning();

    return result[0] ?? null;
  }
}
