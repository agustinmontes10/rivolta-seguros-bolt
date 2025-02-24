"use client";

import { useState } from 'react';
import QuoteForm from '@/components/QuoteForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Cotizar() {
  const [formData, setFormData] = useState({
    step: 1,
    marca: '',
    modelo: '',
    año: '',
    patente: '',
    nombre: '',
    email: '',
    telefono: '',
    tipoSeguro: '',
  });

  const handleComplete = (data: any) => {
    const message = `
      *Nueva Cotización*
      Marca: ${data.marca}
      Modelo: ${data.modelo}
      Año: ${data.año}
      Patente: ${data.patente}
      Nombre: ${data.nombre}
      Email: ${data.email}
      Teléfono: ${data.telefono}
      Tipo de Seguro: ${data.tipoSeguro}
    `;

    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-center text-[#152549] mb-3">
            Cotiza tu seguro
          </h1>
          <QuoteForm onComplete={handleComplete} />
        </div>
      </main>
      <Footer />
    </div>
  );
}