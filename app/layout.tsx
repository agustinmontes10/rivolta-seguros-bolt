import ClientWrapper from './ClientWrapper';
import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

// Manrope variable (200–800) servida localmente para no depender de Google Fonts en el build
const manrope = localFont({
  src: './fonts/manrope-variable.woff2',
  weight: '200 800',
  style: 'normal',
  variable: '--font-manrope',
  display: 'swap',
});

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
    <html lang="es" className={manrope.variable}>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
