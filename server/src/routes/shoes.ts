import { Hono } from "hono";
import { db } from "../db";
import { shoeSchema } from "../db/schema";

const shoesRoutes = new Hono();

shoesRoutes.get("/", async (c) => {
    const shoes = await db.select()
        .from(shoeSchema)

    return c.json({
        success: true,
        data: shoes
    })
});

export default shoesRoutes;