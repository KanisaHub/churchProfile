import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const district = sqliteTable('district', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  location: text('location').notNull(),
  superintendent: text('superintendent').notNull(),

  // Foreign key linking district → church
  //   churchId: int('churchId')
  //     .references(() => church.id, { onDelete: 'cascade' })
  //     .notNull(),

  // memberId: int('memberId').references(() => member.id),

  createdAt: text('createdAt', 'timestamp')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updatedAt', 'timestamp')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type InsertDistrict = typeof district.$inferInsert;
export type SelectDistrict = typeof district.$inferSelect;
