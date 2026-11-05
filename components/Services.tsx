'use client'
import { Home, Car, Bike, Store, Tractor, Truck, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionHeader from './SectionHeader';

const img = (id: string) => `https://images.unsplash.com/${id}?q=80&w=1000&auto=format&fit=crop`;

const services = [
  {
    icon: Home,
    title: 'Seguro de Hogar',
    description: 'Protección para tu casa, departamento o alquiler ante imprevistos.',
    image: img('photo-1564013799919-ab600027ffc6'),
    bullets: ['Incendio y daños por agua', 'Robo y roturas', 'Responsabilidad civil'],
  },
  {
    icon: Car,
    title: 'Seguro de Auto',
    description: 'Planes a medida con la mejor relación precio–beneficio.',
    image: img('photo-1503376780353-7e6692767b70'),
    badge: 'Cotizar ahora',
    bullets: ['Responsabilidad civil', 'Robo, hurto e incendio', 'Asistencia y grúa'],
  },
  {
    icon: Tractor,
    title: 'Seguro Agrícola',
    description: 'Soluciones para campo, maquinaria y producción.',
    image: img('photo-1500937386664-56d1dfef3854'),
    bullets: ['Protección de cultivos', 'Cobertura de maquinaria', 'Riesgos climáticos'],
  },
  {
    icon: Bike,
    title: 'Seguro de Moto',
    description: 'Coberturas específicas para uso diario o recreativo.',
    image: img('photo-1558981806-ec527fa84c39'),
    bullets: ['Cobertura de RC', 'Robo total y parcial', 'Asistencia mecánica'],
  },
  {
    icon: Store,
    title: 'Seguro de Comercio',
    description: 'Protección integral de tu negocio y su equipamiento.',
    image: img('photo-1441986300917-64674bd600d8'),
    bullets: ['Mercadería y equipos', 'Responsabilidad civil', 'Daños por incendio'],
  },
  {
    icon: Truck,
    title: 'Seguro de Flota',
    description: 'Gestión centralizada para múltiples vehículos.',
    image: img('photo-1601584115197-04ecc0da31d7'),
    bullets: ['Descuentos por volumen', 'Coberturas personalizadas', 'Optimización de costos'],
  },
];

const Services = () => {
  const handleWhatsAppClick = (title: string) => {
    const message = `¡Hola! Estoy interesado en ${title} que vi en su página web.`;
    const whatsappUrl = `https://wa.me/${5492983350597}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Servicios especializados"
          text="Amplia variedad de coberturas para cuidar lo que más te importa."
          action={
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-3 rounded-full bg-navy py-2 pl-6 pr-2 font-bold text-white transition-colors hover:bg-navy-light"
            >
              Cotizar ahora
              <span className="grid h-9 w-9 place-items-center rounded-full bg-turquoise text-navy">
                <ArrowUpRight size={17} />
              </span>
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-2xl bg-navy text-white"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy from-15% via-navy/50 via-70% to-transparent" />

                <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-navy">
                    <Icon size={20} />
                  </span>
                  {service.badge && (
                    <Link
                      href="/cotizar"
                      className="rounded-full bg-turquoise px-4 py-2 text-sm font-bold text-navy transition-colors hover:bg-white"
                    >
                      {service.badge}
                    </Link>
                  )}
                </div>

                <div className="relative p-6">
                  <h3 className="text-2xl md:text-[1.7rem] font-extrabold leading-tight">{service.title}</h3>
                  <p className="mt-2 text-white/75">{service.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.bullets.map((item) => (
                      <li key={item} className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/85">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleWhatsAppClick(service.title)}
                    className="mt-6 flex w-full items-center justify-between border-t border-white/15 pt-4 text-left font-bold"
                  >
                    <span className="flex items-center gap-2">
                      <img src="/assets/icon-whatsapp.png" alt="" className="h-5 w-5" />
                      Solicitar información
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-turquoise text-navy transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight size={18} />
                    </span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
