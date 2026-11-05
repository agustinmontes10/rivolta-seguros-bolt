"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Pagination from "./Pagination";
import SectionHeader from "./SectionHeader";

const Products = () => {
  const [ofertas, setOfertas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3); // Número de productos por página

  const fetchOfertas = async () => {
    try {
      const res = await fetch("/api/offers");
      const data = await res.json();
      setOfertas(data.ofertas ?? []);
    } catch (error) {
      console.error("Error loading offers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfertas();
  }, []);

  const handleWhatsAppClick = (title: string, descripcion: string) => {
    const message = `¡Hola! Estoy interesado en la oferta de ${title} que vi en su página web. Descripcion: ${descripcion}`;
    const whatsappUrl = `https://wa.me/${5492983350597}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Obtener los productos actuales
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = ofertas?.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section id="products" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Nuestras ofertas"
          text="Promociones vigentes con nuestras aseguradoras. Consultanos por WhatsApp y te asesoramos."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-navy/10 p-3">
                  <div className="aspect-square rounded-xl bg-navy/5" />
                  <div className="mt-5 h-5 w-2/3 rounded bg-navy/10" />
                  <div className="mt-3 h-4 w-full rounded bg-navy/5" />
                  <div className="mt-6 h-12 rounded-full bg-navy/5" />
                </div>
              ))
            : currentProducts?.map((oferta: any, index: number) => (
                <motion.article
                  key={oferta.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col rounded-2xl border border-navy/10 bg-white p-3 transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(21,37,73,0.35)]"
                >
                  <div className="relative overflow-hidden rounded-xl bg-cream">
                    <div
                      className="aspect-square bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${oferta.imagen})`, backgroundSize: "100% 100%" }}
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-turquoise px-3 py-1 text-xs font-bold text-navy">
                      Oferta
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                    <h3 className="text-xl font-extrabold leading-tight text-navy">{oferta.titulo}</h3>
                    <p className="mt-2 mb-6 text-sm text-navy/60">{oferta.descripcion}</p>
                    <button
                      className="mt-auto flex items-center justify-between border-t border-navy/10 pt-4 font-bold text-navy"
                      onClick={() => handleWhatsAppClick(oferta.titulo, oferta.descripcion)}
                    >
                      <span className="flex items-center gap-2">
                        <img src="/assets/icon-whatsapp.png" alt="" className="h-5 w-5" />
                        Más información
                      </span>
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-white transition-transform duration-300 group-hover:rotate-45">
                        <ArrowUpRight size={18} />
                      </span>
                    </button>
                  </div>
                </motion.article>
              ))}
        </div>

        {!loading && !ofertas?.length && (
          <p className="text-center text-navy/60">No hay ofertas disponibles en este momento.</p>
        )}

        {ofertas?.length > productsPerPage && (
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={ofertas?.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </section>
  );
};

export default Products;
