// src/components/react/home/ServicesSection.tsx
import React from "react";

export default function ServicesSection() {
  return (
    <section id="servicios" className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <span className="font-label text-primary uppercase tracking-[0.3em] text-xs font-bold block mb-4">
          La Selección
        </span>
        <h2 className="font-headline text-4xl md:text-5xl font-bold">
          Servicios Exclusivos
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
        {/* Service 1 */}
        <div className="md:col-span-8 bg-surface-container-low group relative overflow-hidden rounded-lg border border-outline-variant/10">
          <img
            src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1000&auto=format&fit=crop"
            alt="Corte de autor"
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
          <div className="relative h-full flex flex-col justify-end p-10">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-headline text-3xl font-bold mb-2">
                  El Corte de Autor
                </h3>
                <p className="text-on-surface-variant max-w-md">
                  Confección precisa basada en la forma de la cabeza, textura
                  del cabello y estilo individual. Incluye masaje capilar.
                </p>
              </div>
              <span className="font-headline text-3xl text-primary font-bold">
                25€
              </span>
            </div>
          </div>
        </div>

        {/* Service 2 */}
        <div className="md:col-span-4 bg-surface-container-high p-10 flex flex-col justify-between rounded-lg border border-outline-variant/10">
          <div className="mb-8">
            <span className="material-symbols-outlined text-primary text-4xl mb-6">
              face
            </span>
            <h3 className="font-headline text-2xl font-bold mb-4">
              Arreglo y Perfilado de Barba
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Definición de líneas con navaja libre y aceites premium para un
              acabado nítido e hidratado.
            </p>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-headline text-2xl text-primary font-bold">
              18€
            </span>
            <a
              href="/book"
              className="text-primary font-label text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:text-primary-fixed transition-colors"
            >
              Reservar{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </a>
          </div>
        </div>

        {/* Service 3 */}
        <div className="md:col-span-5 bg-surface-container-high p-10 flex flex-col justify-between rounded-lg border border-outline-variant/10">
          <div className="mb-8">
            <span className="material-symbols-outlined text-primary text-4xl mb-6">
              spa
            </span>
            <h3 className="font-headline text-2xl font-bold mb-4">
              Afeitado con Toalla Caliente
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Ritual tradicional de múltiples pasos con espuma caliente, toallas
              de vapor y bálsamo calmante prensado en frío.
            </p>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-headline text-2xl text-primary font-bold">
              22€
            </span>
            <a
              href="/book"
              className="text-primary font-label text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:text-primary-fixed transition-colors"
            >
              Reservar{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </a>
          </div>
        </div>

        {/* Visual Accent */}
        <div className="md:col-span-7 bg-surface-container-lowest relative overflow-hidden rounded-lg border border-outline-variant/10">
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000&auto=format&fit=crop"
            alt="Herramientas de barbero"
            className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center p-8 glass-panel rounded-sm border border-outline-variant/20">
              <p className="font-serif italic text-lg text-primary">
                "La diferencia entre un buen corte y uno excelente es el último
                cinco por ciento."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
