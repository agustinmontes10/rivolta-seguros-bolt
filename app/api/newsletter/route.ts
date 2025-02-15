import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las variables de entorno de Supabase');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    console.log('Request:', request);
    const { email } = await request.json();

    if (!email?.trim()) {
      return NextResponse.json(
        { error: 'El email es requerido' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email: email.trim() }]);

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Este email ya está suscrito al newsletter' },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      { message: 'Suscripción exitosa' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al procesar la suscripción:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}