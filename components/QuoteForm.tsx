"use client";

import { useEffect, useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Coverages from "@/app/cotizar/components/StepCoverages";
import { FormDataType } from "@/types";
import StepSimple from "@/app/cotizar/components/StepSimple";
import ProgressBar from "@/app/cotizar/components/ProgressBar";
import { fieldClass, labelClass, optionClass } from "@/app/cotizar/components/styles";

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
          <div className="flex flex-col gap-4">
            <label className={labelClass}>
              Marca del vehículo
            </label>

            {brandInput ?
              <input
                className={fieldClass}
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
                className={`${fieldClass} ${error ? "border-red-500" : ""}`}
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
                className={fieldClass}
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
                  className={`${fieldClass} ${error ? "border-red-500" : ""
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
                  className={fieldClass}
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
                    className={`${fieldClass} ${error ? "border-red-500" : ""
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
          <div className="flex flex-col gap-4">
            <label className={labelClass}>
              ¿El vehículo tiene gas?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: false, label: "No" },
                { value: true, label: "Sí" },
              ].map((option) => (
                <label key={option.label} className={`${optionClass(formData.gas === option.value)} flex items-center gap-3`}>
                  <input
                    type="radio"
                    name="gas"
                    checked={formData.gas === option.value}
                    onChange={() => {
                      setError("");
                      setFormData({ ...formData, gas: option.value });
                    }}
                    className="h-5 w-5 accent-[#3ec1d3]"
                  />
                  <span className="text-lg font-extrabold">{option.label}</span>
                </label>
              ))}
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
      className="rounded-3xl border border-navy/10 bg-white p-6 shadow-[0_40px_80px_-40px_rgba(21,37,73,0.3)] outline-none md:p-10"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <ProgressBar progress={progress} step={formData.step} totalSteps={totalSteps} />

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

      <div className="mt-10 flex items-center justify-between border-t border-navy/10 pt-6">
        {formData.step > 1 && (
          <button
            onClick={handlePrevious}
            className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-5 py-3 font-bold text-navy transition-colors hover:bg-cream"
          >
            <ArrowLeft size={18} />
            Anterior
          </button>
        )}
        {formData.step < totalSteps ? (
          <button
            onClick={handleNext}
            className="ml-auto inline-flex items-center gap-3 rounded-full bg-turquoise py-2 pl-6 pr-2 font-bold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Siguiente
            <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-white">
              <ArrowRight size={17} />
            </span>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="ml-auto inline-flex items-center gap-3 rounded-full bg-navy py-2 pl-6 pr-2 font-bold text-white transition-colors hover:bg-navy-light"
          >
            Enviar cotización
            <span className="grid h-9 w-9 place-items-center rounded-full bg-turquoise text-navy">
              <ArrowUpRight size={17} />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
