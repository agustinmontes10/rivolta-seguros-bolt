"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const CTA_IMAGE =
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2200&auto=format&fit=crop";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setErrorMessage("Por favor, ingresa un email válido.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/saveEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al procesar la solicitud");
      }

      setStatus("success");
      setEmail("");
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "Ha ocurrido un error.");
      console.error("Error al suscribir:", error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  return (
    <section id="contact" className="bg-cream px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[76rem] overflow-hidden rounded-3xl bg-navy text-white"
      >
        <img
          src={CTA_IMAGE}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/80" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center md:py-28">
          <h2 className="text-4xl font-extrabold leading-[1.02] sm:text-5xl lg:text-7xl">
            Mantente informado
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/75">
            Suscríbete a nuestro newsletter para recibir las últimas novedades y ofertas especiales
          </p>

          <form
            onSubmit={handleSubmit}
            className={`mt-10 flex w-full max-w-lg flex-col gap-2 rounded-3xl bg-white p-2 sm:flex-row sm:rounded-full ${
              status === "error" ? "ring-2 ring-red-400" : ""
            }`}
          >
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Tu correo electrónico"
              className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3 text-navy placeholder:text-navy/40 focus:outline-none"
              required
              disabled={status === "loading"}
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? "error-message" : undefined}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-turquoise px-6 py-3 font-bold text-navy transition-colors hover:bg-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Suscribiendo...
                </>
              ) : (
                <>
                  Suscribirse
                  <ArrowUpRight size={18} />
                </>
              )}
            </button>
          </form>

          {status === "success" && (
            <div className="mt-5 font-semibold text-turquoise animate-fadeIn">
              ¡Gracias por suscribirte! 🎉
            </div>
          )}

          {status === "error" && (
            <div id="error-message" role="alert" className="mt-5 font-semibold text-red-300 animate-fadeIn">
              {errorMessage}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
