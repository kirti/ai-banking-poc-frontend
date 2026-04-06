// src/components/Header.js
import React from 'react';

function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Banking Dashboard</h1>

        <nav className="space-x-6">
          <a href="/" className="hover:text-gray-300">Home</a>
        
        </nav>
      </div>
    </header>
  );
}

export default Header;