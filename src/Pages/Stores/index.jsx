import React from 'react';

const Stores = () => {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Our Stores</h1>
      <div className="bg-white p-6 rounded shadow">
        <p className="text-gray-600 mb-4">
          Find our physical store locations and their working hours.
        </p>
        {/* Add store locations here */}
      </div>
    </div>
  );
};

export default Stores;