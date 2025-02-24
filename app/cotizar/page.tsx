import QuoteForm from '@/components/QuoteForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Cotizar() {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-center text-[#152549] mb-3">
            Cotiza tu seguro
          </h1>
          <QuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}