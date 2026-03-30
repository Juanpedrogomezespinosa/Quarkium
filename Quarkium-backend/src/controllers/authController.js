// src/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const {
      tenant_id,
      first_name,
      last_name,
      email,
      phone,
      password,
      role = "client",
    } = req.body;

    const existingUser = await User.findByEmailAndTenant(email, tenant_id);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "El email ya está registrado en este negocio." });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const userId = await User.create({
      tenant_id,
      role,
      first_name,
      last_name,
      email,
      phone,
      password_hash,
    });

    res.status(201).json({ message: "Usuario registrado con éxito", userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, tenant_id } = req.body;

    const user = await User.findByEmailAndTenant(email, tenant_id);
    if (!user)
      return res.status(404).json({ error: "Credenciales inválidas." });

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword)
      return res.status(401).json({ error: "Credenciales inválidas." });

    const token = jwt.sign(
      { id: user.id, role: user.role, tenant_id: user.tenant_id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.json({ message: "Login exitoso", token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { first_name, last_name, password } = req.body;
    const userId = req.user.id;

    let password_hash = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      password_hash = await bcrypt.hash(password, salt);
    }

    await User.updateProfile(userId, { first_name, last_name, password_hash });

    res.json({ message: "Perfil actualizado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error actualizando perfil" });
  }
};
