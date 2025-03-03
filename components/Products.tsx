"use client"
import { useEffect, useState } from "react";

const Products = () => {
  const [ofertas, setOfertas] = useState<any[]>([])

  const fetchOfertas = async () => {
    const res = await fetch("/api/offers");
    const data = await res.json();
    setOfertas(data.ofertas);
    // return data.ofertas;
  };

  useEffect(() => {
    fetchOfertas();
  }, []);


  const sendMessage = (titulo: string, descripcion: string) => {
    const message = `
        ¡Hola! Estoy interesado en la oferta de ${titulo} que vi en su página web.
        Descripcion: ${descripcion}`;

    const whatsappUrl = `https://wa.me/2983569503?text=${encodeURIComponent(
      message
    )}`;
    // if (isClient) {
    window.open(whatsappUrl, "_blank");
    // }
  }


  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#152549] mb-12">
          Nuestras Ofertas
        </h2>
        <div className="flex overflow-x-auto space-x-8 pt-4 pb-8">
          {ofertas && ofertas.map((oferta: any) => (
            <div key={oferta.id} className="flex-none w-64 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="h-60 bg-no-repeat bg-contain bg-center" style={{ backgroundImage: `url(${oferta.imagen})` }}></div>
              <div className="p-4 flex flex-col justify-between h-40">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{oferta.titulo}</h3>
                  <p className="text-gray-600 text-sm mb-2">{oferta.descripcion}</p>
                </div>
                <button className="bg-green-500 flex items-center gap-3 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => sendMessage(oferta.titulo, oferta.descripcion)}>
                  Mas información
                  <img src="/assets/icon-whatsapp.png" alt="" className="w-[30px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;