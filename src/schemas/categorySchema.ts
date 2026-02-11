import z from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(3, "Name category must be at least 3 characters long"),
    description: z.string().min(3, "Description category must be at least 3 characters long")
})

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>