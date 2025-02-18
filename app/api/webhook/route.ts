import { NextResponse } from 'next/server';

// Manejador para solicitudes POST
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Lógica para manejar el webhook
    console.log('Webhook recibido:', body);

    // Respuesta exitosa
    return NextResponse.json({ message: 'Webhook procesado' }, { status: 200 });
  } catch (error) {
    console.error('Error procesando webhook:', error);

    // Respuesta de error
    return NextResponse.json({ error: 'Error procesando webhook' }, { status: 500 });
  }
}
