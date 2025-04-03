"use client";

import React, { useEffect, useRef } from 'react';
import '@/styles/insurers.scss';


const Insurers = () => {
  const insurers = [
    {
      name: "Galeno Seguros",
      logo: "https://branding.123seguro.com/logotypes/insurers/gray/seguros-galeno.svg",
    },
    {
      name: "Sancor Seguros",
      logo: "https://branding.123seguro.com/logotypes/insurers/gray/seguros-sancor.svg",
    },
    {
      name: "San Cristóbal Seguros",
      logo: "https://branding.123seguro.com/logotypes/insurers/gray/seguros-san-cristobal.svg",
    },
    {
      name: "Provincia Seguros",
      logo: "https://branding.123seguro.com/logotypes/insurers/gray/seguros-provincia.svg",
    },
    {
      name: "Mercantil Seguros",
      logo: "https://branding.123seguro.com/logotypes/insurers/gray/seguros-mercantil.svg",
    },
    {
      name: "Zurich Seguros",
      logo: "/assets/logos/logoZurich.svg",
    },
    {
      name: "Mapfre Seguros",
      logo: "https://branding.123seguro.com/logotypes/insurers/gray/seguros-mapfre.svg",
    },
    {
      name: "Integrity Seguros",
      logo: "/assets/logos/logoIntegrity.svg",
    },
  ];

  // Referencia para ajustar la animación basada en el número de elementos
  const trackRef = useRef<HTMLDivElement>(null);

  // Ajustar la animación basada en el ancho real de los elementos
  useEffect(() => {
    const updateAnimation = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const root = document.documentElement;
        root.style.setProperty('--track-width', `${trackWidth / 2}px`);
      }
    };

    // Actualizar cuando cambie el tamaño de la ventana
    updateAnimation();
    window.addEventListener('resize', updateAnimation);

    return () => {
      window.removeEventListener('resize', updateAnimation);
    };
  }, []);

  return (
    <section id="insurers" className="py-20 bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#152549] mb-12">
          Nuestras Aseguradoras
        </h2>
        <div className="insurers-banner">
          <div className="insurers-track" ref={trackRef}>
            {/* Primera copia de los logos para el carrusel infinito */}
            {insurers.map((insurer, index) => (
              <div
                key={`first-${index}`}
                className="insurer-card"
              >
                <img
                  src={insurer.logo}
                  alt={insurer.name}
                  className="max-w-full h-auto"
                  title={insurer.name}
                />
              </div>
            ))}

            {/* Segunda copia de los logos para el carrusel infinito */}
            {insurers.map((insurer, index) => (
              <div
                key={`second-${index}`}
                className="insurer-card"
              >
                <img
                  src={insurer.logo}
                  alt={insurer.name}
                  className="max-w-full h-auto"
                  title={insurer.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insurers;