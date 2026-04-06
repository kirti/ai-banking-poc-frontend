// src/components/ProductCarousel.js
import React from 'react';

function ProductCarousel() {
  const products = [
    { id: 1, name: 'Credit Card', description: 'Earn rewards on your everyday purchases.' },
    { id: 2, name: 'Savings Account', description: 'Grow your money with high-yield savings.' },
    { id: 3, name: 'Mortgage', description: 'Find the right home loan for your needs.' },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow rounded p-6">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCarousel;