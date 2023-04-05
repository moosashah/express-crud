import { InferModel, sql } from 'drizzle-orm'
import { pgEnum, pgTable, varchar, uuid, uniqueIndex, timestamp } from 'drizzle-orm/pg-core'


export const tournamentStatusEnum = pgEnum('status', ['looking for teams', 'full', 'completed'])

export const tournaments = pgTable('tournaments', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 256 }).notNull(),
  address_line_one: varchar('address_line_one', { length: 256 }).notNull(),
  address_line_two: varchar('address_line_two', { length: 256 }),
  address_post_code: varchar('address_post_code', { length: 256 }).notNull(),
  address_city: varchar('address_city', { length: 256 }).notNull(),
  // organiser_id: serial('id').references(() => users.id).notNull(),
  status: tournamentStatusEnum('status').notNull().default("looking for teams"),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
})


// export type User = InferModel<typeof users>
// export type NewUser = InferModel<typeof users, 'insert'>
export type Tournament = InferModel<typeof tournaments>
export type NewTournament = InferModel<typeof tournaments, 'insert'>

