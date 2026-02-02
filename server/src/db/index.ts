import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres'
import * as schema from './schema'

const sql = postgres(process.env.DATABASE_URL!, {
    max: 10,
    ssl: { rejectUnauthorized: false },
})

const db = drizzle(sql, {
    schema: {
        ...schema
    },
    logger: process.env.NODE_ENV === 'development'
});

export { db }