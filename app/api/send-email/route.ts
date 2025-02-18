import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Crea un transportador de Nodemailer utilizando tu servicio de correo
const transporter = nodemailer.createTransport({
  service: 'gmail', // O el servicio que uses (puede ser SendGrid, SMTP, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Tu correo electrónico
    pass: process.env.EMAIL_PASSWORD, // Tu contraseña o contraseña de aplicación
  },
});

export async function POST(req: Request) {
  console.log('Request:', req);
  const { to, subject, message } = await req.json();
  console.log('Request2:', req);

  // Validar si los campos son completos
  if (!to || !subject || !message) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  try {
    // Configura el correo electrónico a enviar
    const mailOptions = {
      from: process.env.EMAIL_USER, // El remitente
      to, // Los destinatarios
      subject, // El asunto
      html: `<p>${message}</p>`, // El contenido HTML del mensaje
    };

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, data: info });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
