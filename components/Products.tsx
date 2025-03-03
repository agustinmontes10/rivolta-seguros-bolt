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



  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#152549] mb-12">
          Nuestras Ofertas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {ofertas && ofertas.map((oferta: any) => (
            <div key={oferta.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <img src={oferta.imagen} alt={oferta.titulo} className="w-full h-auto" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{oferta.tiutlo}</h3>
                <p className="text-gray-600 text-sm mb-2">{oferta.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;