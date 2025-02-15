import { Shield, Clock, Wallet } from 'lucide-react';

const Advertising = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-[#3ec1d3]" />,
      title: "Protección Completa",
      description: "Cobertura integral para tu vehículo con las mejores aseguradoras"
    },
    {
      icon: <Clock className="w-12 h-12 text-[#3ec1d3]" />,
      title: "Respuesta Rápida",
      description: "Atención inmediata y gestión eficiente de tus reclamos"
    },
    {
      icon: <Wallet className="w-12 h-12 text-[#3ec1d3]" />,
      title: "Precios Competitivos",
      description: "Las mejores tarifas del mercado adaptadas a tus necesidades"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md text-center card-hover"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#152549] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advertising;