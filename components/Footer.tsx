import { Instagram, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <Link href="/">
              <Image className="mb-8" src={'/assets/logo1.png'} alt="Rivolta Seguros" width={140} height={140} />
            </Link>
            <p className="max-w-xl text-4xl font-extrabold leading-[1.05] md:text-5xl">
              Tu seguridad es nuestra prioridad
            </p>
          </div>
          <Link
            href="/cotizar"
            className="inline-flex items-center gap-3 self-start rounded-full bg-turquoise py-2 pl-6 pr-2 font-bold text-navy transition-colors hover:bg-white md:self-auto"
          >
            Cotizar ahora
            <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-white">
              <ArrowUpRight size={18} />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <h4 className="mb-5 text-lg font-bold text-white">Enlaces</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-white/80 hover:text-turquoise">Inicio</a></li>
              <li><a href="/#about" className="text-white/80 hover:text-turquoise">Sobre Nosotros</a></li>
              <li><a href="/#insurers" className="text-white/80 hover:text-turquoise">Aseguradoras</a></li>
              <li><a href="/#contact" className="text-white/80 hover:text-turquoise">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-bold text-white">Contacto</h4>
            <ul className="space-y-3 text-white/80">
              <li><a href="mailto:Segurosrivolta@gmail.com" className="hover:text-turquoise">Segurosrivolta@gmail.com</a></li>
              <li><a href="tel:+542983350597" className="hover:text-turquoise">2983 350597</a></li>
              <li>Mitre 74, Adolfo González Chaves, CP 7513</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-bold text-white">Síguenos</h4>
            <a
              href="https://www.instagram.com/rivoltaseguros/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-turquoise hover:text-turquoise"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-white/10 pt-8 text-sm text-white/50">
          &copy; 2025 Hecho por Rocketly
          <Image src={'/assets/iconRocket.png'} alt="Rocketly" width={20} height={20} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
