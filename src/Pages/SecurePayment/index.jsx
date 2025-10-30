import React from 'react';

const SecurePayment = () => {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Secure Payment</h1>
      <div className="bg-white p-6 rounded shadow">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Payment Methods</h2>
          <p className="text-gray-600 mb-4">
            We accept the following secure payment methods:
          </p>
          <div className="flex items-center gap-4 mb-4">
            <img src="/visa.png" alt="Visa" className="h-8" />
            <img src="/master_card.png" alt="Mastercard" className="h-8" />
            <img src="/american_express.png" alt="American Express" className="h-8" />
            <img src="/paypal.png" alt="PayPal" className="h-8" />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Security Measures</h2>
          <ul className="list-disc pl-5 text-gray-600">
            <li className="mb-2">SSL Encryption for all transactions</li>
            <li className="mb-2">3D Secure authentication</li>
            <li className="mb-2">PCI DSS compliant</li>
            <li className="mb-2">Fraud prevention systems</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Your Data Protection</h2>
          <p className="text-gray-600">
            We take your privacy seriously. All payment information is encrypted and processed securely. We never store your card details on our servers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurePayment;