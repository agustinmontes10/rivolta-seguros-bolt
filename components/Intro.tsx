const Intro = () => {
  return (
    <section className="intro-section flex items-center justify-center text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Tu seguridad es nuestra prioridad
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Encuentra el seguro perfecto para tu vehículo con las mejores coberturas y precios del mercado.
        </p>
        <a
          href="/cotizar"
          className="inline-block bg-[#3ec1d3] text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-[#36adbf] transition-colors"
        >
          Cotizar ahora
        </a>
      </div>
    </section>
  );
};

export default Intro;