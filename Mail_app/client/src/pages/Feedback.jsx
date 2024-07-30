import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, TextField, Modal, Container, IconButton } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Rating from '@mui/material/Rating';
import { API_URL } from '../services/helper';
import { useLocation, useNavigate } from 'react-router-dom';
import GridPattern from '@/components/magicui/grid-pattern';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  backdropFilter: 'blur(5px)'
};

const Feedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    message: '',
    rating: 0
  });

  useEffect(() => {
    if (location.pathname === '/feedback') {
      setOpen(true);
    }
  }, [location]);

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/surveys`, formData);
      toast.success('Survey submitted successfully');
      handleClose();
    } catch (error) {
      toast.error('Error submitting survey');
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <GridPattern/>
      <Container>
        <ToastContainer position='top-right' />
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle} className="bg-white rounded-lg p-6 relative">
            <IconButton 
              onClick={handleClose} 
              sx={{ position: 'absolute', top: 8, right: 8, color: 'red' }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="h2" className="text-center mb-4">
              Feedback Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                margin="normal"
                onChange={handleChange}
                variant="outlined"
              />
              <TextField
                label="Subject"
                name="subject"
                fullWidth
                margin="normal"
                onChange={handleChange}
                variant="outlined"
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                onChange={handleChange}
                variant="outlined"
              />
              <TextField
                label="Message"
                name="message"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                onChange={handleChange}
                variant="outlined"
              />
              <Box className="flex items-center mb-4">
                <Typography variant="body1" className="mr-2">Rating:</Typography>
                <Rating
                  name="rating"
                  value={formData.rating}
                  onChange={handleRatingChange}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-md mt-4"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default Feedback;
