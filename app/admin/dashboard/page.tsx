"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // useEffect(() => {
  //   const getUser = async () => {
  //     const { data, error } = await supabase.auth.getUser();
  //     if (error || !data?.user) {
  //       router.push("/admin");
  //     } else {
  //       setUser(data.user);
  //     }
  //   };
  //   getUser();
  // }, [supabase, router]);

  const sendEmail = async () => {
    setStatus("Enviando...");

    const res = await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify({ to, subject, message }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setStatus("Correo enviado con éxito");
    } else {
      setStatus("Error al enviar el correo");
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

      <h2 className="text-xl font-bold mb-2">Enviar Email</h2>
      <input
        type="email"
        placeholder="Destinatario"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="block w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        placeholder="Asunto"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="block w-full p-2 border rounded mb-2"
      />
      <textarea
        placeholder="Mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="block w-full p-2 border rounded mb-2"
      />
      <button onClick={sendEmail} className="w-full bg-green-500 text-white p-2 rounded">
        Enviar
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}
