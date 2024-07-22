import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const DeviceAnalytics = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Email Opens by Device',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/get-email-events')
      .then(response => {
        const events = response.data;
        const deviceCounts = events.reduce((acc, event) => {
          const deviceType = event.deviceType || 'unknown';
          acc[deviceType] = (acc[deviceType] || 0) + 1;
          return acc;
        }, {});

        const categorizedCounts = {
          Mobile: deviceCounts.mobile || 0,
          Desktop: deviceCounts.desktop || 0,
          Unknown: deviceCounts.unknown || 0,
        };

        setChartData({
          labels: Object.keys(categorizedCounts),
          datasets: [
            {
              label: 'Email Opens by Device',
              data: Object.values(categorizedCounts),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });

        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching email events:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Device Analytics</h2>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <Bar data={chartData} />
      )}
    </div>
  );
};

export default DeviceAnalytics;
