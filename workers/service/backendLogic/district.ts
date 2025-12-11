import { eq, desc, asc, like } from 'drizzle-orm';
import { z } from 'zod';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import {
  district,
  type InsertDistrict,
  type SelectDistrict,
} from 'workers/database/schema';

/* -----------------------------------------------------------
   ZOD SCHEMAS
----------------------------------------------------------- */

const CreateDistrictSchema = z.object({
  name: z.string().min(1, 'District name is required'),
  location: z.string().min(1, 'Location is required'),
  superintendent: z.string().min(1, 'Superintendent name required'),
});

const UpdateDistrictSchema = z.object({
  name: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  superintendent: z.string().optional(),
});

const GetDistrictsSchema = z
  .object({
    limit: z.number().min(1).max(100).default(50),
    offset: z.number().min(0).default(0),
    sortBy: z.enum(['name', 'createdAt', 'updatedAt']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
    search: z.string().optional(),
  })
  .optional();

export type CreateDistrictInput = z.infer<typeof CreateDistrictSchema>;
export type UpdateDistrictInput = z.infer<typeof UpdateDistrictSchema>;
export type GetDistrictsInput = z.infer<typeof GetDistrictsSchema>;

/* -----------------------------------------------------------
   DISTRICT SERVICE
----------------------------------------------------------- */

export default class DistrictService {
  private db: DrizzleD1Database;

  constructor(database: DrizzleD1Database) {
    this.db = database;
  }

  /* ---------------------------------------------
     CREATE DISTRICT
  --------------------------------------------- */
  async create(data: CreateDistrictInput): Promise<SelectDistrict | null> {
    try {
      const validated = CreateDistrictSchema.parse(data);

      const result = await this.db
        .insert(district)
        .values({
          name: validated.name,
          location: validated.location,
          superintendent: validated.superintendent,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .returning();

      return result[0] || null;
    } catch (error) {
      console.error('Error creating district:', error);
      return null;
    }
  }

  /* ---------------------------------------------
     GET DISTRICT BY ID
  --------------------------------------------- */
  async getById(id: number): Promise<SelectDistrict | null> {
    try {
      const result = await this.db
        .select()
        .from(district)
        .where(eq(district.id, id))
        .get();

      return result || null;
    } catch (error) {
      console.error('Error fetching district:', error);
      return null;
    }
  }

  /* ---------------------------------------------
     GET ALL DISTRICTS (search + pagination)
  --------------------------------------------- */
  async getAll(options: GetDistrictsInput): Promise<SelectDistrict[]> {
    try {
      const { limit, offset, sortBy, sortOrder, search } =
        GetDistrictsSchema.parse(options) ?? {};

      const sortColumn =
        sortBy === 'name'
          ? district.name
          : sortBy === 'createdAt'
          ? district.createdAt
          : district.updatedAt;

      const result = await this.db
        .select()
        .from(district)
        .where(search ? like(district.name, `%${search}%`) : undefined)
        .orderBy(sortOrder === 'asc' ? asc(sortColumn) : desc(sortColumn))
        .limit(limit ?? 10)
        .offset(offset ?? 0);

      return result;
    } catch (error) {
      console.error('Error fetching districts:', error);
      return [];
    }
  }

  /* ---------------------------------------------
     UPDATE DISTRICT
  --------------------------------------------- */
  async update(
    id: number,
    data: UpdateDistrictInput
  ): Promise<SelectDistrict | null> {
    try {
      const validated = UpdateDistrictSchema.parse(data);

      const updateValues: Partial<InsertDistrict> = {
        ...validated,
        updatedAt: new Date().toISOString(),
      };

      const result = await this.db
        .update(district)
        .set(updateValues)
        .where(eq(district.id, id))
        .returning();

      return result[0] || null;
    } catch (error) {
      console.error('Error updating district:', error);
      return null;
    }
  }

  /* ---------------------------------------------
     DELETE DISTRICT
  --------------------------------------------- */
  async delete(id: number): Promise<boolean> {
    try {
      const result = await this.db
        .delete(district)
        .where(eq(district.id, id))
        .returning({ id: district.id });

      return result.length > 0;
    } catch (error) {
      console.error('Error deleting district:', error);
      return false;
    }
  }

  /* ---------------------------------------------
     CHECK IF DISTRICT EXISTS (duplicate name)
  --------------------------------------------- */
  // async exists(name: string): Promise<boolean> {
  //   try {
  //     const result = await this.db
  //       .select({ id: district.id })
  //       .from(district)
  //       .where(eq(district.name, name))
  //       .get();

  //     return result !== null;
  //   } catch (error) {
  //     console.error('Error checking district existence:', error);
  //     return false;
  //   }
  // }
}
