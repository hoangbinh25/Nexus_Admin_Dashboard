import z from "zod";

export const createUserSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    role: z.enum(["ADMIN", "SUPER ADMIN"]),
    status: z.enum(["Active", "Inactive"]),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;

