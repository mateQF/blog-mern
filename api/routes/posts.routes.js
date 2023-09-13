const { Router } = require("express");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const authRequired = require("../middleware/validateToken.js");
const validateSchema = require("../middleware/validator.middleware.js");
const postSchema = require("../schemas/post.schema.js");
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/PostController.js");

const router = Router();

router.get("/posts", getAllPosts);
router.get("/post/:id", getPost);
router.post(
  "/post",
  authRequired,
  uploadMiddleware.single("file"),
  validateSchema(postSchema),
  createPost
);
router.put(
  "/update/:id",
  authRequired,
  uploadMiddleware.single("file"),
  validateSchema(postSchema),
  updatePost
);
router.delete("/delete/:id", authRequired, deletePost);

module.exports = router;
