import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton } from '@mui/material';
import axios from 'axios';
import GridPattern from '@/components/magicui/grid-pattern';
import { API_URL } from '../../services/helper';
import { Helmet } from 'react-helmet-async';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/surveys`);
        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feedbacks', error);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen flex justify-center">
      <Helmet>
        <title>Mail Vista - Feedback List  </title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/666/666162.png" type="image/png" />
      </Helmet>
      <Container>
        <GridPattern />
        <Typography variant="h4" component="h2" className="text-center my-4">
          User Feedback
        </Typography>
        <Box className="relative bg-gray-800 p-4 rounded-lg shadow-lg">
          <TableContainer component={Paper} style={{ backgroundColor: '#424242' }}>
            {loading ? (
              <div className="animate-pulse">
                <Skeleton variant="rectangular" width="100%" height={118} />
                <Skeleton variant="text" width="100%" height={30} style={{ marginTop: 16 }} />
                <Skeleton variant="text" width="100%" height={30} style={{ marginTop: 16 }} />
              </div>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ color: 'white' }}>Name</TableCell>
                    <TableCell style={{ color: 'white' }}>Message</TableCell>
                    <TableCell style={{ color: 'white' }}>Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {feedbacks.map((feedback) => (
                    <TableRow key={feedback._id}>
                      <TableCell style={{ color: 'white' }}>{feedback.name}</TableCell>
                      <TableCell style={{ color: 'white' }}>{feedback.message}</TableCell>
                      <TableCell style={{ color: 'white' }}>
                        <Rating value={feedback.rating} readOnly />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2} style={{ color: 'white' }}>Total Feedbacks</TableCell>
                    <TableCell style={{ color: 'white' }}>{feedbacks.length}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
};

export default FeedbackList;
