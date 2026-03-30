// backend/src/scripts/seed.js
const bcrypt = require("bcryptjs");
const pool = require("../config/database");
require("dotenv").config();

async function runSeed() {
  try {
    console.log("⏳ Conectando a la base de datos...");

    // Validación de seguridad CRÍTICA
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error("❌ ERROR FATAL DE SEGURIDAD:");
      console.error(
        "Debes definir ADMIN_EMAIL y ADMIN_PASSWORD en tu archivo .env",
      );
      console.error(
        "El script se ha detenido para evitar la creación de usuarios con contraseñas por defecto.",
      );
      process.exit(1);
    }

    // 1. Desactivar validación de Foreign Keys para poder vaciar
    await pool.query("SET FOREIGN_KEY_CHECKS = 0;");

    // 2. Vaciar las tablas en orden
    console.log("🧹 Vaciando tablas...");
    const tables = [
      "payments",
      "appointments",
      "barber_schedules",
      "services",
      "users",
      "tenants",
    ];
    for (const table of tables) {
      await pool.query(`TRUNCATE TABLE ${table};`);
    }

    // 3. Reactivar Foreign Keys
    await pool.query("SET FOREIGN_KEY_CHECKS = 1;");
    console.log("✅ Base de datos reseteada.");

    // 4. Crear el Tenant inicial
    console.log("🌱 Creando Tenant de prueba...");
    const [tenantRes] = await pool.execute(
      `INSERT INTO tenants (name, subdomain) VALUES (?, ?)`,
      ["Quarkium Central", "admin"],
    );
    const tenantId = tenantRes.insertId;

    // 5. Crear el Usuario Admin usando las variables de entorno
    console.log("👑 Creando Perfil de Administrador de forma segura...");
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    await pool.execute(
      `INSERT INTO users (tenant_id, role, first_name, last_name, email, password_hash) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [tenantId, "admin", "Super", "Admin", adminEmail, passwordHash],
    );

    console.log("--------------------------------------------------");
    console.log("🎉 BASE DE DATOS LISTA Y SEGURA 🎉");
    console.log(`Tenant ID: ${tenantId}`);
    console.log(`Email Admin: ${adminEmail}`);
    console.log("Password Admin: [OCULTA POR SEGURIDAD - Revisa tu .env]");
    console.log("--------------------------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error ejecutando el Seed:", error);
    process.exit(1);
  }
}

runSeed();
