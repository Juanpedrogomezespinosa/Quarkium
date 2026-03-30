# 🚀 Quarkium - SaaS Integral de Reservas y Gestión

Quarkium es una plataforma SaaS (Software as a Service) multi-tenant diseñada para digitalizar y automatizar negocios basados en citas (peluquerías, clínicas, consultorías). Combina un motor de reservas en tiempo real, pagos integrados y un asistente virtual impulsado por IA.

## ✨ Funcionalidades Principales

- **Multi-Tenant (SaaS):** Arquitectura de base de datos diseñada para alojar múltiples negocios de forma aislada y segura.
- **Motor de Reservas Inteligente:** Gestión de citas, duraciones variables, tiempos de _buffer_ y control de conflictos (dobles reservas).
- **Chatbot IA (WhatsApp):** Integración con OpenAI vía _Function Calling_ para consultar disponibilidad y gestionar reservas en lenguaje natural sin exponer datos de la BD.
- **Pagos Online (Stripe):** Cobro de señas obligatorias, retención de cancelaciones tardías y protección contra _no-shows_.
- **Dashboard Administrativo:** Paneles diferenciados con RBAC (Control de Acceso Basado en Roles) para Dueños (Admin), Trabajadores (Barber) y Clientes.

## 🛠️ Stack Tecnológico

- **Frontend:** Astro, React, Tailwind CSS v4, Zustand, TanStack Query.
- **Backend:** Node.js, Express, MySQL 2, Zod, JWT, Bcryptjs.
- **Integraciones:** OpenAI API, Stripe API, Meta/Twilio Cloud API.

## 🚀 Instalación y Despliegue Local

El proyecto está dividido en dos directorios principales: `frontend` y `backend`.

### 1. Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [MySQL](https://dev.mysql.com/downloads/) (v8.0 o superior)

### 2. Configurar Base de Datos

1. Abre tu gestor de base de datos (ej. MySQL Workbench).
2. Ejecuta el script SQL proporcionado en los documentos de arquitectura para crear la base de datos `quarkium` y sus tablas.

### 3. Instalación del Backend

```bash
cd backend
npm install
```
