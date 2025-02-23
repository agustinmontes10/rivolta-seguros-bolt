"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

const Intro = () => {

  const [homeAnimation, setHomeAnimation] = useState(null);
  
    useEffect(() => {
      fetch('/assets/homeAnimation.json')
        .then(response => response.json())
        .then(data => setHomeAnimation(data))
        .catch(error => console.error('Error loading animation:', error));
    }, []);
  
  
  return (
    <section className="intro-section flex items-center justify-center text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 z-10 relative">
          Tu seguridad es nuestra prioridad
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto z-10 relative">
          Encuentra el seguro perfecto para tu vehículo con las mejores coberturas y precios del mercado.
        </p>
        <div className="absolute inset-0 flex items-center justify-start z-0">
          {homeAnimation && <Lottie animationData={homeAnimation} style={{ width: 400, height: 400 }} />}
        </div>
        <a
          href="/cotizar"
          className="inline-block bg-[#3ec1d3] text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-[#36adbf] transition-colors"
        >
          Cotizar ahora
        </a>
      </div>
    </section>
  );
};

export default Intro;