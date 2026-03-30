// backend/src/middlewares/auth.js
const jwt = require("jsonwebtoken");

// 1. Verifica que el usuario tenga un token válido
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Inyecta { id, role, tenant_id } en la request
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido o expirado." });
  }
};

// 2. Verifica si el rol del usuario está permitido en esa ruta
exports.requireRole = (allowedRoles) => {
  return (req, res, next) => {
    // Si no hay usuario en la request, o su rol no está en el array de permitidos, bloqueamos.
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Prohibido. No tienes permisos para realizar esta acción.",
      });
    }
    next();
  };
};
