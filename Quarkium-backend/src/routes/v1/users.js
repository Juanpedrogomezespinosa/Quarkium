// src/routes/v1/users.js
const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const { verifyToken, requireRole } = require("../../middlewares/auth");

router.post(
  "/workers",
  verifyToken,
  requireRole(["admin"]),
  userController.createWorker,
);

// ESTA LÍNEA ES LA QUE EVITA EL ERROR QUE TIENES
module.exports = router;
