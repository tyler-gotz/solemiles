import { date, numeric, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { shoeSchema } from "./shoes";

export const runTypeEnum = pgEnum("run_type", ["outdoor", "treadmill"]);

export const runSchema = pgTable("runs", {
    runId: uuid("run_id").defaultRandom().primaryKey(),
    date: date("date").notNull(),
    distance: numeric("distance", { precision: 10, scale: 2 }).notNull(),
    notes: text("notes"),
    shoeId: uuid("shoe_id")
        .notNull()
        .references(() => shoeSchema.shoeId),
    runType: runTypeEnum("run_type").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})