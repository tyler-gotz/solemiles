import { Hono } from "hono";
import { db } from "../db";
import { shoeSchema } from "../db/schema";
import { eq } from "drizzle-orm";

const shoesRoutes = new Hono();

shoesRoutes.get("/", async (c) => {
    const shoes = await db.select()
        .from(shoeSchema)

    return c.json({
        success: true,
        data: shoes
    })
});

shoesRoutes.get("/:id", async (c) => {
    const { id } = c.req.param();

    const shoe = await db.query.shoeSchema.findFirst({
        where: eq(shoeSchema.shoeId, id)
    })

    if (!shoe) {
        return c.json({
            success: false,
            message: "Shoe not found"
        }, 404)
    }

    return c.json({
        success: true,
        data: shoe
    })
})

shoesRoutes.post("/", async (c) => {
    const { name, brand, model, purchaseDate } = await c.req.json();

    const [shoe] = await db.insert(shoeSchema)
        .values({
            name,
            brand,
            model,
            purchaseDate
        })
        .returning()

    return c.json({
        success: true,
        data: shoe
    })
})

export default shoesRoutes;