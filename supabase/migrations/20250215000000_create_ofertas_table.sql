/*
  # Create ofertas table

  1. New Tables
    - `ofertas`
      - `id` (uuid, primary key)
      - `titulo` (text, not null)
      - `descripcion` (text, not null)
      - `imagen` (text, not null)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `ofertas` table
    - Add policy for public access to read offers
    - Add policy for authenticated users to insert/update/delete offers
*/

CREATE TABLE IF NOT EXISTS ofertas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descripcion text NOT NULL,
  imagen text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ofertas ENABLE ROW LEVEL SECURITY;

-- Policy para que cualquiera pueda leer las ofertas
CREATE POLICY "Anyone can read offers"
  ON ofertas
  FOR SELECT
  TO public
  USING (true);

-- Policy para que usuarios autenticados puedan insertar ofertas
CREATE POLICY "Authenticated users can insert offers"
  ON ofertas
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy para que usuarios autenticados puedan actualizar ofertas
CREATE POLICY "Authenticated users can update offers"
  ON ofertas
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policy para que usuarios autenticados puedan eliminar ofertas
CREATE POLICY "Authenticated users can delete offers"
  ON ofertas
  FOR DELETE
  TO authenticated
  USING (true);
