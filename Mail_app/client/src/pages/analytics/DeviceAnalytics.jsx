import React, { useState } from 'react';
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, LineController, BarController } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Container, Typography, Box } from '@mui/material';


ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController, LineController);

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

  const [loading, setLoading] = useState(true);
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
    <Container maxWidth="lg" sx={{ mt: 4, position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white', 
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          width: '100%', 
          height: '70vh', 
          p: 2 
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            textAlign: 'center', 
            mb: 3, 
            fontWeight: 'bold', 
            fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '35px' } 
          }}
        >
          Device Analytics
        </Typography>
        <Box 
          sx={{ 
            width: '100%', 
            maxWidth: '800px', 
            bgcolor: 'white', 
            p: 2, 
            borderRadius: '8px', 
            boxShadow: 1,
            display: 'flex', 
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {loading ? (
            <Typography>Loading chart...</Typography>
          ) : (
            <Bar data={chartData} options={options} />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default DeviceAnalytics;
