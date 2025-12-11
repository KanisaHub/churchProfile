import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { district } from './district';

export const church = sqliteTable('church', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  pastor: text('pastor').notNull(),
  establishedDate: text('establishedDate').notNull(),
  location: text('location').notNull(),
  city: text('city').notNull(),
  // Foreign key linking church → district
  districtId: int('districtId')
    .references(() => district.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: text('createdAt', 'timestamp')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updatedAt', 'timestamp')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type InsertChurch = typeof church.$inferInsert;
export type SelectChurch = typeof church.$inferSelect;
