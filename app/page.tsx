import Navbar from '@/components/Navbar';
import Intro from '@/components/Intro';
import Advertising from '@/components/Advertising';
import AboutUs from '@/components/AboutUs';
import Insurers from '@/components/Insurers';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Products from '@/components/Products';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Intro />
      <Advertising />
      <Products />
      <AboutUs />
      <Insurers />
      <Contact />
      <Footer />
    </main>
  );
}