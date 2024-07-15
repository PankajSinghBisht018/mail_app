import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { Line, Doughnut } from 'react-chartjs-2';
import { TrendingUp } from 'lucide-react';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,ArcElement,Tooltip,Legend,Title,TimeScale,Filler} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,ArcElement,Tooltip,Legend,Title,TimeScale,Filler);

const Analytics = () => {
  const [emailEvents, setEmailEvents] = useState([]);
  const [templateUsageCounts, setTemplateUsageCounts] = useState([]);

  useEffect(() => {
    fetchEmailEvents();
    fetchTemplateUsageCounts();
  }, []);

  const fetchEmailEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/email-events');
      setEmailEvents(response.data);
    } catch (error) {
      console.error('Error fetching email events:', error);
    }
  };

  const fetchTemplateUsageCounts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/template-usage-counts');
      setTemplateUsageCounts(response.data);
    } catch (error) {
      console.error('Error fetching template usage counts:', error);
    }
  };

  const formatLineChartData = () => {
    const eventCounts = emailEvents.reduce((acc, event) => {
      const sentAtTime = new Date(event.sentAt).getTime();
      const hourKey = new Date(sentAtTime).getHours(); 

      if (!acc[hourKey]) {
        acc[hourKey] = 0;
      }
      acc[hourKey]++;
      return acc;
    }, {});

    return {
      labels: Object.keys(eventCounts),
      datasets: [
        {
          label: 'Emails Sent',
          data: Object.keys(eventCounts).map(key => ({
            x: parseInt(key), 
            y: eventCounts[key],
          })),
          fill: true,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: 'rgba(75,192,192,1)'
        }
      ]
    };
  };

  const formatPieChartData = () => {
    return {
      labels: templateUsageCounts.map(item => item._id),
      datasets: [
        {
          label: 'Template Usage',
          data: templateUsageCounts.map(item => item.count),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40'
          ]
        }
      ]
    };
  };

  const lineChartData = formatLineChartData();
  const pieChartData = formatPieChartData();

  return (

    <motion.div className="max-w-screen min-h-screen mx-auto px-10 bg-gradient-to-b from-purple-900 to-black text-white shadow-md p-6">
      <Container maxWidth="lg">
        <Box mt={5}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center mb-4"
          >
            <TrendingUp className="mr-2 h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-bold">Email Analytics</h1>
          </motion.div>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Emails Sent Over Time (Hourly)</Typography>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Line
                      data={lineChartData}
                      options={/* options */}
                    />
                  </motion.div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} sx={{ marginBottom: '10px' }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Template Usage</Typography>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Doughnut data={pieChartData} />
                  </motion.div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </motion.div>
  );
};


export default Analytics;
