import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY as string;
const SPREADSHEET_ID = '1NRBEdwPSAKDzMzx2Hsbdfo-_ao1olRkqmJs0wOtgtag'; // Asegúrate de que sea correcto
const RANGE = 'car_brands_models!A:C'; // Ajusta según tu hoja

export async function GET() {
  try {
    // Hacer la solicitud a Google Sheets
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();

    if (!data.values) {
      throw new Error('No se encontraron datos en la hoja');
    }

    // Extraer las marcas únicas (columna 0)
    const rows = data.values.slice(1); // Ignorar encabezado
    const brands = Array.from(new Set(rows.map((row: string[]) => row[0]))).sort();

    return NextResponse.json({
      success: true,
      data: brands,
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error al obtener las marcas',
      },
      { status: 500 }
    );
  }
}