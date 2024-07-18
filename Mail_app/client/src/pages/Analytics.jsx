import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { Line, Doughnut } from 'react-chartjs-2';
import { TrendingUp } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title, TimeScale, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title, TimeScale, Filler);

const Analytics = () => {
  const [emailEvents, setEmailEvents] = useState([]);
  const [templateUsageCounts, setTemplateUsageCounts] = useState([]);
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    fetchEmailEvents();
    fetchTemplateUsageCounts();
    fetchSurveyData();
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

  const fetchSurveyData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/surveys');
      setSurveyData(response.data);
    } catch (error) {
      console.error('Error fetching survey data:', error);
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

  const formatFeedbackData = () => {
    const ratings = {
      '1 Star': 0,
      '2 Stars': 0,
      '3 Stars': 0,
      '4 Stars': 0,
      '5 Stars': 0
    };

    surveyData.forEach(survey => {
      if (survey.rating >= 1 && survey.rating <= 5) {
        ratings[`${survey.rating} Stars`] += 1;
      }
    });

    return {
      labels: Object.keys(ratings),
      datasets: [
        {
          label: 'User Feedback Ratings',
          data: Object.values(ratings),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          type: 'line',
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 7,
          yAxisID: 'ratings',
        },
        {
          label: 'User Feedback Counts',
          data: Object.values(ratings),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(54, 162, 235, 0.5)',
          ],
          yAxisID: 'counts',
        }
      ]
    };
  };

  const lineChartData = formatLineChartData();
  const pieChartData = formatPieChartData();
  const feedbackData = formatFeedbackData();

  return (
    <div className="max-w-screen min-h-screen mx-auto px-10 bg-gradient-to-b from-purple-900 to-black text-white shadow-md p-6">
      <Container maxWidth="lg">
        <Box mt={5}>
          <div className="flex items-center mb-4">
            <TrendingUp className="mr-2 h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-bold">Email Analytics</h1>
          </div>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{fontWeight:'bold'}}>Emails Sent Over Time (Hourly)</Typography>
                  <Line
                    data={lineChartData}
                    options={{
                      scales: {
                        x: {
                          type: 'linear',
                          title: {
                            display: true,
                            text: 'Hour of the Day'
                          }
                        },
                        y: {
                          title: {
                            display: true,
                            text: 'Total Emails Sent'
                          },
                          beginAtZero: true,
                          stepSize: 15
                        }
                      },
                      plugins: {
                        legend: {
                          display: true,
                        }
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} sx={{ marginBottom: '10px' }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{fontWeight:'bold'}}>Template Usage</Typography>
                  <Doughnut data={pieChartData} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}  sx={{ marginBottom: '50px'}}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{fontWeight:'bold'}} >User Feedback Ratings</Typography>
                  <Line
                    data={feedbackData}
                    options={{
                      scales: {
                        y: [
                          {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            id: 'ratings',
                            title: {
                              display: true,
                              text: 'Ratings'
                            },
                            beginAtZero: true,
                            ticks: {
                              stepSize: 1,
                              min: 0,
                              max: 5
                            }
                          },
                          {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            id: 'counts',
                            grid: {
                              drawOnChartArea: false
                            },
                            title: {
                              display: true,
                              text: 'Counts'
                            },
                            beginAtZero: true,
                            ticks: {
                              stepSize: 1,
                              min: 0
                            }
                          }
                        ]
                      },
                      plugins: {
                        tooltip: {
                          callbacks: {
                            label: function (tooltipItem) {
                              return tooltipItem.dataset.label + ': ' + tooltipItem.raw.toFixed(0);
                            }
                          }
                        },
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Analytics;
