"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Insurers from "./Insurers";

// Versión optimizada de /assets/hero-new.jpg (2400px)
const HERO_IMAGE = "/assets/hero-new-web.jpg";

const WHATSAPP_URL = `https://wa.me/5492983350597?text=${encodeURIComponent(
  "¡Hola! Quisiera hacer una consulta sobre seguros."
)}`;

const ease = [0.22, 1, 0.36, 1];

const Intro = () => {
  const [oferta, setOferta] = useState<any>(null);

  useEffect(() => {
    fetch("/api/offers")
      .then((res) => res.json())
      .then((data) => setOferta(data?.ofertas?.[0] ?? null))
      .catch(() => setOferta(null));
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-navy text-white">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease }}
        className="absolute inset-0 bg-cover bg-[25%_center] md:bg-[center_20%]"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/40 to-navy/10" />

      {/* Contenido */}
      <div className="relative z-10 flex h-full flex-col">
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-12 px-4 pb-8 pt-28 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="max-w-4xl text-5xl font-extrabold leading-[0.98] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Tu seguridad es nuestra prioridad.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-6 max-w-xl text-lg text-white/80 md:text-xl"
          >
            Encuentra el seguro perfecto para tu vehículo con las mejores coberturas y precios del mercado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="/cotizar"
              className="inline-flex items-center gap-3 rounded-full bg-turquoise py-2 pl-6 pr-2 text-base font-bold text-navy transition-colors hover:bg-white"
            >
              Cotizar ahora
              <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-white">
                <ArrowUpRight size={18} />
              </span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/30 py-2 pl-2 pr-6 text-base font-semibold text-white transition-colors hover:bg-white hover:text-navy"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                <img src="/assets/icon-whatsapp.png" alt="" className="h-5 w-5" />
              </span>
              Hablar por WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Oferta destacada */}
        <div className="hidden lg:col-span-4 lg:flex lg:justify-end">
          {oferta && (
            <motion.a
              href="#products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease }}
              className="group block w-72 rounded-2xl bg-white p-3 text-navy shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] xl:w-80"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={oferta.imagen}
                  alt={oferta.titulo}
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-turquoise px-3 py-1 text-xs font-bold text-navy">
                  Oferta destacada
                </span>
              </div>
              <div className="px-1 pb-1 pt-4">
                <p className="text-lg font-extrabold leading-tight">{oferta.titulo}</p>
                {oferta.descripcion && (
                  <p className="mt-1 line-clamp-2 text-sm text-navy/60">{oferta.descripcion}</p>
                )}
                <div className="mt-4 flex items-center justify-between border-t border-navy/10 pt-3 text-sm font-bold">
                  Ver ofertas
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-white transition-transform group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </motion.a>
          )}
        </div>
      </div>

      {/* Aseguradoras */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7, ease }}
        className="py-5 md:py-6"
      >
        <Insurers />
      </motion.div>
      </div>
    </section>
  );
};

export default Intro;
