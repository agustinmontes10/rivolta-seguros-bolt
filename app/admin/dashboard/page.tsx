"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      setStatus("No hay imagen seleccionada");
      return;
    }

    setStatus("Subiendo imagen...");

    const formData = new FormData();
    formData.append("file", image);

    const res = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setStatus("Imagen subida con éxito");
    } else {
      setStatus("Error al subir la imagen");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Bienvenido, Admin</h1>
      <button 
        onClick={() => supabase.auth.signOut().then(() => router.push("/admin"))} 
        className="mb-4 p-2 bg-red-500 text-white rounded"
      >
        Cerrar sesión
      </button>

      <h2 className="text-xl font-bold mb-2">Subir Imagen</h2>
      <input
        type="file"
        onChange={handleImageChange}
        className="block w-full p-2 border rounded mb-2"
      />
      <button onClick={uploadImage} className="w-full bg-blue-500 text-white p-2 rounded">
        Subir Imagen
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}
