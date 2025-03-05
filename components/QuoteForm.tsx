"use client";

import { useEffect, useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
// import Lottie from 'lottie-react';
import dynamic from "next/dynamic";
import Coverages from "@/app/cotizar/components/StepCoverages";
import { FormDataType } from "@/types";
import StepSimple from "@/app/cotizar/components/StepSimple";
import ProgressBar from "@/app/cotizar/components/ProgressBar";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormDataType>({
    step: 1,
    marca: "",
    modelo: "",
    version: "",
    año: null,
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
      "año",
      "patente",
      "nombre",
      "email",
      "telefono",
      "tipoSeguro",
    ] as const;
    const currentValue = formData[formKeys[formData.step]] as string;

    if(formData.step == 1) {
      const modeloValue = formData.modelo;
      const versionValue = formData.version;
      if (!modeloValue || !versionValue) {
        setError("Por favor seleccione una marca, modelo y versión");
        return false;
      }
    }
    console.log('currentValue', currentValue);
    console.log('step', formData.step)
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
      case 5:
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
      case 6:
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
      case 7:
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
      className="bg-white p-8 rounded-lg shadow-xl shadow-gray-300 mb-8"
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
