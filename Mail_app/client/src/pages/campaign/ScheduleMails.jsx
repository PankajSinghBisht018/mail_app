import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react'; 
import { Typography, Container, Box, IconButton } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { Send as SendIcon, Cancel as CancelIcon, CheckCircle as CheckCircleIcon} from '@mui/icons-material';
import "react-toastify/dist/ReactToastify.css";
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { API_URL } from '../../services/helper';

const ScheduleMails = () => {
  const [scheduledEmails, setScheduledEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth(); 

  useEffect(() => {
    fetchScheduledEmails();
  }, []);

  const fetchScheduledEmails = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/api/email-events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setScheduledEmails(response.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
      toast.error('Failed to fetch scheduled emails');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSchedule = async (id) => {
    try {
      const token = await getToken();
      await axios.post(`${API_URL}/api/cancel-email/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Email schedule canceled');
      fetchScheduledEmails();
    } catch (error) {
      toast.error('Failed to cancel email schedule');
    }
  };

  const handleSendNow = async (id) => {
    try {
      const token = await getToken();
      await axios.post(`${API_URL}/api/send-now/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Email sent immediately');
      fetchScheduledEmails();
    } catch (error) {
      toast.error('Failed to send email immediately');
    }
  };

  return (
    <div className="relative min-h-screen">
      <motion.div
        className="relative z-10 min-h-screen"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Container sx={{ marginTop: '20px' }}>
          <Typography variant="h4" className="text-center">Scheduled Emails</Typography>
          <Box>
            {loading ? (
              <div className="animate-pulse">
                <div className="p-4 mb-4 bg-gray-600 rounded-md shadow-lg">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-20 bg-gray-700 rounded-md mb-2" />
                  ))}
                </div>
              </div>
            ) : (
              scheduledEmails.map((email) => (
                <motion.div
                  key={email._id}
                  className="p-4 mb-4 bg-gray-400 rounded-md shadow-lg flex justify-between items-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div>
                    <Typography variant="h6">{email.subject}</Typography>
                    <Typography variant="body1">{email.recipient}</Typography>
                    <Typography variant="body2">Scheduled At: {new Date(email.scheduledDate).toLocaleString()}</Typography>
                    <Typography variant="body2">
                      Status: {email.sent ? 'Sent' : email.canceled ? 'Canceled' : 'Scheduled'}
                    </Typography>
                  </div>
                  <div className="flex items-center space-x-4">
                    {!email.canceled && !email.sent && (
                      <>
                        <IconButton onClick={() => handleSendNow(email._id)}>
                          <SendIcon className="text-blue-500" />
                        </IconButton>
                        <IconButton onClick={() => handleCancelSchedule(email._id)}>
                          <CancelIcon className="text-red-500" />
                        </IconButton>
                      </>
                    )}
                    {email.sent && <CheckCircleIcon className="text-green-500" />}
                    {email.canceled && <CancelIcon className="text-red-500" />}
                  </div>
                </motion.div>
              ))
            )}
          </Box>
        </Container>
      </motion.div>
      <ToastContainer position="bottom-left" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default ScheduleMails;
