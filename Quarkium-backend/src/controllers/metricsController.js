// backend/src/controllers/metricsController.js
const Metric = require("../models/Metric");

exports.getDashboardMetrics = async (req, res) => {
  try {
    const tenantId = req.user.tenant_id;

    // Ejecutamos las 3 consultas SQL al mismo tiempo con Promise.all para máxima velocidad
    const [revenue, statusCounts, workerPerformance] = await Promise.all([
      Metric.getMonthlyRevenue(tenantId),
      Metric.getAppointmentsByStatus(tenantId),
      Metric.getWorkerPerformance(tenantId),
    ]);

    // Formateamos la respuesta para que el Frontend (Zustand/Recharts) lo digiera fácil
    res.json({
      current_month: {
        revenue: revenue,
        appointments_by_status: statusCounts,
        worker_performance: workerPerformance,
      },
    });
  } catch (error) {
    console.error("Error obteniendo métricas del dashboard:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
