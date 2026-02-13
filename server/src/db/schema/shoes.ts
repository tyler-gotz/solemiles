import { date, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const shoeSchema = pgTable("shoes", {
    shoeId: uuid("shoe_id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    brand: varchar("brand", { length: 255 }).notNull(),
    model: varchar("model", { length: 255 }).notNull(),
    purchaseDate: date("purchase_date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})