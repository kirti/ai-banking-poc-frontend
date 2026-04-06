// src/App.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import SpendingChart from './components/SpendingChart';
import ProductCarousel from './components/ProductCarousel';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Hero />
        <SpendingChart />
         <ProductCarousel />
      </main>
      <ChatWidget/>
       <Footer/>
    </div>
  );
}

export default App;