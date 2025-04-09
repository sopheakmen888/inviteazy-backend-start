import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  age: z.number().min(18, "Age must be 18 or above"),
});

const userData = { name: "PK", email: "pk@example.com", age: 17 };

const result = userSchema.safeParse(userData);

if (!result.success) {
  console.log(result.error.format()); // Shows validation errors
}
