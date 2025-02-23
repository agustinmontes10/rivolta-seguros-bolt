const Products = () => {
  const products = [
    {
      id: 1,
      image: 'assets/posts/post1.jpeg',
      name: 'Producto 1',
      description: 'Descripción de la oferta 1',
    },
    {
      id: 2,
      image: 'assets/posts/post1.jpeg',
      name: 'Producto 2',
      description: 'Descripción de la oferta 2',
    },
    {
      id: 3,
      image: 'assets/posts/post1.jpeg',
      name: 'Producto 3',
      description: 'Descripción de la oferta 3',
    },
    {
      id: 4,
      image: 'assets/posts/post1.jpeg',
      name: 'Producto 4',
      description: 'Descripción de la oferta 4',
    },
    // Puedes agregar más productos aquí
  ];

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#152549] mb-12">
          Nuestras Ofertas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <img src={product.image} alt={product.name} className="w-full h-auto" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;