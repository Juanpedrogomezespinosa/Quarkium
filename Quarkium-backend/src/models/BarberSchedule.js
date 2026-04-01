// backend/src/models/BarberSchedule.js
const db = require("../config/database");

class BarberSchedule {
  // Obtener el horario semanal de un trabajador específico
  static async findByBarber(barberId, tenantId) {
    const [rows] = await db.execute(
      "SELECT * FROM barber_schedules WHERE barber_id = ? AND tenant_id = ? ORDER BY day_of_week, start_time",
      [barberId, tenantId],
    );
    return rows;
  }

  // Crear un nuevo bloque de horario
  static async create(tenantId, data) {
    const { barber_id, day_of_week, start_time, end_time } = data;
    const [result] = await db.execute(
      `INSERT INTO barber_schedules (tenant_id, barber_id, day_of_week, start_time, end_time) 
       VALUES (?, ?, ?, ?, ?)`,
      [tenantId, barber_id, day_of_week, start_time, end_time],
    );
    return result.insertId;
  }

  // Actualizar un bloque
  static async update(id, tenantId, data) {
    const { day_of_week, start_time, end_time } = data;
    const [result] = await db.execute(
      `UPDATE barber_schedules 
       SET day_of_week = ?, start_time = ?, end_time = ? 
       WHERE id = ? AND tenant_id = ?`,
      [day_of_week, start_time, end_time, id, tenantId],
    );
    return result.affectedRows;
  }

  // Eliminar un bloque (borrado físico, ya que son reglas de horario, no histórico de citas)
  static async delete(id, tenantId) {
    const [result] = await db.execute(
      "DELETE FROM barber_schedules WHERE id = ? AND tenant_id = ?",
      [id, tenantId],
    );
    return result.affectedRows;
  }
}

module.exports = BarberSchedule;
