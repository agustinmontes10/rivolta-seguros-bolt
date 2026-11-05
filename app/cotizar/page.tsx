"use client";
// import QuoteForm from '@/components/QuoteForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const QuoteForm = dynamic(() => import('@/components/QuoteForm'), { ssr: false });

export default function Cotizar() {

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-grow pt-32 md:pt-40">
        <div className="max-w-4xl mx-auto px-4 pb-20 sm:px-6">
          <div className="mb-10 md:mb-12">
            <h1 className="text-5xl font-extrabold leading-[1.02] text-navy md:text-7xl">
              Cotiza tu seguro
            </h1>
            <p className="mt-4 max-w-xl text-lg text-navy/60">
              Completá los datos de tu vehículo y te enviamos la cotización por WhatsApp.
            </p>
          </div>
          <QuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
