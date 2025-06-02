const express = require ("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/verifyToken");
const { getMe } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);
router.post('/logout', logoutUser);

module.exports = router;
