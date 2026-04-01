// src/components/react/RegisterForm.tsx
import React, { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, tenant_id: 1 }), // Simulamos tenant 1 por ahora
        },
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Error al registrar la cuenta");

      setSuccess(true);
      setTimeout(() => (window.location.href = "/login"), 2500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="relative z-10 w-full max-w-lg bg-surface shadow-2xl overflow-hidden rounded-lg p-12 text-center border border-outline-variant/20">
        <span className="material-symbols-outlined text-primary text-6xl mb-4">
          check_circle
        </span>
        <h2 className="text-2xl font-headline italic text-primary mb-2">
          Bienvenido a Quarkium
        </h2>
        <p className="text-on-surface-variant text-sm">
          Tu perfil se ha creado correctamente. Redirigiendo al portal...
        </p>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 bg-surface shadow-2xl overflow-hidden rounded-lg border border-outline-variant/20">
      {/* Branding/Image Side (Left) */}
      <div className="hidden md:flex flex-col justify-between p-12 bg-surface-container-low border-r border-outline-variant/10 relative">
        <div className="relative z-20">
          <h1 className="text-2xl font-headline italic font-bold text-primary tracking-tight mb-8">
            Quarkium
          </h1>
          <div className="mt-20">
            <h2 className="text-4xl font-headline font-bold leading-tight mb-6">
              Adéntrate en el reino del
              <br />
              <span className="text-primary">Cuidado Magistral.</span>
            </h2>
            <p className="text-on-surface-variant max-w-xs leading-relaxed">
              Una membresía exclusiva para el caballero moderno que valora la
              precisión, la tradición y el arte del corte perfecto.
            </p>
          </div>
        </div>
        <div className="relative z-20 mt-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/30 bg-surface-container-high">
              <img
                className="w-full h-full object-cover opacity-80"
                alt="Maestro Barbero"
                src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=200&auto=format&fit=crop"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">
                Elias Thorne
              </p>
              <p className="text-xs text-outline tracking-wider uppercase">
                Maestro Artesano
              </p>
            </div>
          </div>
        </div>

        {/* Abstract Artistic Background Image */}
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
          <img
            className="w-full h-full object-cover"
            alt="Herramientas de Barbero"
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop"
          />
        </div>
      </div>

      {/* Registration Side (Right) */}
      <div className="p-8 md:p-16 bg-surface flex flex-col justify-center relative">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-2">
              Registro
            </h3>
            <p className="text-on-surface-variant text-sm">
              Paso 01: Creación de Perfil
            </p>
          </div>
          {/* Barber's Blade Progress Bar */}
          <div className="w-24 h-1 bg-surface-container-highest rounded-full blade-progress">
            <div className="h-full w-1/4 gold-gradient"></div>
          </div>
        </div>

        {error && (
          <div className="bg-error/10 text-error p-3 text-xs mb-6 rounded border border-error/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label
                className="block text-xs uppercase tracking-widest text-outline font-semibold"
                htmlFor="first_name"
              >
                Nombre
              </label>
              <input
                className="w-full bg-surface-container-low border-b-2 border-outline-variant/30 focus:border-primary border-t-0 border-x-0 px-0 py-3 text-on-surface placeholder:text-outline/40 focus:ring-0 transition-colors focus:outline-none"
                id="first_name"
                name="first_name"
                type="text"
                placeholder="ALEJANDRO"
                required
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <label
                className="block text-xs uppercase tracking-widest text-outline font-semibold"
                htmlFor="last_name"
              >
                Apellidos
              </label>
              <input
                className="w-full bg-surface-container-low border-b-2 border-outline-variant/30 focus:border-primary border-t-0 border-x-0 px-0 py-3 text-on-surface placeholder:text-outline/40 focus:ring-0 transition-colors focus:outline-none"
                id="last_name"
                name="last_name"
                type="text"
                placeholder="GARCÍA"
                required
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label
                className="block text-xs uppercase tracking-widest text-outline font-semibold"
                htmlFor="email"
              >
                Correo Electrónico
              </label>
              <input
                className="w-full bg-surface-container-low border-b-2 border-outline-variant/30 focus:border-primary border-t-0 border-x-0 px-0 py-3 text-on-surface placeholder:text-outline/40 focus:ring-0 transition-colors focus:outline-none"
                id="email"
                name="email"
                type="email"
                placeholder="alex@sterling.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <label
                className="block text-xs uppercase tracking-widest text-outline font-semibold"
                htmlFor="phone"
              >
                Teléfono
              </label>
              <input
                className="w-full bg-surface-container-low border-b-2 border-outline-variant/30 focus:border-primary border-t-0 border-x-0 px-0 py-3 text-on-surface placeholder:text-outline/40 focus:ring-0 transition-colors focus:outline-none"
                id="phone"
                name="phone"
                type="tel"
                placeholder="+34 600 000 000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              className="block text-xs uppercase tracking-widest text-outline font-semibold"
              htmlFor="password"
            >
              Contraseña de Seguridad
            </label>
            <div className="relative">
              <input
                className="w-full bg-surface-container-low border-b-2 border-outline-variant/30 focus:border-primary border-t-0 border-x-0 px-0 py-3 text-on-surface placeholder:text-outline/40 focus:ring-0 transition-colors focus:outline-none"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••••••"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-start gap-3 py-2">
            <div className="relative flex items-center h-5">
              <input
                className="w-4 h-4 rounded-sm border-outline-variant bg-surface-container-low text-primary focus:ring-primary/20 focus:ring-offset-0"
                id="tos"
                type="checkbox"
                required
              />
            </div>
            <label
              className="text-xs text-on-surface-variant leading-normal"
              htmlFor="tos"
            >
              Acepto los{" "}
              <a
                className="text-primary hover:underline transition-all"
                href="#"
              >
                Términos del Servicio
              </a>{" "}
              y las Reglas de la Sociedad.
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full gold-gradient text-on-primary font-body font-bold py-4 rounded shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all uppercase trackingest text-sm active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? "Creando Perfil..." : "Únete a la Sociedad"}
          </button>
        </form>

        <div className="mt-8 relative z-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant/20"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest text-outline">
            <span className="bg-surface px-4">O regístrate con</span>
          </div>
        </div>

        {/* Cambiado: Flex centrado y un solo botón de Google con max-width */}
        <div className="mt-8 flex justify-center relative z-10">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-outline-variant/30 bg-transparent py-3 px-6 rounded hover:bg-surface-container-low transition-colors group w-full max-w-sm"
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              ></path>
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              ></path>
              <path
                d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              ></path>
            </svg>
            <span className="text-xs font-semibold tracking-wider text-on-surface uppercase">
              Google
            </span>
          </button>
        </div>

        <div className="mt-12 text-center relative z-10">
          <p className="text-sm text-outline">
            ¿Ya eres miembro de la sociedad?{" "}
            <a
              className="text-primary font-bold hover:underline transition-all ml-1"
              href="/login"
            >
              Inicia Sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
