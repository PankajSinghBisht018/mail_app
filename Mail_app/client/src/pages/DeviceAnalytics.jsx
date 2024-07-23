import React, { useState } from 'react';
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, LineController, BarController } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement, 
  LineElement, 
  CategoryScale, 
  LinearScale, 
  Title, 
  Tooltip, 
  Legend, 
  BarController, 
  LineController
);

const DeviceAnalytics = () => {
  const [chartData, setChartData] = useState({
    labels: ['Mobile', 'Desktop', 'Tablet'],
    datasets: [
      {
        type: 'bar',
        label: 'Email Opens',
        data: [10, 20, 15], 
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        type: 'line',
        label: 'Target',
        data: [12, 18, 20], 
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        fill: false,
      }
    ],
  });

  const [loading, setLoading] = useState(false);
  setTimeout(() => setLoading(false), 1000);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawBorder: false,
        },
      },
      y: {
        grid: {
          display: true,
          drawBorder: false,
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '70vh', marginTop: '80px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px',fontWeight:'bolder',fontSize:'35px'}}>Device Analytics</h2>
      <div style={{ width: '80%', maxWidth: '800px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        {loading ? (
          <p>Loading chart...</p>
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default DeviceAnalytics;
