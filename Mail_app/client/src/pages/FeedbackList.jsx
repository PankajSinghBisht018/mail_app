import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Rating } from '@mui/material';
import axios from 'axios';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/surveys');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Feedback
      </Typography>
      <List>
        {feedbacks.map((feedback) => (
          <ListItem key={feedback._id}>
            <ListItemText
              primary={`${feedback.name} (${feedback.email})`}
              secondary={`${feedback.subject}: ${feedback.message}`}
            />
            <Rating value={feedback.rating} readOnly />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FeedbackList;
