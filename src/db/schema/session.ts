import { pgTable, uuid, text, timestamp, serial } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm"
import { users } from "./users";

export const userSessions = pgTable("user_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.user_id, {onDelete: "cascade"}),
  refreshToken: text("refresh_token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export type userSessions = InferSelectModel<typeof userSessions>;
export type NewuserSessions = InferInsertModel<typeof userSessions>