// backend/src/models/Metric.js
const db = require("../config/database");

class Metric {
  // 1. Ingresos totales del mes en curso (Excluyendo canceladas y no_show)
  static async getMonthlyRevenue(tenantId) {
    const [rows] = await db.execute(
      `SELECT COALESCE(SUM(total_price), 0) AS total_revenue 
       FROM appointments 
       WHERE tenant_id = ? 
       AND status NOT IN ('cancelled', 'no_show')
       AND MONTH(start_time) = MONTH(CURRENT_DATE()) 
       AND YEAR(start_time) = YEAR(CURRENT_DATE())`,
      [tenantId],
    );
    return parseFloat(rows[0].total_revenue);
  }

  // 2. Conteo de citas por estado (Para el gráfico de tarta)
  static async getAppointmentsByStatus(tenantId) {
    const [rows] = await db.execute(
      `SELECT status, COUNT(*) AS count 
       FROM appointments 
       WHERE tenant_id = ? 
       AND MONTH(start_time) = MONTH(CURRENT_DATE()) 
       AND YEAR(start_time) = YEAR(CURRENT_DATE())
       GROUP BY status`,
      [tenantId],
    );
    return rows;
  }

  // 3. Rendimiento por trabajador (Citas atendidas este mes)
  static async getWorkerPerformance(tenantId) {
    const [rows] = await db.execute(
      `SELECT u.first_name, u.last_name, COUNT(a.id) AS total_appointments 
       FROM users u
       LEFT JOIN appointments a ON u.id = a.barber_id 
         AND a.status NOT IN ('cancelled', 'no_show')
         AND MONTH(a.start_time) = MONTH(CURRENT_DATE())
         AND YEAR(a.start_time) = YEAR(CURRENT_DATE())
       WHERE u.tenant_id = ? AND u.role IN ('barber', 'admin')
       GROUP BY u.id`,
      [tenantId],
    );
    return rows;
  }
}

module.exports = Metric;
