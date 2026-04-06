import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// ✅ Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SpendingChart() {
  const [spendingHistory, setSpendingHistory] = useState([]);
  const [predictedSpending, setPredictedSpending] = useState(null);
  const [advice, setAdvice] = useState('');
   const [approach, setApproach] = useState(''); // Add this line to define the 'approach' state variable

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch history
        const res1 = await fetch('http://localhost:9090/api/spending-history');
        const history = await res1.json();
        setSpendingHistory(history);

        // Fetch prediction
        const res2 = await fetch('http://localhost:9090/api/spending-prediction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ months: [1, 2, 3, 4, 5], spending: history }),
        });

        const prediction = await res2.json();
        setPredictedSpending(prediction.predictedSpending);
        setAdvice(prediction.advice);
        setApproach(prediction.approach);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Next Month'],
    datasets: [
      {
        label: 'Spending',
        data: [...spendingHistory, predictedSpending !== null ? predictedSpending : null],
        fill: true,
        borderColor: 'rgb(34, 197, 94)', // Tailwind green-500
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.3,
        pointBackgroundColor: 'rgb(34, 197, 94)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#111827' } },
      title: { display: true, text: 'Spending Prediction Overview', color: '#111827', font: { size: 18 } },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#111827' } },
      x: { ticks: { color: '#111827' } },
    },
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            📊 Your Spending Dashboard
          </h1>
          <p className="text-gray-600">
            Track your past spending and get friendly advice on how to save.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10">
          <Line data={chartData} options={options} />

          {predictedSpending && (
            <div className="mt-6 flex justify-center items-center space-x-4">
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                Predicted Next Month: ${predictedSpending.toFixed(2)}
              </span>
            </div>
          )}
        {advice && (
  <div className="mt-6 space-y-4 max-w-3xl mx-auto">
    <div className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-green-100 via-green-50 to-green-100 border-l-4 border-green-500">
      <div className="flex items-start space-x-3">
        <span className="text-2xl">💡</span>
        <div className="text-gray-800 text-md leading-relaxed whitespace-pre-line">
          <strong>{approach}:</strong> {advice}
        </div>
      </div>
    </div>
  </div>
)}
        </div>
      </div>
    </section>
  );
}

export default SpendingChart;