'use client'
import { Home, Car, Bike, Store, Tractor, Truck, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import '@/styles/services.scss';
import Link from 'next/link';

const services = [
  {
    icon: Home,
    title: 'Seguro de Hogar',
    description: 'Protección para tu casa, departamento o alquiler ante imprevistos.',
    bullets: [
      'Incendio y daños por agua',
      'Robo y roturas',
      'Responsabilidad civil',
    ],
  },
  {
    icon: Car,
    title: 'Seguro de Auto',
    description: 'Planes a medida con la mejor relación precio–beneficio.',
    badge: 'Cotizar ahora',
    bullets: [
      'Responsabilidad civil',
      'Robo, hurto e incendio',
      'Asistencia y grúa',
    ],
  },
  {
    icon: Tractor,
    title: 'Seguro Agrícola',
    description: 'Soluciones para campo, maquinaria y producción.',
    bullets: [
      'Protección de cultivos',
      'Cobertura de maquinaria',
      'Riesgos climáticos',
    ],
  },
  {
    icon: Bike,
    title: 'Seguro de Moto',
    description: 'Coberturas específicas para uso diario o recreativo.',
    bullets: [
      'Cobertura de RC',
      'Robo total y parcial',
      'Asistencia mecánica',
    ],
  },
  {
    icon: Store,
    title: 'Seguro de Comercio',
    description: 'Protección integral de tu negocio y su equipamiento.',
    bullets: [
      'Mercadería y equipos',
      'Responsabilidad civil',
      'Daños por incendio',
    ],
  },
  {
    icon: Truck,
    title: 'Seguro de Flota',
    description: 'Gestión centralizada para múltiples vehículos.',
    bullets: [
      'Descuentos por volumen',
      'Coberturas personalizadas',
      'Optimización de costos',
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, when: 'beforeChildren' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 110, damping: 18 } },
};

const Services = () => {

  const handleWhatsAppClick = (title: string) => {
    const message = `¡Hola! Estoy interesado en ${title} que vi en su página web.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${5492983350597}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#152549]">Servicios Especializados</h2>
          <p className="text-gray-600 mt-2">Amplia variedad de coberturas para cuidar lo que más te importa.</p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 relative card"
                variants={itemVariants}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              >
                {service.badge && (
                  <Link href="/cotizar" className="bg-[#3ec1d3] text-white px-4 py-2 rounded-md hover:bg-[#36adbf] absolute right-4 top-4 text-sm">
                  {service.badge}
                  </Link>
                )}
                <motion.div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#e6f7fa] mb-4" animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
                  <Icon className="w-6 h-6 text-[#3ec1d3]" />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#152549] mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-4">
                  {service.bullets.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-[#3ec1d3] mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contacto" className="inline-flex items-center text-[#152549] font-semibold group" onClick={() => { handleWhatsAppClick(service.title) }}>
                  <img src="/assets/icon-whatsapp.png" alt="" className="w-[20px]" />
                  <span className="mx-2">Solicitar información</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;