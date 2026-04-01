// src/components/react/LoginForm.tsx
import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, tenant_id: 1 }), // Simulamos que estamos en el tenant 1
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Error de autenticación");

      setAuth(data.token, data.role);

      // Redirigir al dashboard según el rol
      window.location.href = data.role === "admin" ? "/admin" : "/book";
    } catch (err: any) {
      setError(err.message);
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

      {error && (
        <div className="bg-error/10 text-error p-3 text-xs mb-4 rounded border border-error/20">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="space-y-1.5">
          <label className="font-label text-[10px] uppercase tracking-widest text-outline">
            Correo Electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-surface-container-low border-b-2 border-outline-variant/30 focus:border-primary text-on-surface py-3 px-1 transition-all duration-300 placeholder:text-outline/40 placeholder:font-light focus:outline-none"
            placeholder="cliente@ejemplo.com"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-label text-[10px] uppercase tracking-widest text-outline">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-surface-container-low border-b-2 border-outline-variant/30 focus:border-primary text-on-surface py-3 px-1 transition-all duration-300 placeholder:text-outline/40 focus:outline-none"
            placeholder="••••••••"
          />
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
