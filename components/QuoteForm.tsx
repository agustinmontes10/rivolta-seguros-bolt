"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

export default function QuoteForm() {
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

  const [error, setError] = useState('');
  const [animationData, setAnimationData] = useState(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch('/assets/carAnimation.json')
        .then(response => response.json())
        .then(data => setAnimationData(data))
        .catch(error => console.error('Error loading animation:', error));
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, [])
  

  const totalSteps = 8;
  const progress = (formData.step / totalSteps) * 100;

  const validateCurrentStep = () => {
    const formKeys = ['step', 'marca', 'modelo', 'año', 'patente', 'nombre', 'email', 'telefono', 'tipoSeguro'] as const;
    const currentValue = formData[formKeys[formData.step]] as string;
    if (!currentValue) {
      setError('Este campo es requerido');
      return false;
    }
    if (formData.step === 6 && !formData.email.includes('@')) {
      setError('Por favor ingrese un email válido');
      return false;
    }
    if (formData.step === 7 && formData.telefono.length < 8) {
      setError('Por favor ingrese un número de teléfono válido');
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep() && formData.step < totalSteps) {
      setFormData(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const handlePrevious = () => {
    if (formData.step > 1) {
      setError('');
      setFormData(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      
        const message = `
          *Nueva Cotización*
          Marca: ${formData.marca}
          Modelo: ${formData.modelo}
          Año: ${formData.año}
          Patente: ${formData.patente}
          Nombre: ${formData.nombre}
          Email: ${formData.email}
          Teléfono: ${formData.telefono}
          Tipo de Seguro: ${formData.tipoSeguro}
        `;
    
        const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
        if (isClient) {
          window.open(whatsappUrl, '_blank');
        }
      
    }
  };

  const renderStep = () => {
    switch (formData.step) {
      case 1:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Marca del vehículo
            </label>
            <input
              type="text"
              value={formData.marca}
              onChange={(e) => {
                setError('');
                setFormData({ ...formData, marca: e.target.value });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? 'border-red-500' : ''
              }`}
              placeholder="Ej: Toyota"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
        );
      case 2:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Modelo del vehículo
            </label>
            <input
              type="text"
              value={formData.modelo}
              onChange={(e) => {
                setError('');
                setFormData({ ...formData, modelo: e.target.value });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? 'border-red-500' : ''
              }`}
              placeholder="Ej: Corolla"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Año del vehículo
            </label>
            <input
              type="number"
              value={formData.año}
              onChange={(e) => {
                setError('');
                setFormData({ ...formData, año: e.target.value });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? 'border-red-500' : ''
              }`}
              placeholder="Ej: 2020"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Patente
            </label>
            <input
              type="text"
              value={formData.patente}
              onChange={(e) => {
                setError('');
                setFormData({ ...formData, patente: e.target.value });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? 'border-red-500' : ''
              }`}
              placeholder="Ej: ABC123"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Nombre completo
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => {
                setError('');
                setFormData({ ...formData, nombre: e.target.value });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? 'border-red-500' : ''
              }`}
              placeholder="Ej: Juan Pérez"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 6:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setError('');
                setFormData({ ...formData, email: e.target.value });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? 'border-red-500' : ''
              }`}
              placeholder="Ej: juan@email.com"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 7:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Teléfono
            </label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => {
                setError('');
                setFormData({ ...formData, telefono: e.target.value });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? 'border-red-500' : ''
              }`}
              placeholder="Ej: +54 11 1234-5678"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 8:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Tipo de Seguro
            </label>
            <select
              value={formData.tipoSeguro}
              onChange={(e) => {
                setError('');
                setFormData({ ...formData, tipoSeguro: e.target.value });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? 'border-red-500' : ''
              }`}
            >
              <option value="">Seleccionar tipo de seguro</option>
              <option value="Terceros básico">Terceros básico</option>
              <option value="Terceros completo">Terceros completo</option>
              <option value="Todo riesgo">Todo riesgo</option>
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl shadow-gray-300 mb-8">
      <div className="mb-8 mt-3">
        <div className="h-2 bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-[#3ec1d3] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="relative mt-2">
          <motion.div
            className="absolute"
            initial={{ left: 0 }}
            animate={{ left: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{ transform: 'translateY(-65%) translateX(-75%)' }}
          >
            {animationData && <Lottie animationData={animationData} style={{ width: 120, height: 120 }} />}
          </motion.div>
        </div>
      </div>

      <motion.div
        key={formData.step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        {renderStep()}
      </motion.div>

      <div className="flex justify-between mt-8">
        {formData.step > 1 && (
          <button
            onClick={handlePrevious}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Anterior
          </button>
        )}
        {formData.step < totalSteps ? (
          <button
            onClick={handleNext}
            className="ml-auto px-6 py-2 bg-[#3ec1d3] text-white rounded-md hover:bg-[#36adbf] transition-colors"
          >
            Siguiente
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="ml-auto px-6 py-2 bg-[#152549] text-white rounded-md hover:bg-[#1a2d5a] transition-colors"
          >
            Enviar Cotización
          </button>
        )}
      </div>
    </div>
  );
};