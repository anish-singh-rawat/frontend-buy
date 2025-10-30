import React from 'react';

const NewProducts = () => {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">New Arrivals</h1>
      <div className="bg-white p-6 rounded shadow">
        <p className="text-gray-600 mb-4">
          Discover our latest products and newest additions to our collection.
        </p>
        {/* Add new products grid here */}
      </div>
    </div>
  );
};

export default NewProducts;