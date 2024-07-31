import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import GridPattern from '@/components/magicui/grid-pattern';
import { useAuth } from '@clerk/clerk-react';
import { API_URL } from '@/services/helper';

const AllCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${API_URL}/api/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCampaigns(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, [getToken]);

  return (
    <div className="bg-white min-h-screen flex justify-center">
      <Container>
        <GridPattern />
        <Typography variant="h4" component="h2" className="text-center my-4">
          All Campaigns
        </Typography>
        <Box className="relative bg-gray-800 p-4 rounded-lg shadow-lg">
          <TableContainer component={Paper} style={{ backgroundColor: '#424242' }}>
            {loading ? (
              <div className="animate-pulse">
                <Skeleton className="h-6 bg-gray-600 rounded-md mb-2" />
                <Skeleton className="h-6 bg-gray-600 rounded-md mb-2" />
                <Skeleton className="h-96 bg-gray-600 rounded-md mb-2" />
              </div>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ color: 'white' }}>Name</TableCell>
                    <TableCell style={{ color: 'white' }}>Subject</TableCell>
                    <TableCell style={{ color: 'white' }}>To</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign._id}>
                      <TableCell style={{ color: 'white' }}>{campaign.name}</TableCell>
                      <TableCell style={{color:'white'}}>{campaign.subject}</TableCell>
                      <TableCell style={{color:'white'}}>{campaign.to}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
};

export default AllCampaign;
