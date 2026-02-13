import { Hono } from "hono";
import { db } from "../db";
import { runSchema } from "../db/schema";
import { eq } from "drizzle-orm";

const runsRoutes = new Hono();

runsRoutes.get("/", async (c) => {
    const { shoeId } = c.req.query();

    const runs = await db.query.runSchema.findMany({
        where: eq(runSchema.shoeId, shoeId)
    })

    return c.json({
        success: true,
        data: runs
    })
})

runsRoutes.post("/", async (c) => {
    const { shoeId, distance, notes, date, type } = await c.req.json();

    const [run] = await db.insert(runSchema)
        .values([{
            shoeId,
            distance,
            runType: type,
            notes,
            date
        }])
        .returning()

    return c.json({
        success: true,
        data: run
    })
});

export default runsRoutes;