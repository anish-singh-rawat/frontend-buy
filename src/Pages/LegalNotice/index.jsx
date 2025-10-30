import React from 'react';

const LegalNotice = () => {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Legal Notice</h1>
      <div className="bg-white p-6 rounded shadow">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Company Information</h2>
          <p className="text-gray-600 mb-2">Company Name: Your Company Name</p>
          <p className="text-gray-600 mb-2">Registration Number: 123456789</p>
          <p className="text-gray-600 mb-2">VAT Number: GB123456789</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
          <p className="text-gray-600 mb-2">Address: 507-Union Trade Centre France</p>
          <p className="text-gray-600 mb-2">Email: contact@yourcompany.com</p>
          <p className="text-gray-600 mb-2">Phone: (+91) 9876-543-210</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Hosting Information</h2>
          <p className="text-gray-600">This website is hosted by [Hosting Provider Name]</p>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;