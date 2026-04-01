// backend/src/routes/v1/appointments.js
const express = require("express");
const router = express.Router();
const appointmentController = require("../../controllers/appointmentController");
const { verifyToken } = require("../../middlewares/auth");

// PÚBLICA: Cualquier persona puede ver la disponibilidad
router.get("/availability", appointmentController.getAvailability);

// PRIVADAS: A partir de aquí, inyectamos verifyToken a todo el bloque para asegurar que el usuario esté logueado
router.use(verifyToken);

// Crear Cita
router.post("/", appointmentController.createAppointment);

// Editar / Reprogramar Cita
router.put("/:id", appointmentController.updateAppointment);

// Cancelar Cita (Usamos PATCH porque es un cambio parcial de estado, no un DELETE físico)
router.patch("/:id/cancel", appointmentController.cancelAppointment);

module.exports = router;
