const z = require("zod");

const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username must be provided",
    })
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(30, {
      message: "Username can have a maximum of 30 characters",
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
  password: z
    .string({
      required_error: "Password must be provided",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, and one number",
    }),
});

module.exports = { registerSchema };
