"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const stats = [
  { value: "+26", label: "años de experiencia" },
  { value: "1998", label: "brindando asesoramiento" },
  { value: "9", label: "aseguradoras líderes" },
  { value: "6", label: "tipos de cobertura" },
];

const features = [
  {
    title: "Asesoramiento personalizado",
    description: "Te ayudamos a elegir la póliza ideal.",
    image: img("photo-1556761175-5973dc0f32e7", 400),
  },
  {
    title: "Pólizas a medida",
    description: "Coberturas adaptadas a tus necesidades.",
    image: img("photo-1450101499163-c8848c66ca85", 400),
  },
  {
    title: "Gestión integral de siniestros",
    description: "Acompañamiento en todo el proceso.",
    image: img("photo-1449965408869-eaa3f722e40d", 400),
  },
  {
    title: "Las mejores coberturas del mercado",
    description: "Seguridad con aseguradoras líderes.",
    image: img("photo-1521791136064-7986c2920216", 400),
  },
];

const ease = [0.22, 1, 0.36, 1];

const AboutUs = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="about" className="bg-cream">
      {/* Bloque principal */}
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src={img("photo-1573167243872-43c6433b9d40", 1400)}
                alt="Equipo de trabajo"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-navy p-6 text-white sm:right-auto sm:max-w-xs">
              <span className="block h-1 w-10 rounded-full bg-turquoise" />
              <p className="mt-4 text-xl font-extrabold leading-snug">
                Tranquilidad y confianza en la protección de tus bienes.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <h2 className="text-4xl font-extrabold leading-[1.02] text-navy sm:text-5xl lg:text-6xl">
              Sobre nosotros
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-navy/70">
              Somos productores y asesores de seguros con más de 26 años de experiencia, brindando asesoramiento integral en protección patrimonial. Desde 1998, trabajamos con las compañías líderes del mercado, garantizando a nuestros clientes tranquilidad y confianza en la protección de sus bienes.
            </p>
            <p className="mt-4 leading-relaxed text-navy/60">
              Nuestro compromiso es ofrecer soluciones personalizadas adaptadas a cada necesidad, con el respaldo de aseguradoras de primer nivel y un servicio de atención de excelencia.
            </p>

            <dl className="mt-10 grid grid-cols-2 border-t border-navy/15">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`border-b border-navy/15 py-6 ${i % 2 === 0 ? "pr-6 border-r" : "pl-6"}`}
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-4xl font-extrabold text-navy md:text-5xl">{stat.value}</span>
                    <span className="mt-1 block text-sm text-navy/60">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>

      {/* Lo que nos diferencia */}
      <div className="bg-navy text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-14 px-4 py-24 sm:px-6 md:py-32 lg:grid-cols-12 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-5"
          >
            <h2 className="text-4xl font-extrabold leading-[1.02] sm:text-5xl lg:text-6xl">
              Lo que nos diferencia
            </h2>
            <p className="mt-6 max-w-md text-lg text-white/70">
              Soluciones personalizadas con el respaldo de aseguradoras de primer nivel.
            </p>
            <Link
              href="/cotizar"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-turquoise py-2 pl-6 pr-2 font-bold text-navy transition-colors hover:bg-white"
            >
              Cotizar ahora
              <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-white">
                <ArrowUpRight size={17} />
              </span>
            </Link>
          </motion.div>

          <ol className="lg:col-span-7">
            {features.map((feature, i) => (
              <li
                key={feature.title}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`flex cursor-default items-center gap-6 border-t border-white/15 py-7 transition-opacity duration-300 last:border-b ${
                  active === i ? "opacity-100" : "opacity-40"
                }`}
              >
                <span className="w-10 shrink-0 text-lg font-extrabold text-turquoise">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-extrabold md:text-2xl">{feature.title}</h3>
                  <p className="mt-1 text-white/70">{feature.description}</p>
                </div>
                <div className="hidden h-20 w-28 shrink-0 overflow-hidden rounded-xl sm:block">
                  <img
                    src={feature.image}
                    alt=""
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-500 ${active === i ? "scale-100" : "scale-110"}`}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
