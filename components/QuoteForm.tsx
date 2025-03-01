"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import Lottie from 'lottie-react';
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    step: 1,
    marca: "",
    modelo: "",
    version: "",
    año: "",
    patente: "",
    nombre: "",
    email: "",
    telefono: "",
    tipoSeguro: "",
    subscribeNewsletter: true,
  });

  const [error, setError] = useState("");
  const [animationData, setAnimationData] = useState(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [brands, setBrands] = useState([]);
  const [currentBrandId, setCurrentBrandId] = useState("");
  const [models, setModels] = useState([]);
  const [currentModelId, setCurrentModelId] = useState("");
  const [versions, setVersions] = useState([]);
  const [disabled, setDisabled] = useState({
    brand: false,
    model: true,
    version: true,
  });

  const animData = () => {
    fetch("/assets/carAnimation.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  };

  const getBrands = () => {
    setDisabled({ brand: true, model: true, version: true });
    fetch("https://api.mercadolibre.com/sites/MLA/search?category=MLA1744")
      .then((response) => response.json())
      .then((data) => {
        const brands = data.available_filters.find(
          (filter: any) => filter.id === "BRAND"
        ).values;
        setBrands(brands);
        setDisabled({
          brand: false,
          model: currentBrandId ? false : true,
          version: true,
        });
        console.log(brands, "brandsData");
      })
      .catch((error) => console.error("Error:", error));
  };

  const getModels = (brandId: string) => {
    console.log(brandId, "brandId");
    if (!brandId) return;
    setDisabled({ brand: true, model: true, version: true });
    fetch(
      `https://api.mercadolibre.com/sites/MLA/search?category=MLA1744&brand=${brandId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const models = data.available_filters.find(
          (filter: any) => filter.id === "MODEL"
        ).values;
        setModels(models);
        setDisabled({ brand: false, model: false, version: true });
        console.log(models, "modelsData");
      })
      .catch((error) => console.error("Error:", error));
  };

  const getVersions = (brandId: string, modelId: string) => {
    if (!brandId || !modelId) return;
    setDisabled({ brand: true, model: true, version: true });
    fetch(
      `https://api.mercadolibre.com/sites/MLA/search?category=MLA1744&brand=${brandId}&model=${modelId}`
    )
      .then((response) => response.json())
      .then((data) => {
        let versions = data.available_filters.find(
          (filter: any) => filter.id === "SHORT_VERSION"
        );
        if (versions) {
          versions = versions.values;
        } else {
          versions = [{ name: "otra" }];
        }
        setVersions(versions);
        setDisabled({ brand: false, model: false, version: false });
        console.log(data.available_filters, "versionsData");
      })
      .catch((error) => console.error("Error:", error));
  };

  const totalSteps = 7;
  const progress = (formData.step / totalSteps) * 100;

  const validateCurrentStep = () => {
    const formKeys = [
      "step",
      "marca",
      "modelo",
      "año",
      "patente",
      "nombre",
      "email",
      "telefono",
      "tipoSeguro",
    ] as const;
    const currentValue = formData[formKeys[formData.step]] as string;
    if (!currentValue) {
      setError("Este campo es requerido");
      return false;
    }
    if (formData.step === 5 && !formData.email.includes("@")) {
      setError("Por favor ingrese un email válido");
      return false;
    }
    if (formData.step === 6 && formData.telefono.length < 8) {
      setError("Por favor ingrese un número de teléfono válido");
      return false;
    }
    setError("");
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep() && formData.step < totalSteps) {
      setFormData((prev) => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const handlePrevious = () => {
    if (formData.step > 1) {
      setError("");
      setFormData((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      const message = `
        Nueva Cotización
        Marca: ${formData.marca}
        Modelo: ${formData.modelo}
        Versión: ${formData.version}
        Año: ${formData.año}
        Patente: ${formData.patente}
        Nombre: ${formData.nombre}
        Email: ${formData.email}
        Teléfono: ${formData.telefono}
        Tipo de Seguro: ${formData.tipoSeguro}
      `;

      const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(
        message
      )}`;
      if (isClient) {
        window.open(whatsappUrl, "_blank");
      }

      // Si el usuario tildó el checkbox, enviamos los datos a Google Sheets
      if (formData.subscribeNewsletter) {
        try {
          const response = await fetch("/api/saveEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email.trim(),
              name: formData.nombre.trim(),
            }),
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Error al suscribirse");
          }

          console.log("Suscripción exitosa:", data);
        } catch (error) {
          console.error("Error al suscribir:", error);
        }
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
    animData();
    getBrands();
  }, []);

  useEffect(() => {
    getModels(currentBrandId);
  }, [currentBrandId]);

  useEffect(() => {
    getVersions(currentBrandId, currentModelId);
  }, [currentBrandId, currentModelId]);

  const renderStep = () => {
    switch (formData.step) {
      case 1:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Marca del vehículo
            </label>
            {/* BRAND */}
            <select
              disabled={disabled.brand}
              value={formData.marca}
              onChange={(e) => {
                setError("");
                const selectedOption = e.target.selectedOptions[0];
                const selectedBrandId = selectedOption.dataset.id;
                setFormData({
                  ...formData,
                  marca: e.target.value,
                  version: "",
                });
                setCurrentBrandId(selectedBrandId ?? "");
                console.log(selectedBrandId, "brandId", brands);
                getModels(selectedBrandId ?? "");
                // setFormData({ ...formData, version: '' });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? "border-red-500" : ""
              }`}
            >
              <option value="">Seleccionar Marca</option>
              {brands.map((brand: any) => (
                <option
                  id={brand.id}
                  key={brand.id}
                  value={brand.name}
                  data-id={brand.id}
                >
                  {brand.name}
                </option>
              ))}
            </select>
            {/* MODEL */}
            <select
              disabled={disabled.model}
              value={formData.modelo}
              onChange={(e) => {
                setError("");
                const selectedOption = e.target.selectedOptions[0];
                const selectedBrandId = selectedOption.dataset.id;
                setFormData({ ...formData, modelo: e.target.value });
                setCurrentModelId(selectedBrandId ?? "");
                getVersions(currentBrandId, selectedBrandId ?? "");
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? "border-red-500" : ""
              }`}
            >
              <option value="">Seleccionar Modelo</option>
              {models.map((model: any) => (
                <option
                  id={model.id}
                  key={model.id}
                  value={model.name}
                  data-id={model.id}
                >
                  {model.name}
                </option>
              ))}
            </select>
            {/* VERSION */}
            <select
              disabled={disabled.version}
              value={formData.version}
              onChange={(e) => {
                setError("");
                setFormData({ ...formData, version: e.target.value });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? "border-red-500" : ""
              }`}
            >
              <option value="">Seleccionar Versión</option>
              {versions.map((version: any) => (
                <option key={version.id} value={version.name}>
                  {version.name}
                </option>
              ))}
            </select>
            {formData.version === "otra" && (
              <input
                className="w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent"
                placeholder="Especificar versión"
              />
            )}
            {/* <input
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
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>} */}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Año del vehículo
            </label>
            <input
              type="number"
              value={formData.año}
              onChange={(e) => {
                setError("");
                setFormData({ ...formData, año: e.target.value });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? "border-red-500" : ""
              }`}
              placeholder="Ej: 2020"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Patente
            </label>
            <input
              type="text"
              value={formData.patente}
              onChange={(e) => {
                setError("");
                setFormData({ ...formData, patente: e.target.value });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? "border-red-500" : ""
              }`}
              placeholder="Ej: ABC123"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Nombre y Apellido
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => {
                setError("");
                setFormData({ ...formData, nombre: e.target.value });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? "border-red-500" : ""
              }`}
              placeholder="Ej: Juan Pérez"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setError("");
                setFormData({ ...formData, email: e.target.value });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? "border-red-500" : ""
              }`}
              placeholder="Ej: juan@email.com"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 6:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Teléfono
            </label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => {
                setError("");
                setFormData({ ...formData, telefono: e.target.value });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? "border-red-500" : ""
              }`}
              placeholder="Ej: +54 11 1234-5678"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 7:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Tipo de Seguro
            </label>
            <select
              value={formData.tipoSeguro}
              onChange={(e) => {
                setError("");
                setFormData({ ...formData, tipoSeguro: e.target.value });
              }}
              className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${
                error ? "border-red-500" : ""
              }`}
            >
              <option value="">Seleccionar tipo de seguro</option>
              <option value="Terceros básico">Terceros básico</option>
              <option value="Terceros completo">Terceros completo</option>
              <option value="Todo riesgo">Todo riesgo</option>
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            {/* Checkbox para suscribirse al newsletter */}
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="subscribeNewsletter"
                checked={formData.subscribeNewsletter || false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subscribeNewsletter: e.target.checked,
                  })
                }
                className="w-4 h-4 text-[#3ec1d3] border-gray-300 rounded focus:ring-[#3ec1d3]"
              />
              <label
                htmlFor="subscribeNewsletter"
                className="text-sm text-gray-600"
              >
                Mantente informado. Suscríbete a nuestro newsletter para recibir
                las últimas novedades y ofertas especiales.
              </label>
            </div>
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
            style={{ transform: "translateY(-65%) translateX(-75%)" }}
          >
            {animationData && (
              <Lottie
                animationData={animationData}
                style={{ width: 120, height: 120 }}
              />
            )}
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
}
