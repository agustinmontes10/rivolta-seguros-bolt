"use client";

// import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });


const Contact = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailAnimation, setEmailAnimation] = useState(null);

  useEffect(() => {
      fetch("/assets/emailAnimation.json")
        .then((response) => response.json())
        .then((data) => setEmailAnimation(data))
        .catch((error) => console.error("Error loading animation:", error));
  }, []);

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
      console.log("response:", response);
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
    <section id="contact" className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Mantente Informado</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter para recibir las últimas novedades y
            ofertas especiales
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center items-center">
              {emailAnimation && (
                <Lottie
                  animationData={emailAnimation}
                  style={{ width: 200, height: 200 }}
                />
              )}
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Tu correo electrónico"
                className={`w-full px-4 py-3 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-200 ${
                  status === "error" ? "ring-2 ring-red-500" : ""
                }`}
                required
                disabled={status === "loading"}
                aria-invalid={status === "error"}
                aria-describedby={
                  status === "error" ? "error-message" : undefined
                }
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-secondary text-white px-6 py-3 rounded-md font-semibold hover:bg-[#36adbf] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Suscribiendo...
                </span>
              ) : (
                "Suscribirse"
              )}
            </button>
          </form>

          {status === "success" && (
            <div className="mt-4 text-center text-secondary font-medium animate-fadeIn">
              ¡Gracias por suscribirte! 🎉
            </div>
          )}

          {status === "error" && (
            <div
              id="error-message"
              role="alert"
              className="mt-4 text-center text-red-400 font-medium animate-fadeIn"
            >
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
