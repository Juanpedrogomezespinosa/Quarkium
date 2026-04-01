// backend/src/routes/v1/tenants.js
const express = require("express");
const router = express.Router();
const tenantController = require("../../controllers/tenantController");
const { verifyToken, requireRole } = require("../../middlewares/auth");

// Protegemos todas las rutas de este archivo
router.use(verifyToken);
router.use(requireRole(["admin"]));

// GET y PUT a la raíz (no hace falta pasar ID en la URL porque lo sacamos del token)
router.get("/settings", tenantController.getSettings);
router.put("/settings", tenantController.updateSettings);

module.exports = router;
