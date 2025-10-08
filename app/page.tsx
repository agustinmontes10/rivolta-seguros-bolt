import Navbar from '@/components/Navbar';
import Intro from '@/components/Intro';
import AboutUs from '@/components/AboutUs';
import Insurers from '@/components/Insurers';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Products from '@/components/Products';
import Services from '@/components/Services';
import WhatsappFloat from '@/components/WhatsappFloat';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Intro />
      <Services />
      <Products />
      <AboutUs />
      <Insurers />
      <Contact />
      <Footer />

      <WhatsappFloat />
    </main>
  );
}