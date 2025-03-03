"use client"
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });


const AboutUs = () => {

  const [animationData, setAnimationData] = useState(null);


  const animData = () => {
    fetch("/assets/aboutUsAnimation.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  };

  useEffect(() => {
    animData();
  }, []);

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#152549] mb-6">
              Sobre Nosotros
            </h2>
            <p className="text-gray-600 mb-4">
              Somos una empresa líder en el mercado de seguros con más de 15 años de experiencia. Nos especializamos en brindar las mejores soluciones de protección para tu vehículo.
            </p>
            <p className="text-gray-600 mb-4">
              Nuestro compromiso es ofrecer un servicio personalizado y de calidad, trabajando con las aseguradoras más reconocidas del mercado para garantizar tu tranquilidad.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Asesoramiento personalizado</li>
              <li>Atención 24/7</li>
              <li>Gestión integral de siniestros</li>
              <li>Las mejores coberturas del mercado</li>
            </ul>
          </div>
          <div>
            {animationData && (
                <Lottie
                  animationData={animationData}
                  
                />
              )}
            {/* <img
              src="https://images.unsplash.com/photo-1573167243872-43c6433b9d40?q=80&w=2069&auto=format&fit=crop"
              alt="Equipo de trabajo"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;