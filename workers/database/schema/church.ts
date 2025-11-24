import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const church = sqliteTable('church', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  city: text('city').notNull(),
  createdAt: text('createdAt', 'timestamp')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updatedAt', 'timestamp')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type InsertChurch = typeof church.$inferInsert;
export type SelectChurch = typeof church.$inferSelect;
