// backend/src/models/Service.js
const db = require("../config/database");

class Service {
  // Obtener todos los servicios activos de un negocio
  static async findAllByTenant(tenantId) {
    const [rows] = await db.execute(
      "SELECT * FROM services WHERE tenant_id = ? AND is_active = TRUE ORDER BY name ASC",
      [tenantId],
    );
    return rows;
  }

  // Crear un nuevo servicio
  static async create(tenantId, data) {
    const {
      name,
      duration_minutes,
      buffer_minutes = 0,
      price,
      requires_deposit = false,
      deposit_amount = 0,
    } = data;
    const [result] = await db.execute(
      `INSERT INTO services 
      (tenant_id, name, duration_minutes, buffer_minutes, price, requires_deposit, deposit_amount) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        tenantId,
        name,
        duration_minutes,
        buffer_minutes,
        price,
        requires_deposit,
        deposit_amount,
      ],
    );
    return result.insertId;
  }

  // Actualizar un servicio existente (verificando que pertenezca al tenant)
  static async update(id, tenantId, data) {
    const {
      name,
      duration_minutes,
      buffer_minutes,
      price,
      requires_deposit,
      deposit_amount,
    } = data;
    const [result] = await db.execute(
      `UPDATE services 
       SET name = ?, duration_minutes = ?, buffer_minutes = ?, price = ?, requires_deposit = ?, deposit_amount = ? 
       WHERE id = ? AND tenant_id = ?`,
      [
        name,
        duration_minutes,
        buffer_minutes,
        price,
        requires_deposit,
        deposit_amount,
        id,
        tenantId,
      ],
    );
    return result.affectedRows; // Retorna 1 si se actualizó, 0 si no se encontró
  }

  // "Borrado lógico": En reservas no borramos filas para no romper el historial de citas pasadas
  static async softDelete(id, tenantId) {
    const [result] = await db.execute(
      "UPDATE services SET is_active = FALSE WHERE id = ? AND tenant_id = ?",
      [id, tenantId],
    );
    return result.affectedRows;
  }
}

module.exports = Service;
