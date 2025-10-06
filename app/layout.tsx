import ClientWrapper from './ClientWrapper';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rivolta Seguros',
  description: 'Broker de seguros especializado en seguros de automóviles',
  keywords: ['Seguros', 'Asegurar', 'Cotizar', 'Seguro Autos', 'Seguro Hogar', 'Aseguradora', 'Broker']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}