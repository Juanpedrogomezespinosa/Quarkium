// backend/src/server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/v1/auth");
const userRoutes = require("./routes/v1/users");
const serviceRoutes = require("./routes/v1/services");
const tenantRoutes = require("./routes/v1/tenants");
const scheduleRoutes = require("./routes/v1/barberSchedule");
const appointmentRoutes = require("./routes/v1/appointments");
const metricsRoutes = require("./routes/v1/metrics");

require("dotenv").config();

// Iniciamos la conexión a la base de datos
require("./config/database");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares Globales
app.use(helmet());
app.use(cors());
app.use(express.json()); // Parsea los body en JSON

// Ruta de prueba
app.get("/api/v1/health", (req, res) => {
  res
    .status(200)
    .json({ status: "OK", message: "API Quarkium funcionando 🚀" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/tenants", tenantRoutes);
app.use("/api/v1/schedules", scheduleRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/metrics", metricsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`);
});
