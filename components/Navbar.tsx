"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`bg-[#152549] text-white fixed w-full z-50 ${isOpen && 'shadow-[0px_10px_40px_0px_black]'} md:shadow-none`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-auto">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              <Image src={'/assets/logo.png'} alt='logo' width={200} height={200} />
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="hover:text-[#3ec1d3] px-3 py-2">Inicio</Link>
              <Link href="/#about" className="hover:text-[#3ec1d3] px-3 py-2">Sobre Nosotros</Link>
              <Link href="/#insurers" className="hover:text-[#3ec1d3] px-3 py-2">Aseguradoras</Link>
              <Link href="/#contact" className="hover:text-[#3ec1d3] px-3 py-2">Contacto</Link>
              <Link href="/cotizar" className="bg-[#3ec1d3] text-white px-4 py-2 rounded-md hover:bg-[#36adbf]">
                Cotizar
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#3ec1d3]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block hover:text-[#3ec1d3] px-3 py-2">Inicio</Link>
            <Link href="#about" className="block hover:text-[#3ec1d3] px-3 py-2">Sobre Nosotros</Link>
            <Link href="#insurers" className="block hover:text-[#3ec1d3] px-3 py-2">Aseguradoras</Link>
            <Link href="#contact" className="block hover:text-[#3ec1d3] px-3 py-2">Contacto</Link>
            <Link href="/cotizar" className="block bg-[#3ec1d3] text-white px-4 py-2 rounded-md hover:bg-[#36adbf] mx-3">
              Cotizar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;