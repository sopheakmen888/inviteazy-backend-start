import { z } from 'zod';

const nameSchema = z.string();
nameSchema.parse("John"); // ✅

try {
    nameSchema.parse(42); // ❌ throws ZodError
} catch (error) {
    if (error instanceof z.ZodError) {
        console.log(error.errors[0]?.message); // "Expected string, received number"
    } else {
        console.log("Unexpected error", error);
    }
}
