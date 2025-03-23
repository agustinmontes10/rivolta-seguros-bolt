import React from 'react';
import '@/styles/insurers.scss';

const Insurers = () => {
  const insurers = [
    {
      name: "Aseguradora B",
      logo: "https://branding.123seguro.com/logotypes/insurers/gray/seguros-galeno.svg",
    },
    {
      name: "Aseguradora B",
      logo: "https://branding.123seguro.com/logotypes/insurers/gray/seguros-sancor.svg",
    },
    {
      name: "Aseguradora B",
      logo: "https://branding.123seguro.com/logotypes/insurers/gray/seguros-san-cristobal.svg",
    },
    {
      name: "Aseguradora C",
      logo: "https://branding.123seguro.com/logotypes/insurers/gray/seguros-provincia.svg",
    },
    {
      name: "Aseguradora D",
      logo: "https://branding.123seguro.com/logotypes/insurers/gray/seguros-mercantil.svg",
    },
    {
      name: "Aseguradora D",
      logo: "https://branding.123seguro.com/logotypes/insurers/gray/seguros-zurich.svg",
    },    {
      name: "Aseguradora D",
      logo: "https://branding.123seguro.com/logotypes/insurers/gray/seguros-mapfre.svg",
    },
  ];

  return (
    <section id="insurers" className="py-20 bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#152549] mb-12">
          Nuestras Aseguradoras
        </h2>
        <div className="insurers-banner">
          <div className="insurers-track">
            {insurers.map((insurer, index) => (
              <div
                key={index}
                className="insurer-card"
              >
                <img
                  src={insurer.logo}
                  alt={insurer.name}
                  className="max-w-full h-auto"
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