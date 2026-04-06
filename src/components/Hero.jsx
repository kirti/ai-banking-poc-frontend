// src/components/Hero.js
import React from 'react';

function Hero() {
  const generateRandomBalance = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const balanceOptions = [
    {
      checking: generateRandomBalance(5000, 10000),
      savings: generateRandomBalance(10000, 20000),
    },
    {
      checking: generateRandomBalance(3000, 8000),
      savings: generateRandomBalance(8000, 15000),
    },
    {
      checking: generateRandomBalance(6000, 12000),
      savings: generateRandomBalance(12000, 25000),
    },
  ];

  const randomIndex = Math.floor(Math.random() * balanceOptions.length);
  const balances = balanceOptions[randomIndex];

  return (
    <section className="bg-blue-500 text-white py-16">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to  Online Banking</h1>
        <p className="text-xl mb-8">Manage your finances with ease.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white text-blue-500 p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Checking Account</h2>
            <p className="text-4xl">${balances.checking.toLocaleString()}</p>
          </div>
          <div className="bg-white text-blue-500 p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Savings Account</h2>
            <p className="text-4xl">${balances.savings.toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-xl">Take control of your financial future with Chase.</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;