// import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#0f1b36] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-xl font-bold">
              <Image src={'/assets/logo.png'} alt='logo' width={200} height={200} />
            </Link>
            <p className="text-gray-400">
              Tu seguridad es nuestra prioridad
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-[#3ec1d3]">Inicio</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-[#3ec1d3]">Sobre Nosotros</a></li>
              <li><a href="#insurers" className="text-gray-400 hover:text-[#3ec1d3]">Aseguradoras</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-[#3ec1d3]">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: poner email</li>
              <li>Teléfono: poner numero</li>
              <li>Dirección: poner direccion</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#3ec1d3]">
                {/* <Facebook size={24} /> */}
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3ec1d3]">
                {/* <Twitter size={24} /> */}
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3ec1d3]">
                {/* <Instagram size={24} /> */}
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3ec1d3]">
                {/* <Linkedin size={24} /> */}
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 nuestroname. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;