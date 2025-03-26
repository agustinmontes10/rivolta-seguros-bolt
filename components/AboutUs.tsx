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
              Somos productores y asesores de seguros con más de 26 años de experiencia, brindando asesoramiento integral en protección patrimonial. Desde 1998, trabajamos con las compañías líderes del mercado, garantizando a nuestros clientes tranquilidad y confianza en la protección de sus bienes.
            </p>
            <p className="text-gray-600 mb-4">
              Nuestro compromiso es ofrecer soluciones personalizadas adaptadas a cada necesidad, con el respaldo de aseguradoras de primer nivel y un servicio de atención de excelencia.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><span className="font-semibold">Asesoramiento personalizado</span> <span className="text-gray-500 text-sm">– Te ayudamos a elegir la póliza ideal.</span></li>
              <li><span className="font-semibold">Pólizas a medida</span> <span className="text-gray-500 text-sm">– Coberturas adaptadas a tus necesidades.</span></li>
              <li><span className="font-semibold">Gestión integral de siniestros</span> <span className="text-gray-500 text-sm">– Acompañamiento en todo el proceso.</span></li>
              <li><span className="font-semibold">Las mejores coberturas del mercado</span> <span className="text-gray-500 text-sm">– Seguridad con aseguradoras líderes.</span></li>
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
