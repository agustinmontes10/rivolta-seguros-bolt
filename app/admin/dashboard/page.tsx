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
  const [popUpMode, setPopUpMode] = useState<"add" | "edit" | "delete">("add");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, adData: any) => {
    e.preventDefault();
  
    const { id, title, description, image } = adData;
    const formData = new FormData();
    formData.append("id", id);
    formData.append("titulo", title);
    formData.append("descripcion", description);
    if (image) formData.append("imagen", image); // Ensure it's a file
  
    const method = popUpMode === "delete" ? "DELETE" : popUpMode === "edit" ? "PUT" : "POST";
  
    try {
      const res = await fetch("/api/offers", { method, body: formData });
      const data = await res.json();
      
      if (res.ok) {
        getOffers();
        alert(`Oferta ${popUpMode === "delete" ? "eliminada" : popUpMode === "edit" ? "editada" : "guardada"} con éxito!`);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred.");
      }
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
                      setPopUpMode("delete");
                      setOfferSelected(offer);
                      setVisible(true);
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
