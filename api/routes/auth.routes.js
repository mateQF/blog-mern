const { Router } = require("express");
const {
  register,
  login,
  logout,
  profile,
  verifyToken,
} = require("../controllers/UserController.js");
const authRequired = require("../middleware/validateToken.js");
const validateSchema = require("../middleware/validator.middleware.js");
const { registerSchema } = require("../schemas/auth.schema.js");

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", authRequired, profile);

module.exports = router;
