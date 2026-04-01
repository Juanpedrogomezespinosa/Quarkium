// backend/src/controllers/serviceController.js
const Service = require("../models/Service");

exports.getAllServices = async (req, res) => {
  try {
    const tenantId = req.user.tenant_id;
    const services = await Service.findAllByTenant(tenantId);
    res.json(services);
  } catch (error) {
    console.error("Error obteniendo servicios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.createService = async (req, res) => {
  try {
    const tenantId = req.user.tenant_id;
    // Validar datos mínimos
    if (!req.body.name || !req.body.duration_minutes || !req.body.price) {
      return res.status(400).json({
        error: "Faltan campos obligatorios (nombre, duración, precio)",
      });
    }

    const serviceId = await Service.create(tenantId, req.body);
    res.status(201).json({ message: "Servicio creado con éxito", serviceId });
  } catch (error) {
    console.error("Error creando servicio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.updateService = async (req, res) => {
  try {
    const tenantId = req.user.tenant_id;
    const serviceId = req.params.id;

    const updated = await Service.update(serviceId, tenantId, req.body);
    if (updated === 0) {
      return res
        .status(404)
        .json({ error: "Servicio no encontrado o no autorizado" });
    }

    res.json({ message: "Servicio actualizado correctamente" });
  } catch (error) {
    console.error("Error actualizando servicio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const tenantId = req.user.tenant_id;
    const serviceId = req.params.id;

    const deleted = await Service.softDelete(serviceId, tenantId);
    if (deleted === 0) {
      return res
        .status(404)
        .json({ error: "Servicio no encontrado o no autorizado" });
    }

    res.json({ message: "Servicio desactivado correctamente" });
  } catch (error) {
    console.error("Error desactivando servicio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
