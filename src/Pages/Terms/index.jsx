import React from 'react';

const Terms = () => {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <div className="bg-white p-6 rounded shadow">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">1. General Terms</h2>
          <p className="text-gray-600 mb-4">
            By accessing and placing an order with Indian Baazaar, you confirm that you agree to and are bound by the terms and conditions contained in this document.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">2. Products and Services</h2>
          <p className="text-gray-600 mb-4">
            All products and services displayed on our website are subject to availability. We reserve the right to discontinue any product at any time.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">3. Pricing and Payment</h2>
          <p className="text-gray-600 mb-4">
            All prices are inclusive of applicable taxes. We accept various payment methods as displayed during checkout.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">4. Delivery</h2>
          <p className="text-gray-600 mb-4">
            Delivery times may vary depending on the product and your location. Standard delivery usually takes 2-3 business days.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">5. Returns and Refunds</h2>
          <p className="text-gray-600 mb-4">
            You have the right to return products within 30 days of delivery. Please refer to our returns policy for detailed information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;