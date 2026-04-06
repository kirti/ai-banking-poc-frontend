// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 mt-16">
      <div className="container mx-auto px-6 py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} AI Banking Dashboard. All rights reserved.
        </p>

        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-gray-900">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900">Terms</a>
          <a href="#" className="hover:text-gray-900">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;