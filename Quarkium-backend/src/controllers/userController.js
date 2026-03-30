// backend/src/controllers/userController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.createWorker = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password } = req.body;

    // Extraemos el tenant_id del token del Admin (¡Magia del SaaS!)
    const tenantId = req.user.tenant_id;

    // 1. Verificar si el email ya existe en este negocio
    const existingUser = await User.findByEmailAndTenant(email, tenantId);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "El email ya está registrado en este local." });
    }

    // 2. Hashear la contraseña por defecto que el Admin le da al trabajador
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 3. Crear el usuario forzando el rol 'barber'
    const workerId = await User.create({
      tenant_id: tenantId,
      role: "barber",
      first_name,
      last_name,
      email,
      phone,
      password_hash,
    });

    res.status(201).json({
      message: "Trabajador creado con éxito",
      worker: { id: workerId, first_name, email, role: "barber" },
    });
  } catch (error) {
    console.error("Error creando trabajador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
