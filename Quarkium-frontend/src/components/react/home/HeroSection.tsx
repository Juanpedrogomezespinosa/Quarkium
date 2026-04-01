// src/components/react/home/HeroSection.tsx
import React from "react";

export default function HeroSection() {
  return (
    <header className="relative min-h-[calc(100vh-5rem)] w-full flex items-center justify-center overflow-hidden border-b border-outline-variant/20">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop"
          alt="Sillón de barbero vintage"
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center max-w-5xl px-6">
        <h1 className="font-headline font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-6 text-on-surface text-glow">
          Ingeniería de Precisión para el{" "}
          <span className="italic text-primary">Caballero Moderno.</span>
        </h1>
        <p className="font-body text-xl md:text-2xl text-on-surface-variant mb-12 max-w-2xl mx-auto leading-relaxed">
          Cortes expertos, afeitados artesanales y una atención inquebrantable
          al detalle en un entorno de atelier seleccionado.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a
            href="/book"
            className="gold-shimmer text-on-primary px-10 py-4 rounded-sm font-label font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform text-center w-full md:w-auto"
          >
            Reserva tu Espacio
          </a>
          <a
            href="#servicios"
            className="bg-transparent border border-outline/30 text-on-surface px-10 py-4 rounded-sm font-label font-bold uppercase tracking-widest text-sm hover:bg-surface-container-high transition-colors text-center w-full md:w-auto"
          >
            Explorar Servicios
          </a>
        </div>
      </div>
    </header>
  );
}
