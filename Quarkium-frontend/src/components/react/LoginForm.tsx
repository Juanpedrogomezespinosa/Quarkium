// src/components/react/LoginForm.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "../../store/authStore";

// 1. Definimos el esquema de validación con Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

// Extraemos el tipo de TypeScript desde el esquema
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  // 2. Inicializamos react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // 3. Lógica de envío al backend
  const onSubmit = async (data: LoginFormValues) => {
    setApiError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Enviamos los datos validados + el tenant_id fijo por ahora
        body: JSON.stringify({ ...data, tenant_id: 1 }),
      });

      const responseData = await response.json();

      if (!response.ok)
        throw new Error(responseData.error || "Error de autenticación");

      // Zustand guarda el token automáticamente en el localStorage
      setAuth(responseData.token, responseData.role);

      window.location.href = responseData.role === "admin" ? "/admin" : "/book";
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel border border-outline-variant/20 rounded shadow-2xl p-8 md:p-10 relative overflow-hidden group w-full max-w-md">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-surface-tint opacity-5 blur-[80px] rounded-full group-hover:opacity-10 transition-opacity duration-700"></div>

      <h2 className="font-headline text-2xl text-on-surface mb-8 text-center">
        Portal del Cliente
      </h2>

      {apiError && (
        <div className="bg-error/10 text-error p-3 text-xs mb-4 rounded border border-error/20">
          {apiError}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 relative z-10"
      >
        <div className="space-y-1.5">
          <label className="font-label text-[10px] uppercase tracking-widest text-outline">
            Correo Electrónico
          </label>
          <input
            type="email"
            {...register("email")}
            className={`w-full bg-surface-container-low border-b-2 ${
              errors.email
                ? "border-error"
                : "border-outline-variant/30 focus:border-primary"
            } text-on-surface py-3 px-1 transition-all duration-300 placeholder:text-outline/40 placeholder:font-light focus:outline-none`}
            placeholder="cliente@ejemplo.com"
          />
          {errors.email && (
            <p className="text-error text-[10px] mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="font-label text-[10px] uppercase tracking-widest text-outline">
            Contraseña
          </label>
          <input
            type="password"
            {...register("password")}
            className={`w-full bg-surface-container-low border-b-2 ${
              errors.password
                ? "border-error"
                : "border-outline-variant/30 focus:border-primary"
            } text-on-surface py-3 px-1 transition-all duration-300 placeholder:text-outline/40 focus:outline-none`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-error text-[10px] mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="gold-shimmer w-full py-4 rounded-sm text-on-primary-fixed font-label font-bold uppercase tracking-widest text-xs shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-[0.98] transition-all duration-150 mt-4 disabled:opacity-50"
        >
          {isLoading ? "Iniciando Sesión..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}
