// backend/src/controllers/barberScheduleController.js
const BarberSchedule = require("../models/BarberSchedule");

exports.getScheduleByBarber = async (req, res) => {
  try {
    const tenantId = req.user.tenant_id;
    const { barber_id } = req.params;
    const schedule = await BarberSchedule.findByBarber(barber_id, tenantId);
    res.json(schedule);
  } catch (error) {
    console.error("Error obteniendo horarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.createSchedule = async (req, res) => {
  try {
    const tenantId = req.user.tenant_id;
    const { barber_id, day_of_week, start_time, end_time } = req.body;

    if (day_of_week === undefined || !start_time || !end_time || !barber_id) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const scheduleId = await BarberSchedule.create(tenantId, req.body);
    res.status(201).json({ message: "Horario creado", scheduleId });
  } catch (error) {
    console.error("Error creando horario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const tenantId = req.user.tenant_id;
    const { id } = req.params;
    const updated = await BarberSchedule.update(id, tenantId, req.body);

    if (updated === 0)
      return res.status(404).json({ error: "Horario no encontrado" });
    res.json({ message: "Horario actualizado" });
  } catch (error) {
    console.error("Error actualizando horario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const tenantId = req.user.tenant_id;
    const { id } = req.params;
    const deleted = await BarberSchedule.delete(id, tenantId);

    if (deleted === 0)
      return res.status(404).json({ error: "Horario no encontrado" });
    res.json({ message: "Horario eliminado" });
  } catch (error) {
    console.error("Error eliminando horario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
