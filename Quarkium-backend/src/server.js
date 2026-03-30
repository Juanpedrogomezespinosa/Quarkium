const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

// Inicializar la app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares Globales
app.use(helmet()); // Seguridad en cabeceras HTTP
app.use(cors()); // Permitir peticiones del frontend Astro/React

// IMPORTANTE: Stripe Webhooks necesitan el body en crudo (raw), no en JSON.
// Configurar JSON parser solo para rutas que no sean webhooks de Stripe.
app.use((req, res, next) => {
  if (req.originalUrl === "/api/v1/webhooks/stripe") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Rutas base (Placeholder)
app.get("/api/v1/health", (req, res) => {
  res
    .status(200)
    .json({ status: "OK", message: "SaaS Peluquería API funcionando 🚀" });
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(
    `🚀 Servidor corriendo en modo ${process.env.NODE_ENV} en el puerto ${PORT}`,
  );
});
