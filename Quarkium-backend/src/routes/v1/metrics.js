// backend/src/routes/v1/metrics.js
const express = require("express");
const router = express.Router();
const metricsController = require("../../controllers/metricsController");
const { verifyToken, requireRole } = require("../../middlewares/auth");

// Solo un administrador logueado puede ver los datos del negocio
router.get(
  "/",
  verifyToken,
  requireRole(["admin"]),
  metricsController.getDashboardMetrics,
);

module.exports = router;
