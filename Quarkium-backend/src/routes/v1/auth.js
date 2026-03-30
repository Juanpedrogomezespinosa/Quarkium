// src/routes/v1/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const { verifyToken } = require("../../middlewares/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/profile", verifyToken, authController.updateProfile);

// ESTA LÍNEA ES LA QUE EVITA EL ERROR QUE TIENES
module.exports = router;
