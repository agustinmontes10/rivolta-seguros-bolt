// Clases compartidas por los pasos del cotizador
export const fieldClass =
  "w-full rounded-2xl border border-navy/15 bg-cream px-5 py-4 text-lg font-medium text-navy placeholder:text-navy/35 transition-colors focus:border-turquoise focus:bg-white focus:outline-none focus:ring-4 focus:ring-turquoise/20 disabled:opacity-50";

export const labelClass = "block text-2xl md:text-3xl font-extrabold text-navy";

export const optionClass = (selected: boolean) =>
  `cursor-pointer rounded-2xl border p-5 text-left transition-colors ${
    selected
      ? "border-navy bg-navy text-white"
      : "border-navy/15 bg-white text-navy hover:border-turquoise"
  }`;
