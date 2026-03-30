// src/models/User.js
const db = require("../config/database");

class User {
  static async findByEmailAndTenant(email, tenantId) {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ? AND tenant_id = ?",
      [email, tenantId],
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  static async create({
    tenant_id,
    role,
    first_name,
    last_name,
    email,
    phone,
    password_hash,
  }) {
    const [result] = await db.execute(
      `INSERT INTO users (tenant_id, role, first_name, last_name, email, phone, password_hash) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [tenant_id, role, first_name, last_name, email, phone, password_hash],
    );
    return result.insertId;
  }

  static async updateProfile(id, { first_name, last_name, password_hash }) {
    if (password_hash) {
      await db.execute(
        "UPDATE users SET first_name = ?, last_name = ?, password_hash = ? WHERE id = ?",
        [first_name, last_name, password_hash, id],
      );
    } else {
      await db.execute(
        "UPDATE users SET first_name = ?, last_name = ? WHERE id = ?",
        [first_name, last_name, id],
      );
    }
  }
}

module.exports = User;
