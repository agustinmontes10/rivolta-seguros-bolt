import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY as string;
const SPREADSHEET_ID = '1NRBEdwPSAKDzMzx2Hsbdfo-_ao1olRkqmJs0wOtgtag'; // Reemplaza con tu ID de hoja
const RANGE = 'car_brands_models!A:C'; // Ajusta según el nombre y rango de tu hoja

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get('brand');

  if (!brand) {
    return NextResponse.json(
      { success: false, message: 'Se requiere el parámetro "brand"' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();

    if (!data.values) {
      throw new Error('No se encontraron datos en la hoja');
    }

    const rows = data.values.slice(1); // Ignorar encabezado
    const models = Array.from(
      new Set(
        rows
          .filter((row: string[]) => row[0].toLowerCase() === brand.toLowerCase())
          .map((row: string[]) => row[1])
      )
    ).sort();

    if (models.length === 0) {
      return NextResponse.json(
        { success: false, message: `No se encontraron modelos para la marca "${brand}"` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: models,
    });
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error al obtener los modelos',
      },
      { status: 500 }
    );
  }
}