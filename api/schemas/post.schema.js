const z = require("zod");

const postSchema = z.object({
  title: z
    .string({
      required_error: "Title must be provided",
    })
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(100, {
      message: "Title can have a maximum of 100 characters",
    }),
  summary: z
    .string({
      required_error: "Summary must be provided",
    })
    .min(30, {
      message: "Summary must be at least 30 characters long",
    }),
  content: z
    .string({
      required_error: "Content must be provided",
    })
    .min(50, {
      message: "Content must be at least 50 characters long",
    }),
});

module.exports = postSchema;
