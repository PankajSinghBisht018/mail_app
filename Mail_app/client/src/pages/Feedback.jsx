import React, { useState } from 'react';
import { Button, Box, Typography, TextField, Modal, Container } from '@mui/material';
import axios from 'axios';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};

const Feedback = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    message: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/surveys', formData);
      alert('Survey submitted successfully');
      handleClose();
    } catch (error) {
      alert('Error submitting survey');
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-950 to-black min-h-screen flex justify-center">
      <Container className="flex flex-col mt-7" >
        <Typography variant="h3" className="text-center text-white">
          Submit Your Feedback To Us
        </Typography>
        <div className='flex justify-center mt-8'>
        <Button
          variant="contained"
          onClick={handleOpen}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md mt-5  "
        >
          Create a Survey
        </Button>
        </div>
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle} className="bg-white rounded-lg p-6">
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
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md mt-4"
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
