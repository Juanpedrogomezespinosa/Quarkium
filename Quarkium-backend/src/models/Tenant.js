// backend/src/models/Tenant.js
const db = require("../config/database");

class Tenant {
  // Leer la configuración del negocio
  static async findById(id) {
    const [rows] = await db.execute(
      "SELECT id, name, subdomain, timezone, stripe_account_id, created_at FROM tenants WHERE id = ?",
      [id],
    );
    return rows[0];
  }

  // Actualizar la configuración del negocio
  static async update(id, data) {
    const { name, timezone, stripe_account_id } = data;
    const [result] = await db.execute(
      `UPDATE tenants 
       SET name = ?, timezone = ?, stripe_account_id = ? 
       WHERE id = ?`,
      [name, timezone, stripe_account_id, id],
    );
    return result.affectedRows;
  }
}

module.exports = Tenant;
