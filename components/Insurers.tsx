const Insurers = () => {
  const insurers = [
    {
      name: "Aseguradora A",
      logo: "https://via.placeholder.com/150x80?text=Logo+A",
    },
    {
      name: "Aseguradora B",
      logo: "https://via.placeholder.com/150x80?text=Logo+B",
    },
    {
      name: "Aseguradora C",
      logo: "https://via.placeholder.com/150x80?text=Logo+C",
    },
    {
      name: "Aseguradora D",
      logo: "https://via.placeholder.com/150x80?text=Logo+D",
    },
  ];

  return (
    <section id="insurers" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#152549] mb-12">
          Nuestras Aseguradoras
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {insurers.map((insurer, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center card-hover"
            >
              <img
                src={insurer.logo}
                alt={insurer.name}
                className="max-w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insurers;