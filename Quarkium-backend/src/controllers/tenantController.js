// backend/src/controllers/tenantController.js
const Tenant = require("../models/Tenant");

exports.getSettings = async (req, res) => {
  try {
    const tenantId = req.user.tenant_id;
    const tenant = await Tenant.findById(tenantId);

    if (!tenant) {
      return res.status(404).json({ error: "Negocio no encontrado" });
    }

    res.json(tenant);
  } catch (error) {
    console.error("Error obteniendo configuración del negocio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const tenantId = req.user.tenant_id;
    const { name, timezone, stripe_account_id } = req.body;

    // Validación básica
    if (!name || !timezone) {
      return res
        .status(400)
        .json({ error: "El nombre y la zona horaria son obligatorios." });
    }

    const updated = await Tenant.update(tenantId, {
      name,
      timezone,
      stripe_account_id,
    });

    if (updated === 0) {
      return res
        .status(400)
        .json({ error: "No se pudo actualizar el negocio." });
    }

    res.json({
      message: "Configuración del negocio actualizada correctamente",
    });
  } catch (error) {
    console.error("Error actualizando negocio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
