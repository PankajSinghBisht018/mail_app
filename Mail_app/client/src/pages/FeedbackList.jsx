import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import GridPattern from '@/components/magicui/grid-pattern';
import { API_URL } from '../services/helper';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/surveys`);
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="bg-white min-h-screen flex justify-center">
      <Container>
        <GridPattern />
        <Typography variant="h4" component="h2" className="text-center my-4">
          User Feedback
        </Typography>
        <Box className="relative bg-gray-800 p-4 rounded-lg shadow-lg" >
          <TableContainer component={Paper} style={{ backgroundColor: '#424242' }}>
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
              </TableBody>
              <TableRow>
                <TableCell colSpan={2} style={{ color: 'white' }}>Total Feedbacks</TableCell>
                <TableCell style={{ color: 'white' }}>{feedbacks.length}</TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
};

export default FeedbackList;
