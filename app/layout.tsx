import ClientWrapper from './ClientWrapper';
import './globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
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
