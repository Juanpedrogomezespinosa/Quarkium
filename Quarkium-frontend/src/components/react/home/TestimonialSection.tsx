// src/components/react/home/TestimonialSection.tsx
import React from "react";

export default function TestimonialSection() {
  return (
    <section className="bg-surface-container-lowest py-32 border-y border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="font-label text-primary uppercase tracking-[0.3em] text-xs font-bold block mb-4">
              Reputación
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-8">
              Avalado por la <span className="italic">Vanguardia</span>
            </h2>

            <div className="flex items-center gap-4 mb-12">
              <div className="flex text-primary">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              </div>
              <span className="font-headline text-xl font-bold text-on-surface">
                4.9 en Google
              </span>
              <span className="text-on-surface-variant">(1,240 Reseñas)</span>
            </div>

            <div className="space-y-12">
              <blockquote className="relative">
                <span className="font-headline text-6xl text-primary/10 absolute -top-8 -left-4">
                  "
                </span>
                <p className="font-serif italic text-xl text-on-surface-variant relative z-10">
                  "He ido a barberías por todo el mundo, desde Londres hasta
                  Tokio. La precisión aquí es inigualable. No es solo un corte
                  de pelo, es una restauración."
                </p>
                <footer className="mt-4 font-label text-xs uppercase tracking-widest text-primary font-bold">
                  Javier V. — Inversor
                </footer>
              </blockquote>
              <blockquote className="relative">
                <span className="font-headline text-6xl text-primary/10 absolute -top-8 -left-4">
                  "
                </span>
                <p className="font-serif italic text-xl text-on-surface-variant relative z-10">
                  "El afeitado con toalla caliente es una experiencia casi
                  espiritual. La atención al entorno y a la técnica es evidente
                  desde el segundo en que entras por la puerta."
                </p>
                <footer className="mt-4 font-label text-xs uppercase tracking-widest text-primary font-bold">
                  Marcos T. — Arquitecto
                </footer>
              </blockquote>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop"
              alt="Barbero trabajando"
              className="rounded-lg h-80 w-full object-cover mt-12 border border-outline-variant/10"
            />
            <img
              src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=800&auto=format&fit=crop"
              alt="Interior de la barbería"
              className="rounded-lg h-80 w-full object-cover border border-outline-variant/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
