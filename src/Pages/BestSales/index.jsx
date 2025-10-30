import React from 'react';

const BestSales = () => {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Best Selling Products</h1>
      <div className="bg-white p-6 rounded shadow">
        <p className="text-gray-600 mb-4">
          Our most popular products and customer favorites.
        </p>
        {/* Add best selling products grid here */}
      </div>
    </div>
  );
};

export default BestSales;