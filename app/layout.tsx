import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Broker Seguros - Tu seguridad es nuestra prioridad',
  description: 'Broker de seguros especializado en seguros de automóviles',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}