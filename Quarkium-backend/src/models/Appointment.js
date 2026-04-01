// backend/src/models/Appointment.js
const db = require("../config/database");

class Appointment {
  static async findByDateAndBarber(date, barberId, tenantId) {
    // date debe llegar en formato 'YYYY-MM-DD'
    const [rows] = await db.execute(
      `SELECT start_time, end_time FROM appointments
       WHERE tenant_id = ? AND barber_id = ?
       AND DATE(start_time) = ?
       AND status NOT IN ('cancelled', 'no_show')`,
      [tenantId, barberId, date],
    );
    return rows;
  }

  // Comprobación de seguridad para evitar "Double Booking" al CREAR
  static async checkOverlap(barberId, startTime, endTime, tenantId) {
    const [rows] = await db.execute(
      `SELECT id FROM appointments 
       WHERE barber_id = ? AND tenant_id = ? 
       AND status NOT IN ('cancelled', 'no_show')
       AND (start_time < ? AND end_time > ?)`,
      [barberId, tenantId, endTime, startTime],
    );
    return rows.length > 0;
  }

  // Crear la cita
  static async create(data) {
    const {
      tenant_id,
      barber_id,
      client_id,
      service_id,
      start_time,
      end_time,
      total_price,
      status = "pending_payment",
    } = data;

    const [result] = await db.execute(
      `INSERT INTO appointments 
       (tenant_id, barber_id, client_id, service_id, start_time, end_time, total_price, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tenant_id,
        barber_id,
        client_id,
        service_id,
        start_time,
        end_time,
        total_price,
        status,
      ],
    );
    return result.insertId;
  }

  // Obtener una cita específica por su ID
  static async findById(id, tenantId) {
    const [rows] = await db.execute(
      "SELECT * FROM appointments WHERE id = ? AND tenant_id = ?",
      [id, tenantId],
    );
    return rows[0];
  }

  // Cancelar la cita (Borrado Lógico cambiando el estado a 'cancelled')
  static async cancel(id, tenantId) {
    const [result] = await db.execute(
      `UPDATE appointments SET status = 'cancelled' WHERE id = ? AND tenant_id = ?`,
      [id, tenantId],
    );
    return result.affectedRows;
  }

  // Comprobación especial de solapamiento para cuando ACTUALIZAMOS una cita
  // (Excluye la cita actual usando "id != ?" para que no "choque consigo misma")
  static async checkOverlapForUpdate(
    barberId,
    startTime,
    endTime,
    tenantId,
    appointmentId,
  ) {
    const [rows] = await db.execute(
      `SELECT id FROM appointments 
       WHERE barber_id = ? AND tenant_id = ? 
       AND id != ? 
       AND status NOT IN ('cancelled', 'no_show')
       AND (start_time < ? AND end_time > ?)`,
      [barberId, tenantId, appointmentId, endTime, startTime],
    );
    return rows.length > 0;
  }

  // Reprogramar la cita (Actualizar servicio, barbero u hora)
  static async update(id, tenantId, data) {
    const { barber_id, service_id, start_time, end_time, total_price } = data;
    const [result] = await db.execute(
      `UPDATE appointments 
       SET barber_id = ?, service_id = ?, start_time = ?, end_time = ?, total_price = ?
       WHERE id = ? AND tenant_id = ?`,
      [barber_id, service_id, start_time, end_time, total_price, id, tenantId],
    );
    return result.affectedRows;
  }
}

module.exports = Appointment;
