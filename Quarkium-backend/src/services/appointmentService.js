// backend/src/services/appointmentService.js
const db = require("../config/database");
const Appointment = require("../models/Appointment");
const { timeToMinutes, minutesToTime } = require("../utils/dateHelpers");

exports.getAvailableSlots = async (tenantId, serviceId, barberId, date) => {
  // 1. Obtener la duración del servicio
  const [services] = await db.execute(
    "SELECT duration_minutes, buffer_minutes FROM services WHERE id = ? AND tenant_id = ?",
    [serviceId, tenantId],
  );
  if (services.length === 0) throw new Error("Servicio no encontrado");

  const totalDuration =
    services[0].duration_minutes + services[0].buffer_minutes;

  // 2. Obtener el día de la semana (0=Domingo, 1=Lunes...)
  const dayOfWeek = new Date(date).getDay();

  // 3. Obtener el horario del barbero para ese día
  const [schedules] = await db.execute(
    "SELECT start_time, end_time FROM barber_schedules WHERE tenant_id = ? AND barber_id = ? AND day_of_week = ?",
    [tenantId, barberId, dayOfWeek],
  );

  if (schedules.length === 0) return []; // Ese día no trabaja

  // 4. Obtener las citas ya reservadas para ese día
  const appointments = await Appointment.findByDateAndBarber(
    date,
    barberId,
    tenantId,
  );

  // Convertimos las citas a minutos para que sea fácil compararlas
  const bookedSlots = appointments.map((appt) => ({
    start: timeToMinutes(
      new Date(appt.start_time).toTimeString().split(" ")[0],
    ),
    end: timeToMinutes(new Date(appt.end_time).toTimeString().split(" ")[0]),
  }));

  const availableSlots = [];

  // 5. Generar los huecos y filtrar los ocupados
  schedules.forEach((schedule) => {
    let currentMin = timeToMinutes(schedule.start_time);
    const endMin = timeToMinutes(schedule.end_time);

    // Iteramos en intervalos de 15 minutos (muy común en peluquerías)
    while (currentMin + totalDuration <= endMin) {
      const slotStart = currentMin;
      const slotEnd = currentMin + totalDuration;

      // Comprobar si choca con alguna cita existente
      const isOverlapping = bookedSlots.some((booked) => {
        // Lógica de solapamiento: (Empieza antes de que acabe la otra) Y (Acaba después de que empiece la otra)
        return slotStart < booked.end && slotEnd > booked.start;
      });

      if (!isOverlapping) {
        availableSlots.push(minutesToTime(slotStart));
      }

      currentMin += 15; // Avanzamos 15 minutos al siguiente hueco posible
    }
  });

  return availableSlots;
};
