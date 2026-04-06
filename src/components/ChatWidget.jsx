// src/components/ChatWidget.js
import React, { useState } from 'react';

function ChatWidget() {
  const [message, setMessage] = useState('');
  const [advice, setAdvice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://ai-banking-poc-backend.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setAdvice(data.advice);
      setMessage('');
    } catch (error) {
      console.error('Error fetching chat advice:', error);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Chat with a Financial Advisor</h2>
        <div className="bg-white shadow rounded p-6">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask a question..."
                className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-r px-6 py-2 focus:outline-none hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </form>
          {advice && (
            <div className="bg-gray-100 p-4 rounded">
              <p>{advice}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ChatWidget;