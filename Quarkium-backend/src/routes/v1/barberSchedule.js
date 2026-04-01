// src/routes/v1/barberSchedule.js
const express = require("express");
const router = express.Router();

// ↓ APUNTAMOS AL NOMBRE EXACTO DE TU CONTROLADOR ↓
const scheduleController = require("../../controllers/scheduleController");
const { verifyToken, requireRole } = require("../../middlewares/auth");

router.use(verifyToken);

router.get("/:barber_id", scheduleController.getScheduleByBarber);
router.post("/", requireRole(["admin"]), scheduleController.createSchedule);
router.put("/:id", requireRole(["admin"]), scheduleController.updateSchedule);
router.delete(
  "/:id",
  requireRole(["admin"]),
  scheduleController.deleteSchedule,
);

module.exports = router;
