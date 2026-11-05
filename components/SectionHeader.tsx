"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: ReactNode;
  text?: ReactNode;
  action?: ReactNode;
  dark?: boolean;
}

/**
 * Encabezado de sección: título grande a la izquierda, texto + acción a la derecha.
 */
const SectionHeader = ({ title, text, action, dark = false }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-12 md:mb-16"
    >
      <h2
        className={`lg:col-span-7 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.02] ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {(text || action) && (
        <div className="lg:col-span-5 lg:pl-6 flex flex-col items-start gap-5">
          {text && (
            <p className={`text-base md:text-lg leading-relaxed ${dark ? "text-white/70" : "text-navy/60"}`}>
              {text}
            </p>
          )}
          {action}
        </div>
      )}
    </motion.div>
  );
};

export default SectionHeader;
