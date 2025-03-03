"use client";

// import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Intro = () => {

  const [homeAnimation, setHomeAnimation] = useState(null);
  
    useEffect(() => {
      fetch('/assets/homeAnimation.json')
        .then(response => response.json())
        .then(data => setHomeAnimation(data))
        .catch(error => console.error('Error loading animation:', error));
    }, []);
  
  
  return (
    <>
    <section className="flex flex-col justify-around intro-section flex items-center justify-center text-white pt-16">
    <div className="flex justify-center md:justify-start">
  {/* Lottie animation (visible on medium screens and larger) */}
  <div className="hidden md:flex items-center justify-center z-0 pointer-events-none">
    {homeAnimation && <Lottie animationData={homeAnimation} style={{ height: '40vw', maxHeight: '400px' }} />}
  </div>

  {/* Text content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-center md:text-left">
    <h1 className="text-4xl md:text-[3vw] font-bold mb-6 z-10 relative">
      Tu seguridad es nuestra prioridad
    </h1>
    <p className="text-xl md:text-[2vw] mb-8 max-w-3xl z-10 relative">
      Encuentra el seguro perfecto para tu vehículo con las mejores coberturas y precios del mercado.
    </p>
  </div>
</div>

    <a
    href="/cotizar"
    className="inline-block bg-[#3ec1d3] text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-[#36adbf] transition-colors"
  >
    Cotizar ahora
  </a>
    </section>
    </>
  );
};

export default Intro;