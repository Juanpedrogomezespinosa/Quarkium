// backend/src/routes/v1/services.js
const express = require("express");
const router = express.Router();
const serviceController = require("../../controllers/serviceController");
const { verifyToken, requireRole } = require("../../middlewares/auth");

// Todas estas rutas requieren estar logueado (pertenecer a un tenant)
router.use(verifyToken);

// GET: Trabajadores y Admins pueden ver los servicios
router.get("/", serviceController.getAllServices);

// POST, PUT, DELETE: Solo el Admin puede modificar el catálogo
router.post("/", requireRole(["admin"]), serviceController.createService);
router.put("/:id", requireRole(["admin"]), serviceController.updateService);
router.delete("/:id", requireRole(["admin"]), serviceController.deleteService);

module.exports = router;
