"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/#about', label: 'Sobre Nosotros' },
  { href: '/#insurers', label: 'Aseguradoras' },
  { href: '/#contact', label: 'Contacto' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto max-w-6xl rounded-full text-white transition-all duration-300 ${
          scrolled || isOpen ? 'bg-navy shadow-[0_12px_40px_-12px_rgba(15,27,54,0.55)]' : 'bg-navy'
        }`}
      >
        <div className="flex items-center justify-between pl-6 pr-2 py-2">
          <Link href="/" className="flex-shrink-0" onClick={() => setIsOpen(false)}>
            <Image src={'/assets/logo1.png'} alt="Rivolta Seguros" width={112} height={112} priority />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[15px] font-medium text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/cotizar"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-turquoise pl-5 pr-2 py-2 text-[15px] font-bold text-navy hover:bg-white transition-colors"
          >
            Cotizar
            <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-white">
              <ArrowUpRight size={16} />
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden mx-auto mt-2 max-w-6xl rounded-3xl bg-navy p-3 text-white shadow-[0_20px_50px_-15px_rgba(15,27,54,0.6)] animate-fadeIn">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-2xl px-4 py-3 text-lg font-semibold hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cotizar"
            onClick={() => setIsOpen(false)}
            className="mt-2 flex items-center justify-between rounded-2xl bg-turquoise px-4 py-3 text-lg font-bold text-navy"
          >
            Cotizar
            <ArrowUpRight size={20} />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
