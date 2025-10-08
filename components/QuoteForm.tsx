"use client";

import { useEffect, useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
// import Lottie from 'lottie-react';
import dynamic from "next/dynamic";
import Coverages from "@/app/cotizar/components/StepCoverages";
import { FormDataType } from "@/types";
import StepSimple from "@/app/cotizar/components/StepSimple";
import ProgressBar from "@/app/cotizar/components/ProgressBar";
import { version } from "node:os";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MELI_ACCESS_TOKEN;

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormDataType>({
    step: 1,
    marca: "",
    modelo: "",
    version: "",
    año: null,
    patente: "",
    gas: false,
    nombre: "",
    codigoPostal: "",
    email: "",
    telefono: "",
    tipoSeguro: "",
    subscribeNewsletter: true,
  });

  const [error, setError] = useState("");
  const [animationData, setAnimationData] = useState(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [versions, setVersions] = useState([]);
  const [disabled, setDisabled] = useState({
    brand: false,
    model: true,
    version: true,
  });
  const [brandInput, setBrandInput] = useState(false);
  const [modelInput, setModelInput] = useState(false);
  const [versionInput, setVersionInput] = useState(false);
  
  const animData = () => {
    fetch("/assets/carAnimation.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  };

  const getBrands = async () => {
    setDisabled({ brand: true, model: true, version: true });
    const res = await fetch('/api/brands');
    const { data } = await res.json();
    setBrands(data);
    setDisabled({
      brand: false,
      model: true,
      version: true,
    });
  };

  const getModels = async (brand: string) => {
    if (!brand) return;
    setDisabled({ brand: true, model: true, version: true });

    const res = await fetch(`/api/models?brand=${encodeURIComponent(brand)}`);
    const { data } = await res.json();
    if(data && data.length === 0) setModels([]); else setModels(data);
    setDisabled({ brand: false, model: false, version: true });
  };

  const getVersions = async (model: string) => {
    if (!model) return;
    setDisabled({ brand: true, model: true, version: true });
    const res = await fetch(
      `/api/versions?brand=${encodeURIComponent(formData.marca)}&model=${encodeURIComponent(model)}`
    );
    const { data } = await res.json();
    if(data && data.length === 0) setVersions([]); else setVersions(data);
    setDisabled({ brand: false, model: false, version: false });
  };



  const totalSteps = 9;
  const progress = (formData.step / totalSteps) * 100;

  const validateCurrentStep = () => {
    const formKeys = [
      "step",
      "marca",
      "año",
      "patente",
      "gas",
      "nombre",
      "codigoPostal",
      "email",
      "telefono",
      "tipoSeguro",
    ] as const;
    const currentValue = formData[formKeys[formData.step]] as string;

    if (formData.step == 1) {
      const modeloValue = formData.modelo;
      const versionValue = formData.version;
      if (!modeloValue || !versionValue) {
        setError("Por favor seleccione una marca, modelo y versión");
        return false;
      }
    }
    // Skip validation for gas step (step 4) since it's a boolean
    if (formData.step !== 4 && !currentValue) {
      setError("Este campo es requerido");
      return false;
    }
    const currentYear = new Date().getFullYear();
    if (formData.step === 2 && (formData.año! < 1950 || formData.año! > currentYear)) {
      setError("Año invalido");
      return false;
    }
    if (formData.step === 6) {
      // Validación para código postal argentino
      // Formatos válidos: 1000, B7000, C1000ABC
      const postalCodeRegex = /^(\d{4}|[A-Z]\d{4}|[A-Z]\d{4}[A-Z]{3})$/;
      const codigoPostal = formData.codigoPostal.toUpperCase().trim();
      
      if (!postalCodeRegex.test(codigoPostal)) {
        setError("Por favor ingrese un código postal válido (ej: 1000, B7000 o C1000ABC)");
        return false;
      }
      
      // Actualizar el valor formateado
      if (codigoPostal !== formData.codigoPostal) {
        setFormData({ ...formData, codigoPostal: codigoPostal });
      }
    }
    if (formData.step === 7 && !formData.email.includes("@")) {
      setError("Por favor ingrese un email válido");
      return false;
    }
    if (formData.step === 8 && formData.telefono.length < 8) {
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
    console.log('formData', formData)
  };

  const handlePrevious = () => {
    if (formData.step > 1) {
      setError("");
      setFormData((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      // Formato del mensaje más limpio y estructurado
      const message = `Nueva Cotización
        Marca: ${formData.marca}
        Modelo: ${formData.modelo}
        Versión: ${formData.version}
        Año: ${formData.año}
        Patente: ${formData.patente}
        Gas: ${formData.gas ? 'Sí' : 'No'}
        Nombre: ${formData.nombre}
        Código Postal: ${formData.codigoPostal}
        Email: ${formData.email}
        Teléfono: ${formData.telefono}
        Tipo de Seguro: ${formData.tipoSeguro}`;

        handleWhatsAppClick(message);

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

  // Manejador de eventos para la tecla Enter
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (formData.step < totalSteps) {
        handleNext();
      } else {
        handleSubmit();
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
    animData();
    getBrands();
  }, []);

  const handleWhatsAppClick = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${5492983350597}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const renderStep = () => {
    switch (formData.step) {
      case 1:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              Marca del vehículo
            </label>

            {brandInput ?
              <input
                className="w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent"
                placeholder="Especificar marca"
                onChange={(e) => {
                  setFormData({ ...formData, marca: e.target.value });
                }}
              />
              :
              brands?.length
              ? <select
                disabled={disabled.brand}
                value={formData.marca}
                onChange={(e) => {
                  if (e.target.value === 'otra') {
                    setBrandInput(true)
                    setModelInput(true);
                    setVersionInput(true);
                  }
                  else {
                    setError("");
                    setFormData({
                      ...formData,
                      marca: e.target.value,
                      version: "",
                      modelo: ""
                    });
                    setModels([]);
                    getModels(e.target.value);
                  }
                }}
                className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${error ? "border-red-500" : ""}`}
              >
                <option value="">Seleccionar Marca</option>
                {brands.map((brand: string) => (
                  <option
                    id={brand}
                    key={brand}
                    value={brand}
                    data-id={brand}
                  >
                    {brand}
                  </option>
                ))}
                <option value="otra">Otra</option>
              </select>
              : <div className="loader" />
            }
            
            {modelInput ? 
              <input
                className="w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent"
                placeholder="Especificar modelo"
                onChange={(e) => {
                  setFormData({ ...formData, modelo: e.target.value });
                }}
              />
            :
              formData.marca == '' 
              ? ''
              : (models && models.length
                ? <select
                  disabled={disabled.model}
                  value={formData.modelo}
                  onChange={(e) => {
                    if (e.target.value === 'otra') {
                      setModelInput(true)
                      setVersionInput(true)
                    }
                    else {
                      setError("");
                      setFormData({ ...formData, modelo: e.target.value, version: "" });
                      setVersions([]);
                      getVersions(e.target.value);
                    }
                  }}
                  className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${error ? "border-red-500" : ""
                    }`}
                >
                  <option value="">Seleccionar Modelo</option>
                  {models.map((model: string) => (
                    <option
                      id={model}
                      key={model}
                      value={model}
                      data-id={model}
                    >
                      {model}
                    </option>
                  ))}
                  <option value="otra">Otra</option>
                </select>
                : <div className="loader" />
              )
            }

            {/* VERSION */}
            {versionInput
              ? <input
                  className="w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent"
                  placeholder="Especificar versión"
                  onChange={(e) => {
                    setFormData({ ...formData, version: e.target.value });
                  }}
                />
              : formData.modelo == ''
                ? ''
                : (versions && versions.length ?
                  <select
                    disabled={disabled.version}
                    value={formData.version}
                    onChange={(e) => {
                      (e.target.value === 'otra')
                      ? setVersionInput(true)
                      : setError("");
                        setFormData({ ...formData, version: e.target.value });
                    }}
                    className={`w-full md:w-1/2 p-3 border border-[#152549] rounded-md focus:ring-2 focus:ring-[#3ec1d3] focus:border-transparent ${error ? "border-red-500" : ""
                      }`}
                  >
                    <option value="">Seleccionar Versión</option>
                    {versions.map((version: string) => (
                      <option key={version} value={version}>
                        {version}
                      </option>
                    ))}
                    <option value="otra">Otra</option>
                  </select>
                  : <div className="loader" />
                )

            }
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case 2:
        return (
          <StepSimple
            label="Año del vehículo"
            stepName={"año"}
            typeInput={"number"}
            placeholder="2020"
            formData={formData}
            setFormData={setFormData}
            error={error}
            setError={setError}
          />
        );
      case 3:
        return (
          <StepSimple
            label="Patente"
            stepName={"patente"}
            typeInput={"text"}
            placeholder="ABC123"
            formData={formData}
            setFormData={setFormData}
            error={error}
            setError={setError}
          />
        );
      case 4:
        return (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <label className="block text-lg font-medium text-[#152549]">
              ¿El vehículo tiene gas?
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gas"
                  checked={!formData.gas}
                  onChange={() => {
                    setError("");
                    setFormData({ ...formData, gas: false });
                  }}
                  className="mr-2 h-4 w-4 text-[#3ec1d3] focus:ring-[#3ec1d3] border-[#152549]"
                />
                <span className="text-[#152549] font-medium">No</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gas"
                  checked={formData.gas}
                  onChange={() => {
                    setError("");
                    setFormData({ ...formData, gas: true });
                  }}
                  className="mr-2 h-4 w-4 text-[#3ec1d3] focus:ring-[#3ec1d3] border-[#152549]"
                />
                <span className="text-[#152549] font-medium">Sí</span>
              </label>
            </div>
          </div>
        );
      case 5:
        return (
          <StepSimple
            label="Nombre y Apellido"
            stepName={"nombre"}
            typeInput={"text"}
            placeholder="Juan Perez"
            formData={formData}
            setFormData={setFormData}
            error={error}
            setError={setError}
          />
        );
      case 6:
        return (
          <StepSimple
            label="Código Postal"
            stepName={"codigoPostal"}
            typeInput={"text"}
            placeholder="1000, B7000 o C1000ABC"
            formData={formData}
            setFormData={setFormData}
            error={error}
            setError={setError}
          />
        );

      case 7:
        return (
          <StepSimple
            label="Email"
            stepName={"email"}
            typeInput={"email"}
            placeholder="juan@email.com"
            formData={formData}
            setFormData={setFormData}
            error={error}
            setError={setError}
          />
        );
      case 8:
        return (
          <StepSimple
            label="Teléfono"
            stepName={"telefono"}
            typeInput={"tel"}
            placeholder="+54 11 1234-5678"
            formData={formData}
            setFormData={setFormData}
            error={error}
            setError={setError}
          />
        );
      case 9:
        return (
          <Coverages
            formData={formData}
            setFormData={setFormData}
            error={error}
            yearVehicle={formData.año as number}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white p-8 rounded-lg shadow-xl shadow-gray-300 mb-8 "
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <ProgressBar animationData={animationData} progress={progress} />

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
