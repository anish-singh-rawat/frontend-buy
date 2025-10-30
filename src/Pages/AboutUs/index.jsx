import React from 'react';

const AboutUs = () => {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <div className="bg-white p-6 rounded shadow">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Indian Baazaar is your one-stop destination for all your shopping needs. Established with the vision of providing quality products at competitive prices, we have grown to become one of the leading e-commerce platforms.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            To provide our customers with the best shopping experience, offering quality products, competitive prices, and excellent customer service.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Why Choose Us?</h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li className="mb-2">Wide range of quality products</li>
            <li className="mb-2">Competitive prices</li>
            <li className="mb-2">Fast and reliable shipping</li>
            <li className="mb-2">Excellent customer service</li>
            <li className="mb-2">Secure payment options</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;