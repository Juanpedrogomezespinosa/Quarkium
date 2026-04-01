// src/components/react/home/CtaSection.tsx
import React from "react";

export default function CtaSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="bg-surface-container p-12 md:p-24 rounded-lg relative overflow-hidden text-center border border-outline-variant/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8">
            Toma Tu Asiento.
          </h2>
          <p className="font-body text-lg text-on-surface-variant mb-12 max-w-xl mx-auto">
            Operamos bajo un estricto sistema de reservas para asegurar que cada
            cliente reciba nuestra maestría sin interrupciones.
          </p>
          <a
            href="/book"
            className="inline-block gold-shimmer text-on-primary px-12 py-5 rounded-sm font-label font-bold uppercase tracking-[0.2em] text-sm hover:scale-105 transition-transform"
          >
            Programar una Cita
          </a>
        </div>
      </div>
    </section>
  );
}
