import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Doughnut } from 'react-chartjs-2';
import { TrendingUp } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title, TimeScale, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { API_URL } from '../services/helper'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title, TimeScale, Filler);

const Analytics = () => {
  const [emailEvents, setEmailEvents] = useState([]);
  const [templateUsageCounts, setTemplateUsageCounts] = useState([]);
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [emailRes, templateRes, surveyRes] = await Promise.all([
          axios.get(`${API_URL}/api/email-events`),
          axios.get(`${API_URL}/api/template-usage-counts`),
          axios.get(`${API_URL}/api/surveys`)
        ]);
        setEmailEvents(emailRes.data);
        setTemplateUsageCounts(templateRes.data);
        setSurveyData(surveyRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const formatLineChartData = () => {
    const eventCounts = emailEvents.reduce((acc, event) => {
      const hourKey = new Date(event.sentAt).getHours();
      acc[hourKey] = (acc[hourKey] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(eventCounts),
      datasets: [{
        label: 'Emails Sent',
        data: Object.keys(eventCounts).map(key => ({ x: parseInt(key), y: eventCounts[key] })),
        fill: true,
        borderColor: '#4bc0c0',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#4bc0c0'
      }]
    };
  };

  const formatPieChartData = () => ({
    labels: templateUsageCounts.map(item => item._id),
    datasets: [{
      label: 'Template Usage',
      data: templateUsageCounts.map(item => item.count),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
    }]
  });

  const formatFeedbackData = () => {
    const ratings = { '1 Star': 0, '2 Stars': 0, '3 Stars': 0, '4 Stars': 0, '5 Stars': 0 };
    surveyData.forEach(survey => { if (survey.rating >= 1 && survey.rating <= 5) ratings[`${survey.rating} Stars`] += 1; });
    return {
      labels: Object.keys(ratings),
      datasets: [
        {
          label: 'User Feedback Ratings',
          data: Object.values(ratings),
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          type: 'line',
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 7,
          yAxisID: 'ratings'
        },
        {
          label: 'User Feedback Counts',
          data: Object.values(ratings),
          backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(255, 159, 64, 0.5)', 'rgba(255, 205, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(54, 162, 235, 0.5)'],
          yAxisID: 'counts'
        }
      ]
    };
  };

  const lineChartData = formatLineChartData();
  const pieChartData = formatPieChartData();
  const feedbackData = formatFeedbackData();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-950 to-black text-white">
      <div className="max-w-6xl w-full p-5">
        <div className="flex items-center mb-8">
          <TrendingUp className="mr-2 text-blue-500" />
          <h1 className="text-4xl font-bold">Email Analytics</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white text-black rounded-lg shadow-lg p-5">
            <h2 className="text-xl font-bold mb-4">Emails Sent Over Time (Hourly)</h2>
            <div className="relative h-72">
              <Line data={lineChartData} options={{ maintainAspectRatio: false, scales: { x: { type: 'linear', title: { display: true, text: 'Hour of the Day' } }, y: { title: { display: true, text: 'Total Emails Sent' }, beginAtZero: true, stepSize: 15 } }, plugins: { legend: { display: true } } }} />
            </div>
          </div>
          <div className="bg-white text-black rounded-lg shadow-lg p-5">
            <h2 className="text-xl font-bold mb-4">Template Usage</h2>
            <div className="relative h-72">
              <Doughnut data={pieChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white text-black rounded-lg shadow-lg p-5 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">User Feedback Ratings</h2>
            <div className="relative h-96">
              <Line data={feedbackData} options={{ maintainAspectRatio: false, scales: { y: { type: 'linear', beginAtZero: true, position: 'left', id: 'ratings', title: { display: true, text: 'Ratings' }, ticks: { stepSize: 1, min: 0, max: 5 } }, y1: { type: 'linear', beginAtZero: true, position: 'right', id: 'counts', grid: { drawOnChartArea: false }, title: { display: true, text: 'Counts' }, ticks: { stepSize: 1, min: 0 } } }, plugins: { tooltip: { callbacks: { label: function (tooltipItem) { return tooltipItem.dataset.label + ': ' + tooltipItem.raw.toFixed(0); } } }, legend: { position: 'bottom' } } }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
