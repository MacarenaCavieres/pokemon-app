import z from "zod";

export const Pokemon = z.object({
    id: z.number(),
    name: z.string(),
    types: z.array(
        z.object({
            type: z.object({
                name: z.string(),
            }),
        })
    ),
    sprites: z.object({
        other: z.object({
            "official-artwork": z.object({
                front_default: z.url(),
            }),
        }),
    }),
    weight: z.number(),
    height: z.number(),
});
