import React from 'react';

const Sitemap = () => {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Sitemap</h1>
      <div className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-3">Products</h2>
          <ul className="space-y-2">
            <li><a href="/prices-drop" className="text-gray-600 hover:text-primary">Prices Drop</a></li>
            <li><a href="/new-products" className="text-gray-600 hover:text-primary">New Products</a></li>
            <li><a href="/best-sales" className="text-gray-600 hover:text-primary">Best Sales</a></li>
            <li><a href="/stores" className="text-gray-600 hover:text-primary">Stores</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Customer Service</h2>
          <ul className="space-y-2">
            <li><a href="/contact" className="text-gray-600 hover:text-primary">Contact Us</a></li>
            <li><a href="/delivery" className="text-gray-600 hover:text-primary">Delivery</a></li>
            <li><a href="/returns" className="text-gray-600 hover:text-primary">Returns</a></li>
            <li><a href="/secure-payment" className="text-gray-600 hover:text-primary">Secure Payment</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Information</h2>
          <ul className="space-y-2">
            <li><a href="/about-us" className="text-gray-600 hover:text-primary">About Us</a></li>
            <li><a href="/legal-notice" className="text-gray-600 hover:text-primary">Legal Notice</a></li>
            <li><a href="/terms" className="text-gray-600 hover:text-primary">Terms and Conditions</a></li>
            <li><a href="/privacy-policy" className="text-gray-600 hover:text-primary">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;