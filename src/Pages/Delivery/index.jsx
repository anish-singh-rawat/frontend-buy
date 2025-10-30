import React from 'react';

const Delivery = () => {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Delivery Information</h1>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Shipping Methods</h2>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Standard Delivery</h3>
          <p className="text-gray-600">2-3 business days</p>
          <p className="text-gray-600">Free for orders over $100</p>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Express Delivery</h3>
          <p className="text-gray-600">Next business day</p>
          <p className="text-gray-600">$15 flat rate</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">International Shipping</h3>
          <p className="text-gray-600">5-7 business days</p>
          <p className="text-gray-600">Rates calculated at checkout</p>
        </div>
      </div>
    </div>
  );
};

export default Delivery;