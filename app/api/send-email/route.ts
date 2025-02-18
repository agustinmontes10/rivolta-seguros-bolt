import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { to, subject, message } = await req.json();

  if (!to || !subject || !message) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  try {
    const data = await resend.emails.send({
      from: "chacote.com",
      to,
      subject,
      html: `<p>${message}</p>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
