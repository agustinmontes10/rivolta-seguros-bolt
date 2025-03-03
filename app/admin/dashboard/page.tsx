"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import PopUp from "../components/PopUp";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function OfertaForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [offers, setOffers] = useState<any[]>([]);
  const [offerSelected, setOfferSelected] = useState<any>();
  const [popUpMode, setPopUpMode] = useState<"add" | "edit">("add");

  const handleSubmit = async (e: any, adData: any) => {
    e.preventDefault();
    const { title, description, image } = adData;
    const formData = new FormData();
    formData.append("titulo", title);
    formData.append("descripcion", description);
    if (image) {
      formData.append("imagen", image); // Ensure it's a file
    }
    const res = await fetch("/api/offers", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      getOffers();
      alert("Oferta guardada con éxito!");
    } else {
      alert("Error: " + data.error);
    }
  };

  const getOffers = async () => {
    const { data: offers, error } = await supabase.from("ofertas").select("*");
    setOffers(offers || []);
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Ofertas</h1>
        <button
          onClick={() => {
            setOfferSelected(undefined);
            setPopUpMode("add");
            setVisible(true);
          }}
          className="p-3 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
        >
          Añadir Oferta
        </button>
      </div>
      <div className="overflow-x-auto rounded-md shadow-md">
        <table className="min-w-full bg-gray-800 text-gray-300 rounded-md">
          <thead>
            <tr>
              <th className="py-3 px-5 border-b border-gray-700 text-center">Título</th>
              <th className="py-3 px-5 border-b border-gray-700 text-center">Descripción</th>
              <th className="py-3 px-5 border-b border-gray-700 text-center">Imagen</th>
              <th className="py-3 px-5 border-b border-gray-700 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} className="hover:bg-gray-700 transition duration-200">
                <td className="py-3 px-5 text-center">{offer.titulo}</td>
                <td className="py-3 px-5 text-center">{offer.descripcion}</td>
                <td className="py-3 px-5 text-center">
                  <img
                  src={offer.imagen}
                  alt=""
                  className="h-16 w-16 object-cover mx-auto transition-transform duration-200 hover:scale-150"
                  />
                </td>
                <td className="py-3 px-5 text-center">
                  <button
                    onClick={() => {
                      setPopUpMode("edit");
                      setOfferSelected(offer);
                      setVisible(true);
                    }}
                    className="mr-2 p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition duration-200"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      // Implement delete functionality
                    }}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded transition duration-200"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => supabase.auth.signOut().then(() => router.push("/admin"))}
            className="p-3 bg-red-600 hover:bg-red-700 rounded-md transition duration-200"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {visible ? (
        <PopUp
          onSubmit={(e, adData) => {
            handleSubmit(e, adData);
            setVisible(false);
          }}
          key={popUpMode}
          mode={popUpMode}
          onClose={() => setVisible(false)}
          currentData={offerSelected}
        />
      ) : (
        ""
      )}
    </div>
  );
}
