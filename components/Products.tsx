"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Pagination from "./Pagination";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Products = () => {
  const [ofertas, setOfertas] = useState<any[]>([]);
  const [animationData, setAnimationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3); // Número de productos por página

  const fetchOfertas = async () => {
    const res = await fetch("/api/offers");
    const data = await res.json();
    setOfertas(data.ofertas);
  };

  const animData = () => {
    fetch("/assets/loadingOffers1.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  };

  useEffect(() => {
    fetchOfertas();
    animData();
  }, []);

  const sendMessage = (titulo: string, descripcion: string) => {
    // Formato del mensaje más limpio y directo
    const message = `¡Hola! Estoy interesado en la oferta de ${titulo} que vi en su página web. Descripcion: ${descripcion}`;

    // Número de teléfono sin el signo + para mayor compatibilidad
    const phoneNumber = "5492983350597";

    // Detectar si es dispositivo móvil
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    let whatsappUrl;

    if (isMobile) {
      // En dispositivos móviles, intentar abrir directamente la app de WhatsApp
      whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    } else {
      // En escritorio, usar WhatsApp Web que funciona de manera más confiable con mensajes prearmados
      whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}&app_absent=0`;
    }

    // Abrimos en una nueva pestaña
    window.open(whatsappUrl, "_blank");
  };

  // Obtener los productos actuales
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = ofertas.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#152549] mb-12">
          Nuestras Ofertas
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-10 pt-4 pb-8 justify-center">
          {currentProducts.length ? currentProducts.map((oferta: any) => (
            <div key={oferta.id} className="flex-none w-4/5 md:w-64 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-60 bg-no-repeat bg-center" style={{ backgroundImage: `url(${oferta.imagen})`, backgroundSize: '100% 100%' }}></div>
              <div className="p-4 flex flex-col justify-between h-40">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{oferta.titulo}</h3>
                  <p className="text-gray-600 text-sm mb-2">{oferta.descripcion}</p>
                </div>
                <button className="flex items-center gap-3 text-gray-200 font-medium py-2 px-4 rounded mt-2 bg-[#152549]" onClick={() => sendMessage(oferta.titulo, oferta.descripcion)}>
                  Mas información
                  <img src="/assets/icon-whatsapp.png" alt="" className="w-[30px]" />
                </button>
              </div>
            </div>
          ))
            : (
              <div className="flex justify-center items-center h-[200px]">
                <Lottie
                  animationData={animationData}
                  style={{ width: "100%" , height:"100%"}}
                />
              </div>
            )}
        </div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={ofertas.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
};

export default Products;