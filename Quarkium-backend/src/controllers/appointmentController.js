// backend/src/controllers/appointmentController.js
const appointmentService = require("../services/appointmentService");
const Appointment = require("../models/Appointment");
const db = require("../config/database");

exports.getAvailability = async (req, res) => {
  try {
    // Como es pública, los datos vienen de la URL (?tenant_id=1&service_id=1...)
    const { tenant_id, service_id, barber_id, date } = req.query;

    if (!tenant_id || !service_id || !barber_id || !date) {
      return res.status(400).json({
        error: "Faltan parámetros (tenant_id, service_id, barber_id, date)",
      });
    }

    const slots = await appointmentService.getAvailableSlots(
      parseInt(tenant_id),
      parseInt(service_id),
      parseInt(barber_id),
      date,
    );

    res.json({ date, available_slots: slots });
  } catch (error) {
    console.error("Error calculando disponibilidad:", error);
    res
      .status(500)
      .json({ error: error.message || "Error interno del servidor" });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { tenant_id, barber_id, service_id, start_time, end_time } = req.body;
    const client_id = req.user.id; // El ID del cliente viene seguro del token JWT

    if (!tenant_id || !barber_id || !service_id || !start_time || !end_time) {
      return res
        .status(400)
        .json({ error: "Faltan datos obligatorios para la cita." });
    }

    // 1. Obtener el precio del servicio para congelarlo en la cita
    // (Por si mañana el dueño sube los precios, que esta cita guarde el precio original)
    const [services] = await db.execute(
      "SELECT price FROM services WHERE id = ? AND tenant_id = ?",
      [service_id, tenant_id],
    );

    if (services.length === 0) {
      return res.status(404).json({ error: "Servicio no encontrado." });
    }

    const total_price = services[0].price;

    // 2. Comprobación final anti-solapamiento (Double Booking)
    const isOverlapping = await Appointment.checkOverlap(
      barber_id,
      start_time,
      end_time,
      tenant_id,
    );
    if (isOverlapping) {
      return res.status(409).json({
        error: "El horario ya no está disponible. Alguien se te ha adelantado.",
      });
    }

    // 3. Crear la cita
    const appointmentId = await Appointment.create({
      tenant_id,
      barber_id,
      client_id,
      service_id,
      start_time,
      end_time,
      total_price,
    });

    res.status(201).json({
      message: "Cita reservada con éxito. Pendiente de pago.",
      appointmentId,
      status: "pending_payment",
    });
  } catch (error) {
    console.error("Error creando cita:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const tenantId = req.user.tenant_id;
    const userId = req.user.id;
    const role = req.user.role;

    // 1. Buscar la cita
    const appointment = await Appointment.findById(appointmentId, tenantId);
    if (!appointment) {
      return res.status(404).json({ error: "Cita no encontrada." });
    }

    // 2. Seguridad: Si es un cliente, solo puede cancelar SUS propias citas
    if (role === "client" && appointment.client_id !== userId) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para cancelar esta cita." });
    }

    // 3. Regla de Negocio: Validación de 24 horas (Solo aplicable a clientes, el Admin puede cancelar siempre)
    if (role === "client") {
      const now = new Date();
      const appointmentDate = new Date(appointment.start_time);
      const hoursDifference = (appointmentDate - now) / (1000 * 60 * 60);

      if (hoursDifference < 24) {
        return res.status(400).json({
          error:
            "Política de cancelación: No puedes cancelar una cita con menos de 24 horas de antelación.",
        });
      }
    }

    // 4. Cancelar la cita (Borrado Lógico)
    await Appointment.cancel(appointmentId, tenantId);
    res.json({ message: "Cita cancelada correctamente." });
  } catch (error) {
    console.error("Error cancelando cita:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const tenantId = req.user.tenant_id;
    const { barber_id, service_id, start_time, end_time } = req.body;

    // 1. Validar que la cita existe
    const appointment = await Appointment.findById(appointmentId, tenantId);
    if (!appointment) {
      return res.status(404).json({ error: "Cita no encontrada." });
    }

    // 2. Recalcular precio por si el cliente o admin cambió el servicio
    const [services] = await db.execute(
      "SELECT price FROM services WHERE id = ? AND tenant_id = ?",
      [service_id, tenantId],
    );
    if (services.length === 0) {
      return res.status(404).json({ error: "Servicio no encontrado." });
    }
    const total_price = services[0].price;

    // 3. Verificar solapamiento (excluyendo la cita actual)
    const isOverlapping = await Appointment.checkOverlapForUpdate(
      barber_id,
      start_time,
      end_time,
      tenantId,
      appointmentId,
    );
    if (isOverlapping) {
      return res.status(409).json({
        error: "El nuevo horario entra en conflicto con otra reserva.",
      });
    }

    // 4. Actualizar la cita
    await Appointment.update(appointmentId, tenantId, {
      barber_id,
      service_id,
      start_time,
      end_time,
      total_price,
    });

    res.json({ message: "Cita reprogramada con éxito." });
  } catch (error) {
    console.error("Error actualizando cita:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
